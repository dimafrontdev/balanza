import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Transaction } from '@/mocks';

interface TransactionItemProps {
  transaction: Transaction;
  formatAmount: (amount: number) => string;
  isLast: boolean;
}

export const TransactionItem = ({ transaction, formatAmount, isLast }: TransactionItemProps) => {
  const { t } = useTranslation();
  const isIncome = transaction.amount > 0;
  const fullAmount = Math.abs(transaction.amount);
  const yourShare = fullAmount / 2;

  return (
    <View style={[styles.transactionItem, !isLast && styles.transactionBorder]}>
      <View style={styles.transactionIconContainer}>
        <Text style={styles.transactionIcon}>{transaction.categoryIcon}</Text>
      </View>
      <View style={styles.transactionContent}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>
        <Text style={styles.transactionCategory}>{transaction.category}</Text>
        <Text style={styles.transactionTotal}>
          {t('groups.details.total')}: {formatAmount(fullAmount)}
        </Text>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[styles.transactionLabel, isIncome ? styles.amountIncome : styles.amountExpense]}>
          {isIncome ? t('groups.details.youLent') : t('groups.details.youBorrowed')}
        </Text>
        <Text
          style={[styles.transactionAmount, isIncome ? styles.amountIncome : styles.amountExpense]}>
          {formatAmount(yourShare)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: { flexDirection: 'row', paddingVertical: 10 },
  transactionBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  transactionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionIcon: { fontSize: 24 },
  transactionContent: { flex: 1 },
  transactionTitle: { fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 2 },
  transactionCategory: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  transactionTotal: { fontSize: 11, color: '#9CA3AF' },
  transactionRight: { alignItems: 'flex-end', justifyContent: 'center' },
  transactionLabel: { fontSize: 11, marginBottom: 4 },
  transactionAmount: { fontSize: 15, fontWeight: '600' },
  amountIncome: { color: '#51CF66' },
  amountExpense: { color: '#FF6B6B' },
});
