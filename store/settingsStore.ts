import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencies } from '@/components/sheets/AddAccountSheet/constants';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface HomeWidgetConfig {
  id: string;
  title: string;
  visible: boolean;
  order: number;
}

interface SettingsState {
  currency: Currency;
  language: string;
  homeWidgets: HomeWidgetConfig[];
  selectedAccountIds: string[];
  setCurrency: (currency: Currency) => void;
  setLanguage: (language: string) => void;
  setHomeWidgets: (widgets: HomeWidgetConfig[]) => void;
  setSelectedAccountIds: (accountIds: string[]) => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      currency: currencies[0],
      language: 'en',
      homeWidgets: [],
      selectedAccountIds: [],
      setCurrency: currency => set({ currency }),
      setLanguage: language => set({ language }),
      setHomeWidgets: widgets => set({ homeWidgets: widgets }),
      setSelectedAccountIds: accountIds => set({ selectedAccountIds: accountIds }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useSettingsStore;
