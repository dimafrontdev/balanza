import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '@/mocks';
import { IconGroup } from '@/assets/icons';

interface TransactionItemProps {
  transaction: Transaction;
  formatAmount: (amount: number) => string;
  isLast?: boolean;
}

export default function TransactionItem({
  transaction,
  formatAmount,
  isLast = false,
}: TransactionItemProps) {
  const isIncome = transaction.type === 'income';

  return (
    <View style={[styles.container, isLast && styles.lastItem]}>
      <View style={styles.iconContainer}>
        <Text style={styles.categoryIcon}>{transaction.categoryIcon}</Text>
        {transaction.isGrouped && (
          <View style={styles.groupBadge}>
            <IconGroup size={10} color="white" />
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.category}>{transaction.category}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.amount, isIncome ? styles.incomeAmount : styles.expenseAmount]}>
          {isIncome ? '+' : ''}
          {formatAmount(transaction.amount)}
        </Text>
        {transaction.account && <Text style={styles.account}>{transaction.account}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  categoryIcon: {
    fontSize: 18,
  },
  groupBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: '#615FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#6B7280',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
    marginBottom: 2,
  },
  incomeAmount: {
    color: '#10B981',
  },
  expenseAmount: {
    color: '#101828',
  },
  account: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});
