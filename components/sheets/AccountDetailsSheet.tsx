import { forwardRef, useMemo, useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import TransactionGroup from '@/components/ui/common/TransactionGroup';
import TransactionItem from '@/components/ui/balance/TransactionItem';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { Account } from '@/types/account';
import { MOCK_TRANSACTIONS } from '@/mocks';
import { IconTrash, IconEdit, IconDotsVertical } from '@/assets/icons';
import useSettingsStore from '@/store/settingsStore';
import useAccountsStore from '@/store/accountsStore';
import { formatAmount } from '@/utils/currency';
import { groupTransactionsByDate, formatTransactionDate } from '@/utils/dateHelpers';

interface AccountDetailsSheetProps {
  account: Account | null;
  onEdit?: (account: Account) => void;
  onDelete?: (account: Account) => void;
}

const AccountDetailsSheet = forwardRef<BottomSheetModal, AccountDetailsSheetProps>(
  ({ account, onEdit, onDelete }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['90%']);
    const { currency } = useSettingsStore();
    const { accounts } = useAccountsStore();
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const menuButtonRef = useRef<View>(null);

    const currentAccount = useMemo(() => {
      if (!account) return null;
      return accounts.find(acc => acc.id === account.id) || account;
    }, [account, accounts]);

    const formatAmountCallback = (amount: number) =>
      formatAmount(amount, currentAccount?.currency || currency, { decimals: 2 });

    const accountTransactions = useMemo(() => {
      if (!currentAccount) return [];
      return MOCK_TRANSACTIONS.filter(t => t.accountId === currentAccount.id);
    }, [currentAccount]);

    const handleDelete = () => {
      if (!currentAccount) return;
      Alert.alert(
        t('groups.details.confirmTitle'),
        t('accounts.confirmDelete', { name: currentAccount.name }),
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('groups.details.delete'),
            style: 'destructive',
            onPress: () => onDelete?.(currentAccount),
          },
        ],
      );
    };

    const handleEdit = () => {
      setMenuVisible(false);
      if (!currentAccount) return;
      onEdit?.(currentAccount);
    };

    const handleMenuDelete = () => {
      setMenuVisible(false);
      handleDelete();
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

    if (!currentAccount) return null;

    return (
      <BottomSheetWrapper sheetRef={ref} snapPoints={['90%']} renderBackdrop={renderBackdrop}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{currentAccount.icon}</Text>
              </View>
              <View style={styles.headerText}>
                <Text style={styles.name}>{currentAccount.name}</Text>
                <Text style={styles.type}>{t(`accounts.types.${currentAccount.type}`)}</Text>
              </View>
            </View>
            <View style={styles.actions}>
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
                  <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
                    <IconEdit size={18} color="#6B7280" />
                    <Text style={styles.menuItemText}>{t('groups.details.edit')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={handleMenuDelete}>
                    <IconTrash size={18} color="#EF4444" />
                    <Text style={[styles.menuItemText, styles.menuItemTextDanger]}>
                      {t('groups.details.delete')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>{t('accounts.totalBalance')}</Text>
            <Text style={styles.balanceAmount}>{formatAmountCallback(currentAccount.balance)}</Text>
          </View>

          <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
            {accountTransactions.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>{t('accounts.noTransactions')}</Text>
              </View>
            ) : (
              groupTransactionsByDate(accountTransactions).map(
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
            <View style={styles.bottomSpacer} />
          </ScrollView>
        </View>
      </BottomSheetWrapper>
    );
  },
);

AccountDetailsSheet.displayName = 'AccountDetailsSheet';

export default AccountDetailsSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  type: {
    fontSize: 13,
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
  transactionsList: {
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 18,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bottomSpacer: {
    height: 100,
  },
});
