import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  profile: {
    name: string;
    email: string;
  } | null;
  login: (profile: { name: string; email: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  profile: null,
  login: (profile) => set({ isLoggedIn: true, profile }),
  logout: () => set({ isLoggedIn: false, profile: null }),
}));

export default useAuthStore;
