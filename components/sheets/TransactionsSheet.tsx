import { forwardRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import TransactionGroup from '@/components/ui/common/TransactionGroup';
import TransactionItem from '@/components/ui/balance/TransactionItem';
import RecurringTransactionsAccordion from '@/components/ui/balance/RecurringTransactionsAccordion';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { MOCK_TRANSACTIONS } from '@/mocks';
import { IconArrowBack } from '@/assets/icons';
import { groupTransactionsByDate, formatTransactionDate } from '@/utils/dateHelpers';

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
      const regularTransactions = MOCK_TRANSACTIONS.filter(t => !t.recurring);
      return groupTransactionsByDate(regularTransactions);
    }, []);

    const recurringTransactions = useMemo(() => {
      return MOCK_TRANSACTIONS.filter(t => t.recurring);
    }, []);



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
              <TransactionGroup key={date.toISOString()} dateLabel={formatTransactionDate(date, t)}>
                {transactions.map((transaction, index) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    formatAmount={formatAmount}
                    isLast={index === transactions.length - 1}
                  />
                ))}
              </TransactionGroup>
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
  bottomSpacer: {
    height: 24,
  },
});

export default TransactionsSheet;
