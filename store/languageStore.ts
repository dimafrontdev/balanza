import { create } from 'zustand';
import * as Localization from 'expo-localization';

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
}

const useLanguageStore = create<LanguageState>(set => ({
  language: Localization.getLocales()[0].languageCode || 'en',
  setLanguage: (lang: string) => set({ language: lang }),
}));

export default useLanguageStore;
