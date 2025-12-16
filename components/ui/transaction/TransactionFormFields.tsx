import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TransactionFormData } from './types';

interface Account {
  name: string;
  icon: string;
  currency: { code: string };
}

interface TransactionFormFieldsProps {
  control: Control<TransactionFormData>;
  selectedCategory: { name: string; icon: string } | null;
  selectedAccount: Account | undefined;
  onCategoryPress: () => void;
  onAccountPress: () => void;
}

export default function TransactionFormFields({
  control,
  selectedCategory,
  selectedAccount,
  onCategoryPress,
  onAccountPress,
}: TransactionFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <>
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
        <Text style={styles.fieldLabelText}>{t('transaction.category')}</Text>
        <TouchableOpacity style={styles.selector} onPress={onCategoryPress}>
          <View style={styles.selectorContent}>
            <Text style={styles.selectorIcon}>{selectedCategory?.icon || '🏷️'}</Text>
            <Text style={styles.selectorText}>
              {selectedCategory?.name || t('transaction.selectCategory')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabelText}>{t('transaction.account')}</Text>
        <TouchableOpacity style={styles.selector} onPress={onAccountPress}>
          <View style={styles.selectorContent}>
            <Text style={styles.selectorIcon}>{selectedAccount?.icon || '💳'}</Text>
            <View style={styles.selectorTextContainer}>
              <Text style={styles.selectorTextBold}>{selectedAccount?.name}</Text>
              <Text style={styles.selectorTextSmall}>{selectedAccount?.currency.code}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  selectorText: {
    fontSize: 16,
    fontFamily: 'Bitter-Regular',
    color: '#111827',
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
