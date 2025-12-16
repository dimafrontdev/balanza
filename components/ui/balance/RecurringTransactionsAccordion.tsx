import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Transaction } from '@/mocks';
import Accordion from '@/components/ui/common/Accordion';

interface RecurringTransactionsAccordionProps {
  transactions: Transaction[];
  formatAmount: (amount: number) => string;
}

export default function RecurringTransactionsAccordion({
  transactions,
  formatAmount,
}: RecurringTransactionsAccordionProps) {
  const { t } = useTranslation();

  if (transactions.length === 0) return null;

  const getNextPaymentDate = (transaction: Transaction): Date => {
    const today = new Date();
    const nextDate = new Date(transaction.date);

    while (nextDate <= today) {
      if (transaction.frequency === 'daily') {
        nextDate.setDate(nextDate.getDate() + 1);
      } else if (transaction.frequency === 'weekly') {
        nextDate.setDate(nextDate.getDate() + 7);
      } else if (transaction.frequency === 'monthly') {
        nextDate.setMonth(nextDate.getMonth() + 1);
      } else if (transaction.frequency === 'yearly') {
        nextDate.setFullYear(nextDate.getFullYear() + 1);
      }
    }

    return nextDate;
  };

  const getDaysLeft = (nextDate: Date): number => {
    const today = new Date();
    const diffTime = nextDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getProgress = (transaction: Transaction, nextDate: Date): number => {
    if (transaction.frequency === 'daily') {
      return 1 - getDaysLeft(nextDate);
    } else if (transaction.frequency === 'weekly') {
      return 1 - getDaysLeft(nextDate) / 7;
    } else if (transaction.frequency === 'monthly') {
      return 1 - getDaysLeft(nextDate) / 30;
    } else if (transaction.frequency === 'yearly') {
      return 1 - getDaysLeft(nextDate) / 365;
    }

    return 0;
  };

  const formatFrequency = (frequency: string): string => {
    return t(`balance.frequency.${frequency}`);
  };

  const formatNextDate = (date: Date): string => {
    const locale = t('balance.locale');
    return date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
  };

  const header = (
    <View style={styles.headerContent}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="repeat" size={18} color="#615FFF" />
      </View>
      <View>
        <Text style={styles.headerTitle}>{t('balance.recurringTransactions')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('balance.transactionsCount', { count: transactions.length })}
        </Text>
      </View>
    </View>
  );

  return (
    <Accordion header={header}>
      <View style={styles.content}>
        {transactions.map(transaction => {
          const nextDate = getNextPaymentDate(transaction);
          const daysLeft = getDaysLeft(nextDate);
          const progress = getProgress(transaction, nextDate);
          const isIncome = transaction.type === 'income';

          return (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionHeader}>
                <View style={styles.transactionLeft}>
                  <View style={styles.categoryIconContainer}>
                    <Text style={styles.categoryIcon}>{transaction.categoryIcon}</Text>
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionTitle}>{transaction.title}</Text>
                    <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text
                    style={[styles.amount, isIncome ? styles.incomeAmount : styles.expenseAmount]}>
                    {isIncome ? '+' : ''}
                    {formatAmount(transaction.amount)}
                  </Text>
                  <Text style={styles.frequency}>{formatFrequency(transaction.frequency!)}</Text>
                </View>
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                </View>
                <View style={styles.nextPaymentInfo}>
                  <Text style={styles.nextLabel}>
                    {t('balance.next')}: {formatNextDate(nextDate)}
                  </Text>
                  <Text style={styles.daysLeft}>
                    {t('balance.daysLeftCount', { count: daysLeft })}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </Accordion>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  transactionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 18,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionRight: {
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
  frequency: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'capitalize',
  },
  progressSection: {
    gap: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#615FFF',
    borderRadius: 3,
  },
  nextPaymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  daysLeft: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
