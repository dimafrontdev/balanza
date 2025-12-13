import { useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import {
  IconProfile,
  IconDollar,
  IconCard,
  IconTrash,
  IconLogout,
  IconHelp,
  IconGlobe,
  IconCategory,
} from '@/assets/icons';
import useAuthStore from '@/store/authStore';
import useSettingsStore from '@/store/settingsStore';
import SettingsItem from '@/components/ui/common/SettingsItem';
import SettingsSection from '@/components/ui/common/SettingsSection';
import EditNameSheet from '@/components/sheets/EditNameSheet';
import CurrencySheet from '@/components/sheets/CurrencySheet';
import LanguageSheet from '@/components/sheets/LanguageSheet';
import CategorySheet from '@/components/sheets/CategorySheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';

const APP_VERSION = '1.0.0';

export default function SettingsScreen() {
  const theme = useTheme();
  const { logout, user } = useAuthStore();
  const { currency, language } = useSettingsStore();
  const { t } = useTranslation();

  const nameSheetRef = useRef<BottomSheetModal>(null);
  const currencySheetRef = useRef<BottomSheetModal>(null);
  const languageSheetRef = useRef<BottomSheetModal>(null);
  const categorySheetRef = useRef<BottomSheetModal>(null);

  const getLanguageLabel = () => {
    return language === 'en' ? 'English' : 'Українська';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <SettingsSection title={t('settings.sections.profile')}>
          <SettingsItem
            icon={<IconProfile />}
            title={t('settings.items.name')}
            subtitle={user?.name}
            onPress={() => nameSheetRef.current?.present()}
          />
        </SettingsSection>

        <SettingsSection title={t('settings.sections.subscription')}>
          <SettingsItem
            icon={<IconCard size={20} color={theme.colors.primary} />}
            title={t('settings.items.choosePlan')}
            subtitle={t('settings.items.freePlan')}
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title={t('settings.sections.preferences')}>
          <SettingsItem
            icon={<IconDollar />}
            title={t('settings.items.currency')}
            subtitle={`${currency.code} (${currency.symbol})`}
            onPress={() => currencySheetRef.current?.present()}
          />

          <SettingsItem
            icon={<IconCategory />}
            title={t('settings.items.categories')}
            subtitle={t('settings.items.categoriesSubtitle')}
            onPress={() => categorySheetRef.current?.present()}
          />

          <SettingsItem
            icon={<IconGlobe />}
            title={t('settings.items.language')}
            subtitle={getLanguageLabel()}
            onPress={() => languageSheetRef.current?.present()}
          />
        </SettingsSection>

        <SettingsSection title={t('settings.sections.support')}>
          <SettingsItem
            icon={<IconHelp />}
            title={t('settings.items.helpSupport')}
            subtitle={t('settings.items.helpSupportSubtitle')}
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title={t('settings.sections.account')}>
          <SettingsItem
            icon={<IconLogout />}
            title={t('settings.items.logout')}
            onPress={logout}
            showChevron={false}
          />

          <SettingsItem
            icon={<IconTrash />}
            title={t('settings.items.deleteAccount')}
            subtitle={t('settings.items.deleteAccountSubtitle')}
            onPress={() => {}}
            danger
          />
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={styles.version}>
            {t('settings.footer.version', { version: APP_VERSION })}
          </Text>
          <Text style={styles.copyright}>
            {t('settings.footer.copyright', { year: new Date().getFullYear() })}
          </Text>
        </View>
      </ScrollView>

      <EditNameSheet ref={nameSheetRef} />
      <CurrencySheet ref={currencySheetRef} showSaveButton={true} />
      <LanguageSheet ref={languageSheetRef} />
      <CategorySheet ref={categorySheetRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingBottom: 100,
  },
  version: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#D1D5DB',
  },
});
