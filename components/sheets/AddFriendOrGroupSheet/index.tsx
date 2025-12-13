import { forwardRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { IconArrowBack } from '@/assets/icons';
import {
  inviteFriendSchema,
  createGroupSchema,
  InviteFriendFormData,
  CreateGroupFormData,
} from '@/schemas/group';
import { ChoiceStep } from './ChoiceStep';
import { InviteFriendForm } from './InviteFriendForm';
import { CreateGroupForm } from './CreateGroupForm';

type Choice = 'friend' | 'group' | null;

const AddFriendOrGroupSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const { t } = useTranslation();
  const { renderBackdrop } = useBottomSheet(['80%']);
  const [step, setStep] = useState(1);
  const [choice, setChoice] = useState<Choice>(null);

  const friendForm = useForm<InviteFriendFormData>({
    resolver: zodResolver(inviteFriendSchema),
    defaultValues: {
      name: '',
      contact: '',
    },
  });

  const groupForm = useForm<CreateGroupFormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      icon: '👥',
    },
  });

  const handleChoiceSelect = (selectedChoice: 'friend' | 'group') => {
    setChoice(selectedChoice);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setChoice(null);
  };

  const onSubmitFriend = (data: InviteFriendFormData) => {
    console.log('Friend invited:', data);
    (ref as any)?.current?.dismiss();
  };

  const onSubmitGroup = (data: CreateGroupFormData) => {
    console.log('Group created:', data);
    (ref as any)?.current?.dismiss();
  };

  const handleSheetDismiss = () => {
    setStep(1);
    setChoice(null);
    friendForm.reset();
    groupForm.reset();
  };

  const getTitle = () => {
    if (step === 1) return t('groups.addFriendOrGroup');
    if (choice === 'friend') return t('groups.inviteFriendTitle');
    return t('groups.createGroupTitle');
  };

  return (
    <BottomSheetWrapper
      sheetRef={ref}
      snapPoints={['80%']}
      renderBackdrop={renderBackdrop}
      onDismiss={handleSheetDismiss}>
      <BottomSheetView style={styles.bottomSheetContent}>
        <View style={styles.header}>
          {step === 2 && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <IconArrowBack />
            </TouchableOpacity>
          )}
          <Text style={styles.bottomSheetTitle}>{getTitle()}</Text>
        </View>

        {step === 1 ? (
          <ChoiceStep onSelectChoice={handleChoiceSelect} />
        ) : choice === 'friend' ? (
          <InviteFriendForm
            control={friendForm.control}
            errors={friendForm.formState.errors}
            onSubmit={friendForm.handleSubmit(onSubmitFriend)}
          />
        ) : (
          <CreateGroupForm
            control={groupForm.control}
            errors={groupForm.formState.errors}
            onSubmit={groupForm.handleSubmit(onSubmitGroup)}
          />
        )}
      </BottomSheetView>
    </BottomSheetWrapper>
  );
});

AddFriendOrGroupSheet.displayName = 'AddFriendOrGroupSheet';

export default AddFriendOrGroupSheet;

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    minHeight: '100%',
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
    borderRadius: 50,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#101828',
  },
});
