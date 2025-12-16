import { forwardRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import TransactionItem from '@/components/ui/balance/TransactionItem';
import RecurringTransactionsAccordion from '@/components/ui/balance/RecurringTransactionsAccordion';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { MOCK_TRANSACTIONS, Transaction } from '@/mocks';
import { IconArrowBack } from '@/assets/icons';

interface TransactionsSheetProps {
  formatAmount: (amount: number) => string;
}

const TransactionsSheet = forwardRef<BottomSheetModal, TransactionsSheetProps>(
  ({ formatAmount }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['90%']);

    const handleClose = () => {
      (ref as any)?.current?.dismiss();
    };

    const groupedTransactions = useMemo(() => {
      const groups: { [key: string]: Transaction[] } = {};

      const regularTransactions = MOCK_TRANSACTIONS.filter(t => !t.recurring);

      regularTransactions.forEach(transaction => {
        const dateKey = transaction.date.toISOString().split('T')[0];
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(transaction);
      });

      return Object.entries(groups)
        .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
        .map(([date, transactions]) => ({
          date: new Date(date),
          transactions,
        }));
    }, []);

    const recurringTransactions = useMemo(() => {
      return MOCK_TRANSACTIONS.filter(t => t.recurring);
    }, []);

    const formatDate = (date: Date) => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const isToday = date.toDateString() === today.toDateString();
      const isYesterday = date.toDateString() === yesterday.toDateString();

      if (isToday) return t('common.today');
      if (isYesterday) return t('common.yesterday');

      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['90%']}
        stackBehavior="push"
        enableDynamicSizing={false}
        renderBackdrop={renderBackdrop}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.backButton}>
              <IconArrowBack />
            </TouchableOpacity>
            <Text style={styles.title}>{t('balance.seeAllTransactions')}</Text>
          </View>

          <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
            <RecurringTransactionsAccordion
              transactions={recurringTransactions}
              formatAmount={formatAmount}
            />
            {groupedTransactions.map(({ date, transactions }) => (
              <View key={date.toISOString()} style={styles.dayGroup}>
                <Text style={styles.dayLabel}>{formatDate(date)}</Text>
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
            ))}
            <View style={styles.bottomSpacer} />
          </BottomSheetScrollView>
        </View>
      </BottomSheetWrapper>
    );
  },
);

TransactionsSheet.displayName = 'TransactionsSheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 18,
  },
  backButton: {
    position: 'absolute',
    left: 18,
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    color: '#101828',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 24,
    marginTop: 2,
    paddingTop: 18,
  },
  dayGroup: {
    marginBottom: 16,
  },
  dayLabel: {
    fontSize: 12,
    color: '#6A7282',
    fontFamily: 'Bitter-Regular',
    marginBottom: 8,
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bottomSpacer: {
    height: 24,
  },
});

export default TransactionsSheet;
