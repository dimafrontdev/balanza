import { useRef, useMemo, useCallback, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';
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
import { formatAmount, convertCurrency } from '@/utils/currency';
import { MOCK_ACCOUNTS, type Account, type AccountType } from '@/mocks/accounts';
import { MOCK_BALANCE_HISTORY } from '@/mocks/chartData';

interface AccountTypeConfig {
  translationKey: string;
  icon: string;
  defaultExpanded: boolean;
}

const ACCOUNT_TYPE_CONFIG: Record<AccountType, AccountTypeConfig> = {
  cash: { translationKey: 'accounts.groups.cash', icon: '💵', defaultExpanded: true },
  bank: { translationKey: 'accounts.groups.bank', icon: '💳', defaultExpanded: true },
  credit_card: {
    translationKey: 'accounts.groups.credit_card',
    icon: '💳',
    defaultExpanded: false,
  },
  investment: { translationKey: 'accounts.groups.investment', icon: '💎', defaultExpanded: false },
};

export default function AccountsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { currency } = useSettingsStore();
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [editAccount, setEditAccount] = useState<Account | null>(null);
  
  const addAccountSheetRef = useRef<BottomSheetModal>(null);
  const accountDetailsSheetRef = useRef<BottomSheetModal>(null);

  const formatAmountCallback = useCallback(
    (amount: number) => formatAmount(amount, currency),
    [currency],
  );

  const totalBalance = useMemo(() => {
    return MOCK_ACCOUNTS.reduce((sum, account) => {
      const converted = convertCurrency(account.balance, account.currency.code, currency.code);
      return sum + converted;
    }, 0);
  }, [currency.code]);

  const groupedAccounts = useMemo(() => {
    const groups = MOCK_ACCOUNTS.reduce(
      (acc, account) => {
        if (!acc[account.type]) {
          acc[account.type] = [];
        }
        acc[account.type].push(account);
        return acc;
      },
      {} as Record<AccountType, Account[]>,
    );

    return Object.entries(groups).map(([type, accounts]) => {
      const total = accounts.reduce((sum, acc) => {
        const converted = convertCurrency(acc.balance, acc.currency.code, currency.code);
        return sum + converted;
      }, 0);
      const config = ACCOUNT_TYPE_CONFIG[type as AccountType];

      return {
        type: type as AccountType,
        accounts,
        total,
        totalFormatted: formatAmount(total, currency),
        config,
      };
    });
  }, [currency]);

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

  const handleDeleteAccount = (account: Account) => {
    console.log('Delete account:', account.id);
    accountDetailsSheetRef.current?.dismiss();
    // TODO: Implement actual account deletion
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TotalBalanceWidget
          totalBalance={totalBalance}
          changeAmount={1250}
          formatAmount={formatAmountCallback}
          chartData={MOCK_BALANCE_HISTORY}
        />
        <SectionHeader title={t('accounts.allAccounts')} />

        {groupedAccounts.map(({ type, accounts, totalFormatted, config }) => (
          <Accordion
            key={type}
            header={
              <AccountGroupHeader
                title={t(config.translationKey)}
                total={totalFormatted}
                icon={config.icon}
                accountsCount={accounts.length}
              />
            }
            defaultExpanded={config.defaultExpanded}>
            {accounts.map(account => (
              <AccountItem 
                key={account.id} 
                account={account} 
                formatAmount={formatAmountCallback}
                onPress={() => handleAccountPress(account)}
              />
            ))}
          </Accordion>
        ))}

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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bottomSpacer: {
    height: 80,
  },
});
