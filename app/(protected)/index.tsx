import { useCallback, useMemo, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import TotalBalanceWidget from '@/components/ui/accounts/TotalBalanceWidget';
import MonthlyBudgetWidget from '@/components/ui/balance/MonthlyBudgetWidget';
import SharedExpensesWidget from '@/components/ui/balance/SharedExpensesWidget';
import FinancialGoalsWidget from '@/components/ui/balance/FinancialGoalsWidget';
import RecentTransactionsWidget from '@/components/ui/balance/RecentTransactionsWidget';
import { HomeWidgetConfig } from '@/components/sheets/CustomizeHomeSheet';
import useSettingsStore from '@/store/settingsStore';
import { formatAmount, convertCurrency } from '@/utils/currency';
import { DEFAULT_HOME_WIDGETS } from '@/constants/homeWidgets';
import {
  MOCK_ACCOUNTS,
  MOCK_BALANCE_HISTORY,
  MOCK_TRANSACTIONS,
  MOCK_FINANCIAL_GOALS,
  MOCK_GROUPS,
  MOCK_FRIENDS,
  Friend,
  Group,
} from '@/mocks';

export default function BalanceScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { currency, homeWidgets, setHomeWidgets } = useSettingsStore();

  useEffect(() => {
    if (homeWidgets.length === 0) {
      const translatedWidgets = DEFAULT_HOME_WIDGETS.map(widget => ({
        ...widget,
        title: t(widget.title),
      }));
      setHomeWidgets(translatedWidgets);
    }
  }, [homeWidgets.length, setHomeWidgets, t]);

  const formatAmountCallback = useCallback(
    (amount: number) => formatAmount(amount, currency),
    [currency],
  );

  const totalBalance = useMemo(() => {
    return MOCK_ACCOUNTS.reduce((sum, account) => {
      const converted = convertCurrency(account.balance, account.currency, currency.code);
      return sum + converted;
    }, 0);
  }, [currency.code]);

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
                chartData={MOCK_BALANCE_HISTORY}
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
