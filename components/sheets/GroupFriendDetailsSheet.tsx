import { forwardRef, useMemo, useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import TransactionGroup from '@/components/ui/common/TransactionGroup';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { Friend, Group, MOCK_TRANSACTIONS } from '@/mocks';
import { IconTrash, IconEdit, IconUserMinus, IconDotsVertical, IconUsers } from '@/assets/icons';
import useSettingsStore from '@/store/settingsStore';
import { formatAmount } from '@/utils/currency';
import { groupTransactionsByDate, formatTransactionDate } from '@/utils/dateHelpers';
import { isGroup, isFriend } from '@/utils/typeGuards';
import GroupMembersSheet from './GroupMembersSheet';
import { TransactionItem } from './GroupFriendDetailsSheet/TransactionItem';

interface GroupFriendDetailsSheetProps {
  item: Friend | Group | null;
  onEdit?: (item: Friend | Group) => void;
  onDelete?: (item: Friend | Group) => void;
  onRemoveFriend?: (friend: Friend) => void;
}

const GroupFriendDetailsSheet = forwardRef<BottomSheetModal, GroupFriendDetailsSheetProps>(
  ({ item, onEdit, onDelete, onRemoveFriend }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['90%']);
    const { currency } = useSettingsStore();
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const menuButtonRef = useRef<View>(null);
    const membersSheetRef = useRef<BottomSheetModal>(null);

    const formatAmountCallback = (amount: number) =>
      formatAmount(amount, currency, { decimals: 2 });

    const transactions = useMemo(() => {
      if (!item) return [];

      if (isGroup(item)) {
        return MOCK_TRANSACTIONS.filter(t => t.groupId === item.id);
      } else {
        return MOCK_TRANSACTIONS.filter(t => t.friendId === item.id);
      }
    }, [item]);

    const handleDelete = () => {
      if (!item) return;

      const message = isGroup(item)
        ? t('groups.details.confirmDeleteGroup', { name: item.name })
        : t('groups.details.confirmRemoveFriend', { name: item.name });

      Alert.alert(t('groups.details.confirmTitle'), message, [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: isGroup(item) ? t('groups.details.delete') : t('groups.details.remove'),
          style: 'destructive',
          onPress: () => {
            if (isGroup(item)) {
              onDelete?.(item);
            } else {
              onRemoveFriend?.(item);
            }
            (ref as any)?.current?.dismiss();
          },
        },
      ]);
    };

    const handleEdit = () => {
      setMenuVisible(false);
      if (!item || !isGroup(item)) return;
      onEdit?.(item);
    };

    const handleMenuDelete = () => {
      setMenuVisible(false);
      handleDelete();
    };

    const handleViewMembers = () => {
      membersSheetRef.current?.present();
    };

    const handleInviteMember = () => {
      membersSheetRef.current?.dismiss();
      console.log('Invite member to group');
    };

    const handleOpenMenu = () => {
      menuButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setMenuPosition({
          top: pageY + height,
          right: 24,
        });
        setMenuVisible(true);
      });
    };

    if (!item) return null;

    const getIconDisplay = () => {
      if (isFriend(item)) {
        if (item.avatar) {
          return <Text style={styles.icon}>{item.avatar}</Text>;
        }
        const firstLetter = item.name.charAt(0).toUpperCase();
        return <Text style={styles.avatarLetter}>{firstLetter}</Text>;
      }
      return <Text style={styles.icon}>{item.icon}</Text>;
    };

    return (
      <>
        <BottomSheetWrapper sheetRef={ref} snapPoints={['90%']} renderBackdrop={renderBackdrop}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerInfo}>
                <View style={styles.iconContainer}>{getIconDisplay()}</View>
                <View style={styles.headerText}>
                  <Text style={styles.name}>{item.name}</Text>
                  {isGroup(item) && (
                    <Text style={styles.members}>
                      {item.membersCount === 1
                        ? t('groups.balance.members_one', { count: item.membersCount })
                        : t('groups.balance.members_other', { count: item.membersCount })}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.actions}>
                {isGroup(item) && (
                  <TouchableOpacity style={styles.actionButton} onPress={handleViewMembers}>
                    <IconUsers size={20} color="#6B7280" />
                  </TouchableOpacity>
                )}
                <View ref={menuButtonRef} collapsable={false}>
                  <TouchableOpacity style={styles.actionButton} onPress={handleOpenMenu}>
                    <IconDotsVertical size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>

              <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}>
                <TouchableOpacity
                  style={styles.menuOverlay}
                  activeOpacity={1}
                  onPress={() => setMenuVisible(false)}>
                  <View
                    style={[
                      styles.menuContainer,
                      {
                        position: 'absolute',
                        top: menuPosition.top,
                        right: menuPosition.right,
                      },
                    ]}>
                    {isGroup(item) && (
                      <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
                        <IconEdit size={18} color="#6B7280" />
                        <Text style={styles.menuItemText}>{t('groups.details.edit')}</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.menuItem} onPress={handleMenuDelete}>
                      {isGroup(item) ? (
                        <IconTrash size={18} color="#EF4444" />
                      ) : (
                        <IconUserMinus size={18} color="#EF4444" />
                      )}
                      <Text style={[styles.menuItemText, styles.menuItemTextDanger]}>
                        {isGroup(item) ? t('groups.details.delete') : t('groups.details.remove')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            {isGroup(item) && item.members && item.members.length > 0 ? (
              <View style={styles.balanceCard}>
                <View style={styles.compactMembersList}>
                  {item.members
                    .filter(member => member.balance !== 0)
                    .map(member => (
                      <View key={member.id} style={styles.compactMemberRow}>
                        <Text style={styles.compactMemberName}>{member.name}</Text>
                        <Text
                          style={[
                            styles.compactMemberBalance,
                            member.balance > 0 ? styles.balanceOwed : styles.balanceOwe,
                          ]}>
                          {member.balance > 0
                            ? t('groups.balance.youreOwed')
                            : t('groups.balance.youOwe')}{' '}
                          {formatAmountCallback(Math.abs(member.balance))}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
            ) : (
              <View style={styles.balanceCard}>
                {item.balance === 0 ? (
                  <Text style={styles.settledUpText}>{t('groups.balance.settledUp')}</Text>
                ) : (
                  <>
                    <Text style={styles.balanceLabel}>
                      {item.balance > 0
                        ? t('groups.details.youOwe', { name: item.name })
                        : t('groups.details.owesYou', { name: item.name })}
                    </Text>
                    <Text
                      style={[
                        styles.balanceAmount,
                        item.balance > 0 ? styles.balanceOwe : styles.balanceOwed,
                      ]}>
                      {formatAmountCallback(Math.abs(item.balance))}
                    </Text>
                  </>
                )}
              </View>
            )}

            <View style={styles.section}>
              <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
                {transactions.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>{t('groups.details.noTransactions')}</Text>
                  </View>
                ) : (
                  groupTransactionsByDate(transactions).map(
                    ({ date, transactions: dayTransactions }) => (
                      <TransactionGroup
                        key={date.toISOString()}
                        dateLabel={formatTransactionDate(date, t)}>
                        {dayTransactions.map((transaction, index) => (
                          <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            formatAmount={formatAmountCallback}
                            isLast={index === dayTransactions.length - 1}
                          />
                        ))}
                      </TransactionGroup>
                    ),
                  )
                )}
              </ScrollView>
            </View>
          </View>
        </BottomSheetWrapper>
        {isGroup(item) && (
          <GroupMembersSheet
            ref={membersSheetRef}
            members={item.members}
            onInvite={handleInviteMember}
          />
        )}
      </>
    );
  },
);

GroupFriendDetailsSheet.displayName = 'GroupFriendDetailsSheet';

export default GroupFriendDetailsSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 18,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 32,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
  },
  avatarLetter: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: '#111827',
    marginBottom: 4,
  },
  members: {
    fontSize: 14,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 8,
    marginHorizontal: 18,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  balanceAmount: {
    fontSize: 28,
    textAlign: 'center',
  },
  balanceOwe: {
    color: '#FF6B6B',
  },
  balanceOwed: {
    color: '#51CF66',
  },
  settledUpText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  compactMembersList: {
    gap: 8,
  },
  compactMemberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactMemberName: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  compactMemberBalance: {
    fontSize: 13,
    fontWeight: '500',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
    color: '#111827',
  },
  menuItemTextDanger: {
    color: '#EF4444',
  },
  section: {
    flex: 1,
  },
  transactionsList: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 18,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});
