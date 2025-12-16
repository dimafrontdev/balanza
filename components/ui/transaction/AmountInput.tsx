import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Currency } from '@/store/settingsStore';
import { TransactionFormData } from './types';

type TransactionType = 'expense' | 'income' | 'transfer';

interface AmountInputProps {
  control: Control<TransactionFormData>;
  activeTab: TransactionType;
  selectedCurrency: Currency;
  onCurrencyPress: () => void;
  onAmountChange: (text: string) => string;
}

export default function AmountInput({
  control,
  activeTab,
  selectedCurrency,
  onCurrencyPress,
  onAmountChange,
}: AmountInputProps) {
  return (
    <View style={styles.amountContainer}>
      <View style={styles.amountRow}>
        {activeTab === 'expense' && <Text style={styles.amountSign}>-</Text>}
        {activeTab === 'income' && (
          <Text style={[styles.amountSign, styles.amountSignPositive]}>+</Text>
        )}
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.amountInput}
              value={value}
              onChangeText={text => onChange(onAmountChange(text))}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor="#9CA3AF"
            />
          )}
        />
        <TouchableOpacity onPress={onCurrencyPress} disabled={activeTab === 'transfer'}>
          <Text
            style={[
              styles.currencySymbol,
              activeTab === 'transfer' && styles.currencySymbolDisabled,
            ]}>
            {selectedCurrency.symbol}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amountContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 24,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amountSign: {
    fontSize: 48,
    fontFamily: 'Bitter-Regular',
    color: '#EF4444',
  },
  amountSignPositive: {
    color: '#10B981',
  },
  amountInput: {
    fontSize: 48,
    fontFamily: 'Bitter-Regular',
    color: '#111827',
    minWidth: 100,
    flex: 1,
  },
  currencySymbol: {
    fontSize: 48,
    fontFamily: 'Bitter-Regular',
    color: '#6B7280',
  },
  currencySymbolDisabled: {
    opacity: 0.5,
  },
});
