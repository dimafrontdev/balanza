import { forwardRef, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
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
import * as groupsApi from '@/api/groups';
import { ChoiceStep } from './ChoiceStep';
import { InviteFriendForm } from './InviteFriendForm';
import { CreateGroupForm } from './CreateGroupForm';

type Choice = 'friend' | 'group' | null;

interface AddFriendOrGroupSheetProps {
  editGroup?: { id: string; name: string; icon: string } | null;
  onSuccess?: () => void;
}

const AddFriendOrGroupSheet = forwardRef<BottomSheetModal, AddFriendOrGroupSheetProps>(
  ({ editGroup, onSuccess }, ref) => {
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
        name: editGroup?.name || '',
        icon: editGroup?.icon || '👥',
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

    const onSubmitFriend = async (data: InviteFriendFormData) => {
      await groupsApi.inviteFriend(data);
      (ref as any)?.current?.dismiss();
      onSuccess?.();
    };

    const onSubmitGroup = async (data: CreateGroupFormData) => {
      if (editGroup) {
        await groupsApi.updateGroup(editGroup.id, data);
      } else {
        await groupsApi.createGroup(data);
      }
      (ref as any)?.current?.dismiss();
      onSuccess?.();
    };

    const handleSheetDismiss = () => {
      setStep(1);
      setChoice(null);
      friendForm.reset();
      groupForm.reset({
        name: '',
        icon: '👥',
      });
    };

    const handleSheetChange = (index: number) => {
      if (index === -1 && editGroup) {
        groupForm.reset({ name: '', icon: '👥' });
      }
    };

    useEffect(() => {
      if (editGroup) {
        setStep(2);
        setChoice('group');
        groupForm.reset({
          name: editGroup.name,
          icon: editGroup.icon,
        });
      } else {
        setStep(1);
        setChoice(null);
      }
    }, [editGroup, groupForm]);

    const getTitle = () => {
      if (editGroup) return t('groups.editGroupTitle');
      if (step === 1) return t('groups.addFriendOrGroup');
      if (choice === 'friend') return t('groups.inviteFriendTitle');
      return t('groups.createGroupTitle');
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['80%']}
        stackBehavior="push"
        renderBackdrop={renderBackdrop}
        onDismiss={handleSheetDismiss}
        onChange={handleSheetChange}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.header}>
            {step === 2 && !editGroup && (
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <IconArrowBack />
              </TouchableOpacity>
            )}
            <Text style={styles.bottomSheetTitle}>{getTitle()}</Text>
          </View>

          {editGroup || step === 2 ? (
            choice === 'friend' ? (
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
                isEditMode={!!editGroup}
              />
            )
          ) : (
            <ChoiceStep onSelectChoice={handleChoiceSelect} />
          )}
        </View>
      </BottomSheetWrapper>
    );
  },
);

AddFriendOrGroupSheet.displayName = 'AddFriendOrGroupSheet';

export default AddFriendOrGroupSheet;

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
    borderRadius: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,

    color: '#101828',
  },
});
