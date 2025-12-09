import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '@/api/auth';
import { LoginFormData, RegisterFormData } from '@/schemas/auth';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import i18next from '../i18n';
import { saveToken, deleteToken, getToken } from './secureStore';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  user: User | null;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateUserName: (name: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isLoggedIn: false,
      loading: false,
      user: null,
      login: async (data: LoginFormData) => {
        set({ loading: true });
        try {
          const res = await api.login(data);
          const { user, token } = res.data;
          await saveToken(token);
          set({ isLoggedIn: true, user, loading: false });
          router.replace('/(protected)');
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || i18next.t('auth.errors.loginFailed');
          Toast.show({ type: 'error', text1: errorMessage });
          set({ loading: false });
        }
      },
      register: async (data: RegisterFormData) => {
        set({ loading: true });
        try {
          const res = await api.register(data);
          const { user, token } = res.data;
          await saveToken(token);
          set({ isLoggedIn: true, user, loading: false });
          router.replace('/(protected)');
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.error || i18next.t('auth.errors.registrationFailed');
          Toast.show({ type: 'error', text1: errorMessage });
          set({ loading: false });
        }
      },
      logout: async () => {
        await deleteToken();
        set({ isLoggedIn: false, user: null });
        router.replace('/login');
      },
      checkAuth: async () => {
        const token = await getToken();
        if (token) {
          set({ isLoggedIn: true });
        }
      },
      updateUserName: (name: string) => {
        set(state => ({
          user: state.user ? { ...state.user, name } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
