import { forwardRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import StyledButton from '@/components/ui/common/StyledButton';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import useSettingsStore from '@/store/settingsStore';

const languages = [
  { code: 'en', title: 'English', subtitle: 'English', flag: '🇬🇧' },
  { code: 'uk', title: 'Українська', subtitle: 'Ukrainian', flag: '🇺🇦' },
];

interface Language {
  code: string;
  title: string;
  subtitle: string;
  flag: string;
}

const LanguageSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const { t, i18n } = useTranslation();
  const { renderBackdrop } = useBottomSheet(['38%']);
  const { language, setLanguage } = useSettingsStore();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleSelect = (lang: Language) => {
    setSelectedLanguage(lang);
  };

  const handleSave = async () => {
    if (selectedLanguage) {
      await i18n.changeLanguage(selectedLanguage.code);
      setLanguage(selectedLanguage.code);
    }
    if (ref && 'current' in ref && ref.current) {
      ref.current.dismiss();
    }
  };

  return (
    <BottomSheetWrapper sheetRef={ref} snapPoints={['38%']} renderBackdrop={renderBackdrop}>
      <BottomSheetView style={styles.bottomSheetContent}>
        <Text style={styles.bottomSheetTitle}>{t('settings.sheets.selectLanguage')}</Text>
        <ScrollView style={styles.languageList}>
          {languages.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageItem,
                (selectedLanguage?.code || language) === lang.code && styles.languageItemSelected,
              ]}
              onPress={() => handleSelect(lang)}>
              <Text style={styles.languageFlag}>{lang.flag}</Text>
              <View style={styles.languageTextContainer}>
                <Text style={styles.languageTitle}>{lang.title}</Text>
                <Text style={styles.languageSubtitle}>{lang.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

LanguageSheet.displayName = 'LanguageSheet';
export default LanguageSheet;

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
  },
  languageList: {
    maxHeight: 400,
  },
  saveButton: {
    marginTop: 8,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
  },
  languageItemSelected: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  languageSubtitle: {
    fontSize: 10,
    color: '#6B7280',
  },
});
