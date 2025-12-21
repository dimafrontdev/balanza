import { forwardRef, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import useSettingsStore from '@/store/settingsStore';
import useAccountsStore from '@/store/accountsStore';
import { AccountFormData, accountSchema } from '@/schemas/account';
import { AccountTypeStep } from './AccountTypeStep';
import { AccountDetailsStep } from './AccountDetailsStep';
import { IconArrowBack } from '@/assets/icons';
import { Account } from '@/types/account';

interface AddAccountSheetProps {
  editAccount?: Account | null;
}

const AddAccountSheet = forwardRef<BottomSheetModal, AddAccountSheetProps>(
  ({ editAccount }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['90%']);
    const { currency } = useSettingsStore();
    const { createAccount, updateAccount } = useAccountsStore();
    const [step, setStep] = useState(1);

    const {
      control,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
    } = useForm<AccountFormData>({
      resolver: zodResolver(accountSchema),
      defaultValues: {
        type: '',
        accountName: '',
        icon: '💰',
        currency: currency,
        currentBalance: '',
        includeInTotal: true,
      },
    });

    useEffect(() => {
      if (editAccount) {
        setStep(2);
        reset({
          type: editAccount.type,
          accountName: editAccount.name,
          currentBalance: editAccount.balance.toString(),
          icon: editAccount.icon,
          currency: editAccount.currency,
          includeInTotal: editAccount.includeInTotal ?? true,
        });
      }
    }, [editAccount, reset]);

    const handleTypeSelect = (type: { icon: string; id: string }) => {
      setValue('type', type.id);
      setValue('icon', type.icon);
      setStep(2);
    };

    const handleBack = () => {
      setStep(1);
    };

    const onSubmit = async (data: AccountFormData) => {
      try {
        const balance = parseFloat(data.currentBalance);

        if (isNaN(balance)) {
          console.error('Invalid balance value:', data.currentBalance);
          return;
        }

        const accountData = {
          name: data.accountName,
          balance,
          type: data.type,
          icon: data.icon,
          currencyCode: data.currency.code,
          includeInTotal: data.includeInTotal,
        };

        if (editAccount) {
          await updateAccount(editAccount.id, accountData);
        } else {
          await createAccount(accountData);
        }

        (ref as any)?.current?.dismiss();
      } catch (error) {
        console.error('Failed to save account:', error);
      }
    };

    const handleSheetDismiss = () => {
      setStep(1);
      reset({
        type: '',
        accountName: '',
        icon: '💰',
        currency: currency,
        currentBalance: '',
        includeInTotal: true,
      });
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['90%']}
        stackBehavior="push"
        renderBackdrop={renderBackdrop}
        onDismiss={handleSheetDismiss}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.header}>
            {step === 2 && (
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <IconArrowBack />
              </TouchableOpacity>
            )}
            <Text style={styles.bottomSheetTitle}>
              {step === 1 ? t('accounts.addAccount') : t('accounts.accountDetails')}
            </Text>
          </View>

          {step === 1 ? (
            <AccountTypeStep onSelectType={handleTypeSelect} />
          ) : (
            <AccountDetailsStep
              control={control}
              errors={errors}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </View>
      </BottomSheetWrapper>
    );
  },
);

AddAccountSheet.displayName = 'AddAccountSheet';

export default AddAccountSheet;

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: '50%',
  },
  bottomSheetTitle: {
    fontSize: 18,
    color: '#101828',
  },
});
