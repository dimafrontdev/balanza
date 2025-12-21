import { useRouter, useSegments } from 'expo-router';
import 'react-native-reanimated';
import i18next from '../i18n';
import { I18nextProvider } from 'react-i18next';
import useAuthStore from '../store/authStore';
import useSettingsStore from '../store/settingsStore';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  PaperProvider,
  MD3LightTheme,
  configureFonts,
} from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, StyleSheet } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainLayout } from '@/components/layouts/MainLayout';

const fontConfig = {
  fontFamily: 'Bitter-Regular',
};

const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    primary: '#6467F1',
    primaryShadow: '#C6D2FF',
    secondaryShadow: '#E9D4FF',
    secondary: '#AD46FF',
    background: '#F9FAFB',
  },
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isLoggedIn, checkAuth } = useAuthStore();
  const { language, fetchUserProfile } = useSettingsStore();

  const segments = useSegments();
  const router = useRouter();

  const [loaded, error] = useFonts({
    'Bitter-Regular': require('../assets/fonts/Bitter-Regular.ttf'),
    'Bitter-SemiBold': require('../assets/fonts/Bitter-SemiBold.ttf'),
    'Bitter-Light': require('../assets/fonts/Bitter-Light.ttf'),
  });

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      if (isLoggedIn) {
        await fetchUserProfile();
      }
    };
    init();
  }, [checkAuth, isLoggedIn, fetchUserProfile]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    if (!loaded) return;
    const inAuthGroup = segments[0] === '(protected)';

    if (isLoggedIn && !inAuthGroup) {
      router.replace('/(protected)');
    } else if (!isLoggedIn && inAuthGroup) {
      router.replace('/login');
    }
  }, [isLoggedIn, loaded, router, segments]);

  if (!loaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <I18nextProvider i18n={i18next}>
          <MainLayout />
        </I18nextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
