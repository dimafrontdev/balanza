import { forwardRef, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { Account } from '@/types/account';
import { formatAmount } from '@/utils';

interface SelectAccountsSheetProps {
  accounts: Account[];
  selectedAccountIds: string[];
  onSave: (accountIds: string[]) => void;
}

const SelectAccountsSheet = forwardRef<BottomSheetModal, SelectAccountsSheetProps>(
  ({ accounts, selectedAccountIds, onSave }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['60%']);
    const [localSelectedIds, setLocalSelectedIds] = useState<string[]>(selectedAccountIds);

    useEffect(() => {
      setLocalSelectedIds(selectedAccountIds);
    }, [selectedAccountIds]);

    const handleToggleAccount = useCallback(
      (accountId: string) => {
        if (localSelectedIds.includes(accountId) && localSelectedIds.length === 1) {
          return;
        }
        const newSelectedIds = localSelectedIds.includes(accountId)
          ? localSelectedIds.filter(id => id !== accountId)
          : [...localSelectedIds, accountId];
        setLocalSelectedIds(newSelectedIds);
        onSave(newSelectedIds);
      },
      [localSelectedIds, onSave],
    );

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['60%']}
        stackBehavior="push"
        enableDynamicSizing={false}
        renderBackdrop={renderBackdrop}>
        <BottomSheetView style={styles.container}>
          <Text style={styles.title}>{t('accounts.selectAccounts')}</Text>
          <Text style={styles.subtitle}>{t('accounts.selectAccountsSubtitle')}</Text>

          <ScrollView style={styles.currencyList} showsVerticalScrollIndicator={false}>
            {accounts.map(account => {
              const isSelected = localSelectedIds.includes(account.id);
              const isNegative = account.balance < 0;

              return (
                <TouchableOpacity
                  key={account.id}
                  style={[styles.accountItem, isSelected && styles.accountItemSelected]}
                  onPress={() => handleToggleAccount(account.id)}>
                  <Text style={styles.accountIcon}>{account.icon}</Text>
                  <View style={styles.accountDetails}>
                    <Text style={styles.accountName}>{account.name}</Text>
                    <Text style={styles.currencyName}>{account.currency.code}</Text>
                  </View>
                  <Text
                    style={[styles.accountBalance, isNegative && styles.accountBalanceNegative]}>
                    {formatAmount(account.balance, account.currency)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </BottomSheetView>
      </BottomSheetWrapper>
    );
  },
);

SelectAccountsSheet.displayName = 'SelectAccountsSheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 0,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Bitter-Regular',
    textAlign: 'center',
    color: '#101828',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6A7282',
    fontFamily: 'Bitter-Regular',
    marginBottom: 12,
    lineHeight: 20,
  },
  currencyList: {
    flex: 1,
    maxHeight: 390,
    marginBottom: 8,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
  },
  accountItemSelected: {
    borderColor: '#615FFF',
  },
  accountIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  accountDetails: {
    flex: 1,
  },
  accountName: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
    marginBottom: 2,
  },
  currencyName: {
    fontSize: 10,
    fontFamily: 'Bitter-Regular',
    color: '#6A7282',
  },
  accountBalance: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
  },
  accountBalanceNegative: {
    color: '#EF4444',
  },
});

export default SelectAccountsSheet;
