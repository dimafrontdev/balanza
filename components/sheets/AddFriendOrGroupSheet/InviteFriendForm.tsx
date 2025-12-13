import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import StyledButton from '@/components/ui/common/StyledButton';
import { InviteFriendFormData } from '@/schemas/group';

interface InviteFriendFormProps {
  control: Control<InviteFriendFormData>;
  errors: FieldErrors<InviteFriendFormData>;
  onSubmit: () => void;
}

export const InviteFriendForm = ({ control, errors, onSubmit }: InviteFriendFormProps) => {
  const { t } = useTranslation();

  return (
    <>
      <BottomSheetScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <Text style={styles.subtitle}>{t('groups.inviteFriendSubtitle')}</Text>

        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange, onBlur } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>{t('groups.friendName')}</Text>
                <View style={errors.name ? styles.inputErrorContainer : undefined}>
                  <BottomSheetTextInput
                    style={styles.input}
                    placeholder={t('groups.friendNamePlaceholder')}
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

          <Controller
            control={control}
            name="contact"
            render={({ field: { value, onChange, onBlur } }) => (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>{t('groups.contactInformation')}</Text>
                <View style={errors.contact ? styles.inputErrorContainer : undefined}>
                  <BottomSheetTextInput
                    style={styles.input}
                    placeholder={t('groups.contactPlaceholder')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                {errors.contact && (
                  <Text style={styles.errorText}>{t(errors.contact.message as string)}</Text>
                )}
              </View>
            )}
          />

          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{t('groups.pendingNote')}</Text>
          </View>
        </View>
      </BottomSheetScrollView>

      <View style={styles.buttonContainer}>
        <StyledButton title={t('groups.inviteFriendButton')} onPress={onSubmit} size="medium" />
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
});
