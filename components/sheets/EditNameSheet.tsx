import { useState, forwardRef } from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import StyledButton from '@/components/ui/common/StyledButton';
import useAuthStore from '@/store/authStore';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import TextInput from '@/components/ui/inputs/TextInput';

const EditNameSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const { t } = useTranslation();
  const { user, updateUserName } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const { renderBackdrop } = useBottomSheet(['65%']);

  const handleSave = () => {
    updateUserName(name);
    if (ref && 'current' in ref && ref.current) {
      ref.current.dismiss();
    }
  };

  return (
    <BottomSheetWrapper sheetRef={ref} snapPoints={['65%']} renderBackdrop={renderBackdrop}>
      <BottomSheetView style={styles.bottomSheetContent}>
        <Text style={styles.bottomSheetTitle}>{t('settings.sheets.editName')}</Text>
        <TextInput
          autoFocus
          placeholder={t('settings.sheets.namePlaceholder')}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <StyledButton
          title={t('settings.sheets.save')}
          onPress={handleSave}
          style={styles.saveButton}
          size="medium"
        />
      </BottomSheetView>
    </BottomSheetWrapper>
  );
});

EditNameSheet.displayName = 'EditNameSheet';
export default EditNameSheet;

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 24,
    paddingTop: 8,
    gap: 16,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    borderWidth: 0.6,
    borderColor: '#E5E7EB',
    borderRadius: 12,
  },
  saveButton: {
    marginTop: 8,
  },
});
