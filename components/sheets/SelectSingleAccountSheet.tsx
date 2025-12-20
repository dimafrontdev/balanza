import { forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { Account } from '@/types/account';
import { formatAmount } from '@/utils';

interface SelectSingleAccountSheetProps {
  accounts: Account[];
  onSelect: (accountName: string) => void;
  selectedAccountName?: string;
}

const SelectSingleAccountSheet = forwardRef<BottomSheetModal, SelectSingleAccountSheetProps>(
  ({ accounts, onSelect, selectedAccountName }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['60%']);

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['60%']}
        stackBehavior="push"
        enableDynamicSizing={false}
        renderBackdrop={renderBackdrop}>
        <BottomSheetView style={styles.container}>
          <Text style={styles.title}>{t('transaction.selectAccount')}</Text>

          <ScrollView style={styles.accountList} showsVerticalScrollIndicator={false}>
            {accounts.map(account => {
              const isNegative = account.balance < 0;
              const isSelected = account.name === selectedAccountName;

              return (
                <TouchableOpacity
                  key={account.id}
                  style={[styles.accountItem, isSelected && styles.accountItemSelected]}
                  onPress={() => onSelect(account.name)}>
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

SelectSingleAccountSheet.displayName = 'SelectSingleAccountSheet';

export default SelectSingleAccountSheet;

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
    marginBottom: 20,
  },
  accountList: {
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
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  accountItemSelected: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
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
    fontSize: 12,
    color: '#6B7280',
  },
  accountBalance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
    fontFamily: 'Bitter-Regular',
  },
  accountBalanceNegative: {
    color: '#EF4444',
  },
});
