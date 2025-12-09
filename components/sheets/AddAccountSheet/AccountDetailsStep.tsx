import { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Checkbox, useTheme } from 'react-native-paper';
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import EmojiPicker from 'rn-emoji-keyboard';
import StyledButton from '@/components/ui/common/StyledButton';
import CurrencySheet from '../CurrencySheet';
import { AccountFormData } from '@/schemas/account';
import { currencies } from './constants';

interface AccountDetailsStepProps {
  control: Control<AccountFormData>;
  errors: FieldErrors<AccountFormData>;
  onSubmit: () => void;
}

export const AccountDetailsStep = ({ control, errors, onSubmit }: AccountDetailsStepProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const currencySheetRef = useRef<BottomSheetModal>(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const getCurrencyInfo = (code: string) => {
    return currencies.find(c => c.code === code) ?? currencies[0];
  };

  return (
    <>
      <BottomSheetScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.detailsForm}>
          <Controller
            control={control}
            name="icon"
            render={({ field: { value, onChange } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>{t('accounts.fields.icon')}</Text>
                <TouchableOpacity
                  style={styles.iconSelector}
                  onPress={() => setIsEmojiPickerOpen(true)}>
                  <Text style={styles.selectedIcon}>{value}</Text>
                </TouchableOpacity>
                <EmojiPicker
                  onEmojiSelected={emoji => {
                    onChange(emoji.emoji);
                    setIsEmojiPickerOpen(false);
                  }}
                  open={isEmojiPickerOpen}
                  styles={{ container: styles.emojiPicker }}
                  enableRecentlyUsed
                  expandable={false}
                  hideHeader
                  categoryPosition="bottom"
                  onClose={() => setIsEmojiPickerOpen(false)}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="accountName"
            render={({ field: { value, onChange, onBlur } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>{t('accounts.fields.accountName')}</Text>
                <View style={errors.accountName ? styles.inputErrorContainer : undefined}>
                  <BottomSheetTextInput
                    style={styles.input}
                    placeholder={t('accounts.fields.accountNamePlaceholder')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                {errors.accountName && (
                  <Text style={styles.errorText}>{t(errors.accountName.message as string)}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="currency"
            render={({ field: { value, onChange } }) => {
              const currencyInfo = getCurrencyInfo(value.code);
              return (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>{t('accounts.fields.currency')}</Text>
                  <TouchableOpacity
                    style={styles.currencySelector}
                    onPress={() => currencySheetRef.current?.present()}>
                    <View style={styles.currencyContent}>
                      <Text style={styles.currencyFlag}>{currencyInfo.flag}</Text>
                      <View>
                        <Text style={styles.currencyCode}>{currencyInfo.code}</Text>
                        <Text style={styles.currencyName}>{currencyInfo.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <CurrencySheet
                    ref={currencySheetRef}
                    onSelectCurrency={curr => {
                      onChange(curr);
                      currencySheetRef.current?.dismiss();
                    }}
                    showSaveButton={false}
                    value={value}
                  />
                </View>
              );
            }}
          />

          <Controller
            control={control}
            name="currentBalance"
            render={({ field: { value, onChange, onBlur } }) => (
              <Controller
                control={control}
                name="currency"
                render={({ field: { value: currency } }) => (
                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>{t('accounts.fields.currentBalance')}</Text>
                    <View style={errors.currentBalance ? styles.inputErrorContainer : undefined}>
                      <View style={styles.balanceInputContainer}>
                        <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                        <BottomSheetTextInput
                          style={[styles.input, styles.balanceInput]}
                          placeholder="0.00"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="numeric"
                          placeholderTextColor="#9CA3AF"
                        />
                      </View>
                    </View>
                    {errors.currentBalance && (
                      <Text style={styles.errorText}>
                        {t(errors.currentBalance.message as string)}
                      </Text>
                    )}
                  </View>
                )}
              />
            )}
          />

          <Controller
            control={control}
            name="includeInTotal"
            render={({ field: { value, onChange } }) => (
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => onChange(!value)}>
                <Checkbox
                  status={value ? 'checked' : 'unchecked'}
                  onPress={() => onChange(!value)}
                  color={theme.colors.primary}
                />
                <Text style={styles.checkboxLabel}>{t('accounts.fields.includeInTotal')}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheetScrollView>

      <View style={styles.buttonContainer}>
        <StyledButton title={t('accounts.buttons.saveAccount')} onPress={onSubmit} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
  detailsForm: {
    marginTop: 12,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#6A7282',
    marginBottom: 8,
    lineHeight: 18,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#111827',
  },
  balanceInputContainer: {
    position: 'relative',
  },
  balanceInput: {
    paddingLeft: 35,
  },
  iconSelector: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIcon: {
    fontSize: 40,
  },
  currencySelector: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  currencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currencyFlag: {
    fontSize: 24,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  currencyName: {
    fontSize: 12,
    color: '#6B7280',
  },
  currencySymbol: {
    position: 'absolute',
    left: 16,
    top: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    zIndex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 12,
    marginTop: 12,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#111827',
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  inputErrorContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
    overflow: 'hidden',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 2,
  },
  emojiPicker: {
    marginHorizontal: 10,
  },
});
