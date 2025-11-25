import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import i18next from '../i18n';
import { I18nextProvider } from 'react-i18next';
import useAuthStore from '../store/authStore';
import useLanguageStore from '../store/languageStore';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
  const { language } = useLanguageStore();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(protected)';

    if (isLoggedIn && !inAuthGroup) {
      router.replace('/(protected)/home');
    } else if (!isLoggedIn && inAuthGroup) {
      router.replace('/login');
    }
  }, [isLoggedIn, router, segments]);

  return (
    <I18nextProvider i18n={i18next}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </I18nextProvider>
  );
}
