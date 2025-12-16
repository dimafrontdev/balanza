import { Control, Controller } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import RecurringOption from './RecurringOption';
import { TransactionFormData } from './types';
import { RecurringFrequency } from '@/components/sheets/RecurringSheet';

interface Account {
  name: string;
  icon: string;
  currency: { code: string };
}

interface TransferFormProps {
  control: Control<TransactionFormData>;
  selectedAccount: Account | undefined;
  selectedToAccount: Account | undefined;
  onFromAccountPress: () => void;
  onToAccountPress: () => void;
  onRecurringPress: () => void;
  selectedRecurring?: RecurringFrequency;
  onRemoveRecurring: () => void;
}

export default function TransferForm({
  control,
  selectedAccount,
  selectedToAccount,
  onFromAccountPress,
  onToAccountPress,
  onRecurringPress,
  selectedRecurring,
  onRemoveRecurring,
}: TransferFormProps) {
  const { t } = useTranslation();

  return (
    <ScrollView
      style={styles.content}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabelText}>{t('transaction.description')}</Text>
        <Controller
          control={control}
          name="note"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.noteInput}
              value={value}
              onChangeText={onChange}
              placeholder={t('transaction.addDescription')}
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
              blurOnSubmit
            />
          )}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabelText}>{t('transaction.fromAccount')}</Text>
        <TouchableOpacity style={styles.selector} onPress={onFromAccountPress}>
          <View style={styles.selectorContent}>
            <Text style={styles.selectorIcon}>{selectedAccount?.icon || '💳'}</Text>
            <View style={styles.selectorTextContainer}>
              <Text style={styles.selectorTextBold}>{selectedAccount?.name}</Text>
              <Text style={styles.selectorTextSmall}>{selectedAccount?.currency.code}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabelText}>{t('transaction.toAccount')}</Text>
        <TouchableOpacity style={styles.selector} onPress={onToAccountPress}>
          <View style={styles.selectorContent}>
            <Text style={styles.selectorIcon}>{selectedToAccount?.icon || '💳'}</Text>
            <View style={styles.selectorTextContainer}>
              <Text style={styles.selectorTextBold}>
                {selectedToAccount?.name || t('transaction.selectAccount')}
              </Text>
              {selectedToAccount && (
                <Text style={styles.selectorTextSmall}>{selectedToAccount.currency.code}</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <RecurringOption
        onPress={onRecurringPress}
        selectedFrequency={selectedRecurring}
        onRemove={onRemoveRecurring}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabelText: {
    fontSize: 12,
    fontFamily: 'Bitter-Regular',
    color: '#6A7282',
    marginBottom: 8,
    lineHeight: 18,
  },
  selector: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    minHeight: 60,
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  selectorIcon: {
    fontSize: 24,
  },
  selectorTextContainer: {
    flex: 1,
  },
  selectorTextBold: {
    fontSize: 16,
    fontFamily: 'Bitter-Regular',
    color: '#111827',
  },
  selectorTextSmall: {
    fontSize: 12,
    fontFamily: 'Bitter-Regular',
    color: '#6B7280',
  },
  noteInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#111827',
  },
});
