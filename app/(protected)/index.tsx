import { useCallback, useMemo, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import TotalBalanceWidget from '@/components/ui/accounts/TotalBalanceWidget';
import MonthlyBudgetWidget from '@/components/ui/balance/MonthlyBudgetWidget';
import SharedExpensesWidget from '@/components/ui/balance/SharedExpensesWidget';
import FinancialGoalsWidget from '@/components/ui/balance/FinancialGoalsWidget';
import RecentTransactionsWidget from '@/components/ui/balance/RecentTransactionsWidget';
import FloatingActionButton from '@/components/ui/common/FloatingActionButton';
import SelectAccountsSheet from '@/components/sheets/SelectAccountsSheet';
import TransactionsSheet from '@/components/sheets/TransactionsSheet';
import AddTransactionSheet from '@/components/sheets/AddTransactionSheet';
import BudgetSheet from '@/components/sheets/BudgetSheet';
import { HomeWidgetConfig } from '@/components/sheets/CustomizeHomeSheet';
import useSettingsStore from '@/store/settingsStore';
import { formatAmount } from '@/utils/currency';
import { DEFAULT_HOME_WIDGETS } from '@/constants/homeWidgets';
import {
  MOCK_TRANSACTIONS,
  MOCK_FINANCIAL_GOALS,
  MOCK_GROUPS,
  MOCK_FRIENDS,
  Friend,
  Group,
} from '@/mocks';
import useAccountsStore from '@/store/accountsStore';
import { useFocusEffect } from '@react-navigation/native';

export default function BalanceScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { currency, homeWidgets, setHomeWidgets, selectedAccountIds, setSelectedAccountIds } =
    useSettingsStore();
  const { accounts, fetchAccounts } = useAccountsStore();
  const selectAccountsSheetRef = useRef<BottomSheetModal>(null);
  const transactionsSheetRef = useRef<BottomSheetModal>(null);
  const addTransactionSheetRef = useRef<BottomSheetModal>(null);
  const budgetSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (homeWidgets.length === 0) {
      setHomeWidgets(DEFAULT_HOME_WIDGETS);
    }
  }, [homeWidgets.length, setHomeWidgets, t]);

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, []),
  );

  useEffect(() => {
    if (selectedAccountIds.length === 0 && accounts.length > 0) {
      setSelectedAccountIds(accounts.map(acc => acc.id));
    }
  }, [selectedAccountIds.length, setSelectedAccountIds, accounts]);

  const formatAmountCallback = useCallback(
    (amount: number) => formatAmount(amount, currency),
    [currency],
  );

  const totalBalance = useMemo(() => {
    const accountsToInclude = accounts.filter(acc => selectedAccountIds.includes(acc.id));
    return accountsToInclude.reduce((sum, account) => {
      return sum + account.balance;
    }, 0);
  }, [selectedAccountIds, accounts]);

  const monthlyBudget = 1000;
  const monthlySpent = 1500;

  const { totalOwe, totalOwed, recentSharedItems } = useMemo(() => {
    const friendsOwe = MOCK_FRIENDS.reduce(
      (sum, friend) => (friend.balance > 0 ? sum + friend.balance : sum),
      0,
    );
    const friendsOwed = MOCK_FRIENDS.reduce(
      (sum, friend) => (friend.balance < 0 ? sum + Math.abs(friend.balance) : sum),
      0,
    );
    const groupsOwe = MOCK_GROUPS.reduce(
      (sum, group) => (group.balance > 0 ? sum + group.balance : sum),
      0,
    );
    const groupsOwed = MOCK_GROUPS.reduce(
      (sum, group) => (group.balance < 0 ? sum + Math.abs(group.balance) : sum),
      0,
    );

    const allItems: (Friend | Group)[] = [...MOCK_GROUPS, ...MOCK_FRIENDS].filter(
      item => item.balance !== 0,
    );
    const recentItems = allItems.slice(0, 3);

    return {
      totalOwe: friendsOwe + groupsOwe,
      totalOwed: friendsOwed + groupsOwed,
      recentSharedItems: recentItems,
    };
  }, []);

  const recentTransactions = useMemo(() => MOCK_TRANSACTIONS.slice(0, 5), []);

  const visibleWidgets = useMemo(
    () => homeWidgets.filter(w => w.visible).sort((a, b) => a.order - b.order),
    [homeWidgets],
  );

  const handleOpenSelectAccounts = useCallback(() => {
    selectAccountsSheetRef.current?.present();
  }, []);

  const handleOpenTransactions = useCallback(() => {
    transactionsSheetRef.current?.present();
  }, []);

  const handleAddTransaction = useCallback(() => {
    addTransactionSheetRef.current?.present();
  }, []);

  const handleSaveSelectedAccounts = useCallback(
    (accountIds: string[]) => {
      setSelectedAccountIds(accountIds);
    },
    [setSelectedAccountIds],
  );

  const renderWidget = useCallback(
    (widget: HomeWidgetConfig) => {
      switch (widget.id) {
        case 'totalBalance':
          return (
            <View style={styles.widgetWrapper}>
              <TotalBalanceWidget
                totalBalance={totalBalance}
                changeAmount={1250}
                formatAmount={formatAmountCallback}
                onPress={handleOpenSelectAccounts}
              />
            </View>
          );

        case 'monthlyBudget':
          return (
            <View style={styles.widgetWrapper}>
              <MonthlyBudgetWidget
                budgetAmount={monthlyBudget}
                spentAmount={monthlySpent}
                formatAmount={formatAmountCallback}
                onPress={() => budgetSheetRef.current?.present()}
              />
            </View>
          );

        case 'financialGoals':
          return (
            <View style={styles.widgetWrapper}>
              <FinancialGoalsWidget
                goals={MOCK_FINANCIAL_GOALS}
                formatAmount={formatAmountCallback}
              />
            </View>
          );

        case 'sharedExpenses':
          return (
            <View style={styles.widgetWrapper}>
              <SharedExpensesWidget
                totalOwe={totalOwe}
                totalOwed={totalOwed}
                formatAmount={formatAmountCallback}
                recentItems={recentSharedItems}
              />
            </View>
          );

        case 'recentTransactions':
          return (
            <View style={styles.widgetWrapper}>
              <RecentTransactionsWidget
                transactions={recentTransactions}
                formatAmount={formatAmountCallback}
                onSeeAll={handleOpenTransactions}
              />
            </View>
          );

        default:
          return null;
      }
    },
    [
      totalBalance,
      formatAmountCallback,
      monthlyBudget,
      monthlySpent,
      totalOwe,
      totalOwed,
      recentSharedItems,
      recentTransactions,
      handleOpenSelectAccounts,
      handleOpenTransactions,
    ],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {visibleWidgets.map(widget => (
          <View key={widget.id}>{renderWidget(widget)}</View>
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>
      <SelectAccountsSheet
        ref={selectAccountsSheetRef}
        accounts={accounts}
        selectedAccountIds={selectedAccountIds}
        onSave={handleSaveSelectedAccounts}
      />
      <TransactionsSheet ref={transactionsSheetRef} formatAmount={formatAmountCallback} />
      <AddTransactionSheet ref={addTransactionSheetRef} />
      <BudgetSheet ref={budgetSheetRef} currentBudget={monthlyBudget} currency={currency} />
      <FloatingActionButton onPress={handleAddTransaction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  widgetWrapper: {
    marginBottom: 8,
  },
  bottomSpacer: {
    height: 120,
  },
});
