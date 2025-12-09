import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';

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
  lng: 'uk',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
