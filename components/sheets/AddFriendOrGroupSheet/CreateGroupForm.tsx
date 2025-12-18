import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import EmojiPicker from 'rn-emoji-keyboard';
import StyledButton from '@/components/ui/common/StyledButton';
import { CreateGroupFormData } from '@/schemas/group';

interface CreateGroupFormProps {
  control: Control<CreateGroupFormData>;
  errors: FieldErrors<CreateGroupFormData>;
  onSubmit: () => void;
  isEditMode?: boolean;
}

export const CreateGroupForm = ({ control, errors, onSubmit, isEditMode }: CreateGroupFormProps) => {
  const { t } = useTranslation();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  return (
    <>
      <BottomSheetScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>{t('groups.createGroupSubtitle')}</Text>

        <View style={styles.form}>
          <Controller
            control={control}
            name="icon"
            render={({ field: { value, onChange } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>{t('groups.groupIcon')}</Text>
                <TouchableOpacity
                  style={styles.iconSelector}
                  onPress={() => setIsEmojiPickerOpen(true)}>
                  <Text style={styles.selectedIcon}>{value}</Text>
                </TouchableOpacity>
                <Text style={styles.iconHint}>{t('groups.tapToChangeIcon')}</Text>
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
            name="name"
            render={({ field: { value, onChange, onBlur } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>{t('groups.groupName')}</Text>
                <View style={errors.name ? styles.inputErrorContainer : undefined}>
                  <BottomSheetTextInput
                    style={styles.input}
                    placeholder={t('groups.groupNamePlaceholder')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                {errors.name && (
                  <Text style={styles.errorText}>{t(errors.name.message as string)}</Text>
                )}
              </View>
            )}
          />

          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{t('groups.addFriendsNote')}</Text>
          </View>
        </View>
      </BottomSheetScrollView>

      <View style={styles.buttonContainer}>
        <StyledButton 
          title={isEditMode ? t('groups.editGroupButton') : t('groups.createGroupButton')} 
          onPress={onSubmit} 
          size="medium" 
        />
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
  subtitle: {
    fontSize: 14,
    color: '#6A7282',
    marginBottom: 20,
  },
  form: {
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
  iconSelector: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  selectedIcon: {
    fontSize: 40,
  },
  iconHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#111827',
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
    marginTop: 4,
  },
  noteContainer: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  noteText: {
    fontSize: 12,
    fontFamily: 'Bitter-Light',
    color: '#1447E6',
    lineHeight: 18,
  },
  buttonContainer: {
    paddingVertical: 28,
    paddingHorizontal: 0,
  },
  emojiPicker: {
    marginHorizontal: 10,
  },
});
