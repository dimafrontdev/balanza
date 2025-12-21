import { forwardRef, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import StyledButton from '@/components/ui/common/StyledButton';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import SelectSingleAccountSheet from '@/components/sheets/SelectSingleAccountSheet';
import CategorySheet from '@/components/sheets/CategorySheet';
import CurrencySheet from '@/components/sheets/CurrencySheet';
import RecurringSheet, { RecurringFrequency } from '@/components/sheets/RecurringSheet';
import ScannedItemsSheet from '@/components/sheets/ScannedItemsSheet';
import GroupExpenseSheet from '@/components/sheets/GroupExpenseSheet';
import AmountInput from '@/components/ui/transaction/AmountInput';
import ExpenseForm from '@/components/ui/transaction/ExpenseForm';
import IncomeForm from '@/components/ui/transaction/IncomeForm';
import TransferForm from '@/components/ui/transaction/TransferForm';
import CameraButton from '@/components/ui/transaction/CameraButton';
import { TransactionFormData, ScannedItem } from '@/components/ui/transaction/types';
import { MOCK_TRANSACTIONS } from '@/mocks';
import { Group, Friend } from '@/mocks/groups';
import useSettingsStore from '@/store/settingsStore';
import useAccountsStore from '@/store/accountsStore';
import { IconArrowBack } from '@/assets/icons';
import { validateAmountInputWithLeadingZeros } from '@/utils/validation';

type TransactionType = 'expense' | 'income' | 'transfer';

const AddTransactionSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const { t } = useTranslation();
  const { renderBackdrop } = useBottomSheet(['90%']);
  const [activeTab, setActiveTab] = useState<TransactionType>('expense');
  const [selectedRecurring, setSelectedRecurring] = useState<RecurringFrequency | undefined>();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedSplitGroup, setSelectedSplitGroup] = useState<
    { id: string; name: string; icon: string } | undefined
  >();
  const selectAccountSheetRef = useRef<BottomSheetModal>(null);
  const selectToAccountSheetRef = useRef<BottomSheetModal>(null);
  const categorySheetRef = useRef<BottomSheetModal>(null);
  const currencySheetRef = useRef<BottomSheetModal>(null);
  const recurringSheetRef = useRef<BottomSheetModal>(null);
  const scannedItemsSheetRef = useRef<BottomSheetModal>(null);
  const groupExpenseSheetRef = useRef<BottomSheetModal>(null);
  const { currency: defaultCurrency } = useSettingsStore();
  const { accounts } = useAccountsStore();

  const getMostRecentCategory = (type: 'expense' | 'income') => {
    const recentTransaction = MOCK_TRANSACTIONS.filter(t => t.type === type).sort(
      (a, b) => b.date.getTime() - a.date.getTime(),
    )[0];

    return recentTransaction
      ? { name: recentTransaction.category, icon: recentTransaction.categoryIcon }
      : null;
  };

  const { control, handleSubmit, setValue, watch, reset } = useForm<TransactionFormData>({
    defaultValues: {
      amount: '',
      category: getMostRecentCategory('expense'),
      account: accounts[0]?.name || '',
      toAccount: '',
      note: '',
      date: new Date(),
      currency: defaultCurrency,
      items: [],
    },
  });

  const selectedAccountName = watch('account');
  const selectedToAccountName = watch('toAccount');
  const selectedCategory = watch('category');
  const selectedCurrency = watch('currency');
  const items = watch('items');

  const selectedAccount = accounts.find(acc => acc.name === selectedAccountName);
  const selectedToAccount = accounts.find(acc => acc.name === selectedToAccountName);

  useEffect(() => {
    if (accounts.length > 0) {
      const accountExists = accounts.some(acc => acc.name === selectedAccountName);
      if (!selectedAccountName || !accountExists) {
        setValue('account', accounts[0].name);
      }
    }
  }, [accounts, selectedAccountName, setValue]);

  useEffect(() => {
    if (activeTab === 'expense' || activeTab === 'income') {
      const recentCategory = getMostRecentCategory(activeTab);
      setValue('category', recentCategory);
    } else if (activeTab === 'transfer') {
      setValue('category', null);
      if (selectedAccount) {
        setValue('currency', selectedAccount.currency);
      }
    }
  }, [activeTab, selectedAccount, setValue]);

  const handleAmountChange = (text: string) => {
    return validateAmountInputWithLeadingZeros(text);
  };

  const handleSelectAccount = (accountName: string) => {
    setValue('account', accountName);
    selectAccountSheetRef.current?.dismiss();

    if (activeTab === 'transfer') {
      const account = accounts.find(acc => acc.name === accountName);
      if (account) {
        setValue('currency', account.currency);
      }
    }
  };

  const handleSelectToAccount = (accountName: string) => {
    setValue('toAccount', accountName);
    selectToAccountSheetRef.current?.dismiss();
  };

  const handleSelectCategory = (category: string, icon: string) => {
    setValue('category', { name: category, icon });
    categorySheetRef.current?.dismiss();
  };

  const handleSelectCurrency = (currency: { code: string; symbol: string }) => {
    const fullCurrency = { ...selectedCurrency, ...currency };
    setValue('currency', fullCurrency);
    currencySheetRef.current?.dismiss();
  };

  const handleSelectRecurring = (frequency: RecurringFrequency) => {
    setSelectedRecurring(frequency);
  };

  const handleRemoveRecurring = () => {
    setSelectedRecurring(undefined);
  };

  const handleSplitWithGroupPress = () => {
    groupExpenseSheetRef.current?.present();
  };

  const handleGroupExpenseConfirm = (data: {
    group?: Group;
    friend?: Friend;
    paidBy: any;
    splitType: any;
    splits: any[];
  }) => {
    if (data.group) {
      setSelectedSplitGroup({
        id: data.group.id,
        name: data.group.name,
        icon: data.group.icon,
      });
    } else if (data.friend) {
      setSelectedSplitGroup({
        id: data.friend.id,
        name: data.friend.name,
        icon: '👤',
      });
    }
    console.log('Group expense data:', data);
  };

  const handleRemoveSplitGroup = () => {
    setSelectedSplitGroup(undefined);
  };

  const handleImageSelected = () => {
    setIsScanning(true);
    scannedItemsSheetRef.current?.present();

    setTimeout(() => {
      const mockItems: ScannedItem[] = [
        { name: 'Coffee', amount: '4.50' },
        { name: 'Sandwich', amount: '8.99' },
        { name: 'Water', amount: '2.00' },
      ];
      setValue('items', mockItems);

      const total = mockItems.reduce((sum, item) => sum + parseFloat(item.amount), 0);
      setValue('amount', total.toFixed(2));

      setIsScanning(false);
    }, 2000);
  };

  const handleScannedItemChange = (index: number, field: keyof ScannedItem, value: string) => {
    const currentItems = watch('items') || [];
    const updatedItems = [...currentItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setValue('items', updatedItems);
  };

  const handleConfirmScannedItems = (items: ScannedItem[]) => {
    setValue('items', items);
    const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);
    setValue('amount', totalAmount.toFixed(2));
  };

  const handleEditItems = () => {
    scannedItemsSheetRef.current?.present();
  };

  const onSubmit = (data: TransactionFormData) => {
    console.log('Form data:', data, 'Recurring:', selectedRecurring);
  };

  return (
    <>
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['90%']}
        stackBehavior="push"
        enableDynamicSizing={false}
        keyboardBehavior="interactive"
        renderBackdrop={renderBackdrop}
        onDismiss={() => {
          reset({
            amount: '',
            category: getMostRecentCategory('expense'),
            account: accounts[0]?.name || '',
            toAccount: '',
            note: '',
            date: new Date(),
            currency: defaultCurrency,
            items: [],
          });
          setActiveTab('expense');
          setSelectedRecurring(undefined);
        }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => (ref as any)?.current?.dismiss()}
              style={styles.backButton}>
              <IconArrowBack />
            </TouchableOpacity>
            <Text style={styles.title}>{t('transaction.addTransaction')}</Text>
            <View style={styles.cameraButtonWrapper}>
              <CameraButton onImageSelected={handleImageSelected} />
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'expense' && styles.tabActive]}
              onPress={() => setActiveTab('expense')}>
              <Text style={[styles.tabText, activeTab === 'expense' && styles.tabTextActive]}>
                {t('transaction.expense')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'income' && styles.tabActive]}
              onPress={() => setActiveTab('income')}>
              <Text style={[styles.tabText, activeTab === 'income' && styles.tabTextActive]}>
                {t('transaction.income')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'transfer' && styles.tabActive]}
              onPress={() => setActiveTab('transfer')}>
              <Text style={[styles.tabText, activeTab === 'transfer' && styles.tabTextActive]}>
                {t('transaction.transfer')}
              </Text>
            </TouchableOpacity>
          </View>

          <AmountInput
            control={control}
            activeTab={activeTab}
            selectedCurrency={selectedCurrency}
            onCurrencyPress={() => currencySheetRef.current?.present()}
            onAmountChange={handleAmountChange}
          />

          {activeTab === 'expense' && (
            <ExpenseForm
              control={control}
              selectedCategory={selectedCategory}
              selectedAccount={selectedAccount}
              onCategoryPress={() => categorySheetRef.current?.present()}
              onAccountPress={() => selectAccountSheetRef.current?.present()}
              onRecurringPress={() => recurringSheetRef.current?.present()}
              selectedRecurring={selectedRecurring}
              onRemoveRecurring={handleRemoveRecurring}
              items={items}
              onEditItems={handleEditItems}
              onSplitWithGroupPress={handleSplitWithGroupPress}
              selectedGroup={selectedSplitGroup}
              onRemoveSplitGroup={handleRemoveSplitGroup}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'income' && (
            <IncomeForm
              control={control}
              selectedCategory={selectedCategory}
              selectedAccount={selectedAccount}
              onCategoryPress={() => categorySheetRef.current?.present()}
              onAccountPress={() => selectAccountSheetRef.current?.present()}
              onRecurringPress={() => recurringSheetRef.current?.present()}
              selectedRecurring={selectedRecurring}
              onRemoveRecurring={handleRemoveRecurring}
            />
          )}

          {activeTab === 'transfer' && (
            <TransferForm
              control={control}
              selectedAccount={selectedAccount}
              selectedToAccount={selectedToAccount}
              onFromAccountPress={() => selectAccountSheetRef.current?.present()}
              onToAccountPress={() => selectToAccountSheetRef.current?.present()}
              onRecurringPress={() => recurringSheetRef.current?.present()}
              selectedRecurring={selectedRecurring}
              onRemoveRecurring={handleRemoveRecurring}
            />
          )}

          <View style={styles.buttonContainer}>
            <StyledButton
              title={t('transaction.addTransaction')}
              onPress={handleSubmit(onSubmit)}
              size="medium"
            />
          </View>
        </View>
      </BottomSheetWrapper>

      <SelectSingleAccountSheet
        ref={selectAccountSheetRef}
        accounts={accounts}
        onSelect={handleSelectAccount}
        selectedAccountName={selectedAccountName}
      />

      <SelectSingleAccountSheet
        ref={selectToAccountSheetRef}
        accounts={accounts}
        onSelect={handleSelectToAccount}
        selectedAccountName={selectedToAccountName}
      />

      <CategorySheet
        ref={categorySheetRef}
        onSelect={handleSelectCategory}
        selectedCategoryName={selectedCategory?.name}
      />

      <CurrencySheet
        ref={currencySheetRef}
        onSelectCurrency={handleSelectCurrency}
        showSaveButton={false}
        value={selectedCurrency}
      />

      <RecurringSheet
        ref={recurringSheetRef}
        onSelect={handleSelectRecurring}
        selectedFrequency={selectedRecurring}
      />

      <ScannedItemsSheet
        ref={scannedItemsSheetRef}
        items={items || []}
        isLoading={isScanning}
        onConfirm={handleConfirmScannedItems}
        onItemChange={handleScannedItemChange}
        currency={selectedCurrency}
      />

      <GroupExpenseSheet
        ref={groupExpenseSheetRef}
        items={items}
        totalAmount={parseFloat(watch('amount') || '0')}
        currency={selectedCurrency}
        onConfirm={handleGroupExpenseConfirm}
      />
    </>
  );
});

AddTransactionSheet.displayName = 'AddTransactionSheet';

export default AddTransactionSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    height: 48,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Bitter-Regular',
    textAlign: 'center',
    color: '#101828',
  },
  cameraButtonWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 3,
    gap: 3,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 7,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontFamily: 'Bitter-Regular',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#111827',
    fontFamily: 'Bitter-Regular',
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
});
