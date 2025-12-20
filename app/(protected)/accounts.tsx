import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Icon, useTheme, Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import FloatingActionButton from '@/components/ui/common/FloatingActionButton';
import AddAccountSheet from '@/components/sheets/AddAccountSheet';
import AccountDetailsSheet from '@/components/sheets/AccountDetailsSheet';
import SectionHeader from '@/components/ui/common/SectionHeader';
import Accordion from '@/components/ui/common/Accordion';
import AccountGroupHeader from '@/components/ui/accounts/AccountGroupHeader';
import AccountItem from '@/components/ui/accounts/AccountItem';
import TotalBalanceWidget from '@/components/ui/accounts/TotalBalanceWidget';
import useSettingsStore from '@/store/settingsStore';
import useAccountsStore from '@/store/accountsStore';
import { formatAmount, Currency } from '@/utils/currency';
import { type Account } from '@/types/account';
import { groupAccountsByType } from '@/utils/accounts';

export default function AccountsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { currency } = useSettingsStore();
  const {
    accounts,
    totalBalance,
    balanceHistory,
    changeAmount,
    loading,
    error,
    fetchAccounts,
    fetchTotalBalance,
    deleteAccount: deleteAccountFromStore,
  } = useAccountsStore();

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [editAccount, setEditAccount] = useState<Account | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const addAccountSheetRef = useRef<BottomSheetModal>(null);
  const accountDetailsSheetRef = useRef<BottomSheetModal>(null);

  const formatAmountCallback = useCallback(
    (amount: number, accountCurrency?: Currency) =>
      formatAmount(amount, accountCurrency || currency),
    [currency],
  );

  useEffect(() => {
    const loadData = async () => {
      await fetchAccounts();
      await fetchTotalBalance();
    };
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAccounts();
    await fetchTotalBalance();
    setRefreshing(false);
  };

  const groupedAccounts = useMemo(() => {
    return groupAccountsByType(accounts, currency);
  }, [accounts, currency]);

  const handleAddAccount = () => {
    setEditAccount(null);
    addAccountSheetRef.current?.present();
  };

  const handleAccountPress = (account: Account) => {
    setSelectedAccount(account);
    accountDetailsSheetRef.current?.present();
  };

  const handleEditAccount = (account: Account) => {
    setEditAccount(account);
    addAccountSheetRef.current?.present();
  };

  const handleDeleteAccount = async (account: Account) => {
    await deleteAccountFromStore(account.id);
    accountDetailsSheetRef.current?.dismiss();
  };

  if (loading && accounts.length === 0) {
    return (
      <View
        style={[
          styles.container,
          styles.centerContent,
          { backgroundColor: theme.colors.background },
        ]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error && accounts.length === 0) {
    return (
      <View
        style={[
          styles.container,
          styles.centerContent,
          { backgroundColor: theme.colors.background },
        ]}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorHint}>{t('common.checkConnection')}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <TotalBalanceWidget
          totalBalance={totalBalance}
          changeAmount={changeAmount}
          formatAmount={formatAmountCallback}
          isLoading={loading}
          chartData={balanceHistory}
        />
        <SectionHeader title={t('accounts.allAccounts')} />

        {groupedAccounts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t('accounts.noAccounts')}</Text>
          </View>
        ) : (
          groupedAccounts.map(({ type, accounts: accountsList, config }) => (
            <Accordion
              key={type}
              header={
                <AccountGroupHeader
                  title={t(config.translationKey)}
                  icon={config.icon}
                  accountsCount={accountsList.length}
                />
              }
              defaultExpanded={config.defaultExpanded}>
              {accountsList.map(account => (
                <AccountItem
                  key={account.id}
                  account={account}
                  formatAmount={formatAmountCallback}
                  onPress={() => handleAccountPress(account)}
                />
              ))}
            </Accordion>
          ))
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <FloatingActionButton
        onPress={handleAddAccount}
        icon={<Icon source="credit-card-plus" color="white" size={24} />}
      />
      <AddAccountSheet ref={addAccountSheetRef} editAccount={editAccount} />
      <AccountDetailsSheet
        ref={accountDetailsSheetRef}
        account={selectedAccount}
        onEdit={handleEditAccount}
        onDelete={handleDeleteAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bottomSpacer: {
    height: 80,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  errorHint: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
