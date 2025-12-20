import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencies } from '@/components/sheets/AddAccountSheet/constants';
import * as usersApi from '@/api/users';

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
  userName: string;
  fetchUserProfile: () => Promise<void>;
  setCurrency: (currency: Currency) => Promise<void>;
  setLanguage: (language: string) => void;
  setHomeWidgets: (widgets: HomeWidgetConfig[]) => void;
  setSelectedAccountIds: (accountIds: string[]) => void;
  setUserName: (name: string) => Promise<void>;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      currency: currencies[0],
      language: 'en',
      homeWidgets: [],
      selectedAccountIds: [],
      userName: '',
      
      fetchUserProfile: async () => {
        try {
          const response = await usersApi.getUserProfile();
          const { user } = response.data;
          
          const userCurrency = currencies.find(c => c.code === user.currency) || currencies[0];
          
          set({ 
            currency: userCurrency,
            userName: user.name
          });
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      },
      
      setCurrency: async (currency: Currency) => {
        try {
          await usersApi.updateUserProfile({ currency: currency.code });
          set({ currency });
        } catch (error) {
          console.error('Failed to update currency:', error);
          throw error;
        }
      },
      
      setUserName: async (name: string) => {
        try {
          await usersApi.updateUserProfile({ name });
          set({ userName: name });
        } catch (error) {
          console.error('Failed to update name:', error);
          throw error;
        }
      },
      
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
