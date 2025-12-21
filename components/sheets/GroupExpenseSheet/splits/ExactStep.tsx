import { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import StyledButton from '@/components/ui/common/StyledButton';
import { GroupMember } from '../index';
import { useTranslation } from 'react-i18next';

interface ExactStepProps {
  members: GroupMember[];
  totalAmount: number;
  onConfirm: (splits: GroupMember[]) => void;
}

export default function ExactStep({ members, totalAmount, onConfirm }: ExactStepProps) {
  const { t } = useTranslation();
  const [amounts, setAmounts] = useState<GroupMember[]>(members.map(m => ({ ...m, amount: '0' })));

  const handleAmountChange = (id: string, value: string) => {
    const filtered = value.replace(/[^0-9.]/g, '');
    setAmounts(prev => prev.map(m => (m.id === id ? { ...m, amount: filtered } : m)));
  };

  const total = amounts.reduce((sum, m) => sum + parseFloat(m.amount || '0'), 0);
  const remaining = totalAmount - total;

  const handleConfirm = () => {
    onConfirm(amounts.filter(m => parseFloat(m.amount || '0') > 0));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Enter exact amounts</Text>
          <View style={styles.totalContainer}>
            <Text
              style={
                styles.totalLabel
              }>{`${t('transaction.total')} ${totalAmount.toFixed(2)}`}</Text>
            <Text style={[styles.remaining, remaining < 0 && styles.remainingNegative]}>
              {remaining >= 0 ? t('transaction.remaining') : t('transaction.over')}: $
              {Math.abs(remaining).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.membersList}>
          {amounts.map((member, index) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberRow}>
                <View style={styles.memberIndexContainer}>
                  <Text style={styles.memberIndex}>{index + 1}</Text>
                </View>

                <View style={styles.memberContent}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <View style={styles.amountRow}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                      style={styles.inputAmount}
                      value={member.amount}
                      onChangeText={value => handleAmountChange(member.id, value)}
                      placeholder="0.00"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {remaining !== 0 && (
          <View style={[styles.warningCard, remaining < 0 && styles.errorCard]}>
            <Text style={[styles.warningText, remaining < 0 && styles.errorText]}>
              {remaining > 0
                ? `$${remaining.toFixed(2)} left to allocate`
                : `Total exceeds by $${Math.abs(remaining).toFixed(2)}`}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <StyledButton
          title="Confirm Split"
          onPress={handleConfirm}
          size="medium"
          disabled={remaining !== 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,

    color: '#111827',
    fontFamily: 'Bitter-Regular',
    marginBottom: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
  },
  remaining: {
    fontSize: 14,
    color: '#10B981',
    fontFamily: 'Bitter-Regular',
  },
  remainingNegative: {
    color: '#EF4444',
  },
  membersList: {
    gap: 10,
    marginBottom: 16,
  },
  memberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  memberIndexContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberIndex: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#6B7280',
  },
  memberContent: {
    flex: 1,
    gap: 8,
  },
  memberName: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    fontWeight: '500',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
  },
  inputAmount: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    padding: 0,
    margin: 0,
    flex: 1,
  },
  warningCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  errorCard: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  warningText: {
    fontSize: 14,
    color: '#10B981',
    fontFamily: 'Bitter-Regular',

    textAlign: 'center',
  },
  errorText: {
    color: '#EF4444',
  },
  footer: {
    paddingVertical: 20,
  },
});
