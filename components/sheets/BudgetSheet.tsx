import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import StyledButton from '@/components/ui/common/StyledButton';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { validateAmountInputWithLeadingZeros } from '@/utils/validation';

const budgetSchema = z.object({
  amount: z.string().min(1, 'Amount is required'),
});

type BudgetFormData = z.infer<typeof budgetSchema>;

interface BudgetSheetProps {
  currentBudget: number;
  currency: { code: string; symbol: string };
  onSave?: (amount: number) => void;
}

const BudgetSheet = forwardRef<BottomSheetModal, BudgetSheetProps>(
  ({ currentBudget, currency, onSave }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['35%']);

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<BudgetFormData>({
      resolver: zodResolver(budgetSchema),
      defaultValues: {
        amount: currentBudget.toString(),
      },
    });

    const handleAmountChange = (text: string) => {
      return validateAmountInputWithLeadingZeros(text);
    };

    const onSubmit = (data: BudgetFormData) => {
      const amount = parseFloat(data.amount);
      if (onSave) {
        onSave(amount);
      }
      console.log('Budget set:', amount);
      (ref as any)?.current?.dismiss();
    };

    const handleSheetDismiss = () => {
      reset({ amount: currentBudget.toString() });
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['35%']}
        renderBackdrop={renderBackdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        onDismiss={handleSheetDismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('balance.setMonthlyBudget')}</Text>
          <Text style={styles.subtitle}>{t('balance.budgetDescription')}</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('balance.budgetAmount')}</Text>
            <View style={styles.amountInputWrapper}>
              <Text style={styles.currencySymbol}>{currency.symbol}</Text>
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, value } }) => (
                  <BottomSheetTextInput
                    style={styles.amountInput}
                    value={value}
                    onChangeText={text => onChange(handleAmountChange(text))}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor="#9CA3AF"
                  />
                )}
              />
            </View>
            {errors.amount && <Text style={styles.errorText}>{errors.amount.message}</Text>}
          </View>

          <StyledButton title={t('common.save')} onPress={handleSubmit(onSubmit)} size="medium" />
        </View>
      </BottomSheetWrapper>
    );
  },
);

BudgetSheet.displayName = 'BudgetSheet';

export default BudgetSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Bitter-Regular',
    textAlign: 'center',
    color: '#101828',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Bitter-Regular',
    marginBottom: 8,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  currencySymbol: {
    fontSize: 24,
    fontFamily: 'Bitter-Regular',
    color: '#6B7280',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'Bitter-Regular',
    color: '#111827',
    padding: 0,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    fontFamily: 'Bitter-Regular',
    marginTop: 4,
  },
});
