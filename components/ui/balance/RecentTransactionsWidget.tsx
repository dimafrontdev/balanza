import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import TransactionItem from '@/components/ui/balance/TransactionItem';
import { Transaction } from '@/mocks';

interface RecentTransactionsWidgetProps {
  transactions: Transaction[];
  formatAmount: (amount: number) => string;
  onSeeAll: () => void;
}

export default function RecentTransactionsWidget({
  transactions,
  formatAmount,
  onSeeAll,
}: RecentTransactionsWidgetProps) {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.transactionHeaderRow}>
        <Text style={styles.sectionHeader}>{t('balance.recentTransactions')}</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>{t('balance.seeAllTransactions')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.transactionsContainer}>
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            formatAmount={formatAmount}
            isLast={index === transactions.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    color: '#6A7282',
    fontFamily: 'Bitter-Regular',
    fontSize: 12,
  },
  seeAllText: {
    fontSize: 13,
    color: '#4F39F6',
    fontFamily: 'Bitter-Regular',
    lineHeight: 20,
  },
});
