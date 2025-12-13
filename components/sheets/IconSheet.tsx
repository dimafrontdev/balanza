import { forwardRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput as RNTextInput } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';

interface IconSheetProps {
  onSelectIcon: (icon: string) => void;
}

const IconSheet = forwardRef<BottomSheetModal, IconSheetProps>(({ onSelectIcon }, ref) => {
  const { t } = useTranslation();
  const { renderBackdrop } = useBottomSheet(['60%']);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleEmojiSelect = () => {
    if (selectedEmoji) {
      onSelectIcon(selectedEmoji);
      (ref as any)?.current?.dismiss();
      setSelectedEmoji('');
    }
  };

  return (
    <BottomSheetWrapper sheetRef={ref} snapPoints={['60%']} renderBackdrop={renderBackdrop}>
      <BottomSheetView style={styles.bottomSheetContent}>
        <Text style={styles.bottomSheetTitle}>{t('accounts.fields.selectIcon')}</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.emojiInput} onPress={() => {}}>
            <RNTextInput
              style={styles.textInput}
              value={selectedEmoji}
              onChangeText={setSelectedEmoji}
              placeholder="😊"
              placeholderTextColor="#9CA3AF"
              maxLength={2}
              autoFocus
              onSubmitEditing={handleEmojiSelect}
            />
          </TouchableOpacity>

          {selectedEmoji && (
            <TouchableOpacity style={styles.selectButton} onPress={handleEmojiSelect}>
              <Text style={styles.selectButtonText}>{t('accounts.buttons.select')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </BottomSheetView>
    </BottomSheetWrapper>
  );
});

IconSheet.displayName = 'IconSheet';

export default IconSheet;

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 24,
    paddingTop: 8,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    alignItems: 'center',
    gap: 20,
  },
  emojiInput: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  textInput: {
    fontSize: 24,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  selectButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: '#615FFF',
    borderRadius: 12,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
