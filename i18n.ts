import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import useLanguageStore from './store/languageStore';

import en from './locales/en.json';
import uk from './locales/uk.json';

const resources = {
  en: {
    translation: en,
  },
  uk: {
    translation: uk,
  },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'en', // Initialize with fallback, actual language set in RootLayout
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

useLanguageStore.subscribe(
  (state) => state.language,
  (language) => {
    i18next.changeLanguage(language);
  }
);

export default i18next;
