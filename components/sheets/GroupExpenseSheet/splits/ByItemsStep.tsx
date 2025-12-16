import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import StyledButton from '@/components/ui/common/StyledButton';
import { GroupMember } from '../index';
import { ScannedItem } from '@/components/ui/transaction/types';

interface ItemWithMembers extends ScannedItem {
  assignedMembers: string[];
}

interface ByItemsStepProps {
  items: ScannedItem[];
  members: GroupMember[];
  onConfirm: (splits: GroupMember[]) => void;
  hideButtons?: boolean;
  currency?: { code: string; symbol: string };
}

export default function ByItemsStep({
  items,
  members,
  onConfirm,
  hideButtons,
  currency = { code: 'USD', symbol: '$' },
}: ByItemsStepProps) {
  const { t } = useTranslation();
  const validItems = items.filter(item => item.name?.trim() && item.amount?.trim());

  const [itemsWithMembers, setItemsWithMembers] = useState<ItemWithMembers[]>(
    validItems.map(item => ({ ...item, assignedMembers: [] })),
  );

  const toggleMemberForItem = (itemIndex: number, memberId: string) => {
    setItemsWithMembers(prev =>
      prev.map((item, i) => {
        if (i === itemIndex) {
          const isAssigned = item.assignedMembers.includes(memberId);
          return {
            ...item,
            assignedMembers: isAssigned
              ? item.assignedMembers.filter(id => id !== memberId)
              : [...item.assignedMembers, memberId],
          };
        }
        return item;
      }),
    );
  };

  const handleConfirm = () => {
    const memberTotals: { [key: string]: number } = {};

    itemsWithMembers.forEach(item => {
      if (item.assignedMembers.length > 0) {
        const amountPerPerson = parseFloat(item.amount) / item.assignedMembers.length;
        item.assignedMembers.forEach(memberId => {
          memberTotals[memberId] = (memberTotals[memberId] || 0) + amountPerPerson;
        });
      }
    });

    const splits = members
      .map(member => ({
        ...member,
        amount: (memberTotals[member.id] || 0).toFixed(2),
      }))
      .filter(m => parseFloat(m.amount || '0') > 0);

    onConfirm(splits);
  };

  const calculateMemberTotals = () => {
    const totals: { [key: string]: number } = {};

    itemsWithMembers.forEach(item => {
      if (item.assignedMembers.length > 0) {
        const amountPerPerson = parseFloat(item.amount) / item.assignedMembers.length;
        item.assignedMembers.forEach(memberId => {
          totals[memberId] = (totals[memberId] || 0) + amountPerPerson;
        });
      }
    });

    return totals;
  };

  const memberTotals = calculateMemberTotals();
  const allItemsAssigned = itemsWithMembers.every(item => item.assignedMembers.length > 0);

  return (
    <View style={styles.container}>
      {!hideButtons && <Text style={styles.title}>{t('transaction.assignItemsToPeople')}</Text>}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.itemsList}>
          {itemsWithMembers.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemAmount}>
                    {currency.symbol}
                    {item.amount}
                  </Text>
                </View>
              </View>

              <View style={styles.membersChips}>
                {members.map(member => {
                  const isAssigned = item.assignedMembers.includes(member.id);
                  return (
                    <TouchableOpacity
                      key={member.id}
                      style={[styles.memberChip, isAssigned && styles.memberChipSelected]}
                      onPress={() => toggleMemberForItem(index, member.id)}>
                      <Text
                        style={[
                          styles.memberChipText,
                          isAssigned && styles.memberChipTextSelected,
                        ]}>
                        {member.name.split(' ')[0]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {item.assignedMembers.length > 0 && (
                <Text style={styles.splitInfo}>
                  {currency.symbol}
                  {(parseFloat(item.amount) / item.assignedMembers.length).toFixed(2)}{' '}
                  {t('transaction.perPerson')}
                </Text>
              )}
            </View>
          ))}
        </View>

        {!allItemsAssigned && (
          <View style={styles.warningCard}>
            <Text style={styles.warningText}>
              {t('transaction.someItemsNotAssigned') || "Some items haven't been assigned yet"}
            </Text>
          </View>
        )}

        {/* Show totals per person */}
        {Object.keys(memberTotals).length > 0 && (
          <View style={styles.totalsSection}>
            <Text style={styles.totalsTitle}>{t('transaction.totalOwed')}</Text>
            {members.map(member => {
              const total = memberTotals[member.id];
              if (!total || total === 0) return null;

              return (
                <View key={member.id} style={styles.totalRow}>
                  <Text style={styles.totalName}>{member.name}</Text>
                  <Text style={styles.totalAmount}>
                    {currency.symbol}
                    {total.toFixed(2)}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {!hideButtons && (
        <View style={styles.footer}>
          <StyledButton
            title="Confirm Split"
            onPress={handleConfirm}
            size="medium"
            disabled={!allItemsAssigned}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    marginBottom: 20,
  },
  itemsList: {
    gap: 12,
    marginBottom: 16,
    width: '100%',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    width: '100%',
  },
  itemHeader: {
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
    flex: 1,
  },
  itemAmount: {
    fontSize: 16,
    color: '#615FFF',
    fontFamily: 'Bitter-Regular',
  },
  membersChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  memberChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  memberChipSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#615FFF',
    shadowColor: '#615FFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  memberChipText: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
  },
  memberChipTextSelected: {
    color: '#615FFF',
  },
  splitInfo: {
    fontSize: 12,
    color: '#10B981',
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
    marginTop: 4,
  },
  warningCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  warningText: {
    fontSize: 14,
    color: '#92400E',
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
    textAlign: 'center',
  },
  totalsSection: {
    marginTop: 24,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  totalsTitle: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    marginBottom: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalName: {
    fontSize: 15,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
  },
  totalAmount: {
    fontSize: 17,
    color: '#615FFF',
    fontFamily: 'Bitter-Regular',
  },
  footer: {
    paddingVertical: 20,
  },
});
