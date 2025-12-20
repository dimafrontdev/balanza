import { create } from 'zustand';
import { Account } from '@/types/account';
import * as accountsApi from '@/api/accounts';
import { currencies } from '@/components/sheets/AddAccountSheet/constants';

interface AccountsState {
  accounts: Account[];
  totalBalance: number;
  balanceHistory: accountsApi.BalanceHistoryItem[];
  changeAmount: number;
  loading: boolean;
  error: string | null;
  fetchAccounts: () => Promise<void>;
  fetchTotalBalance: () => Promise<void>;
  fetchBalanceHistory: () => Promise<void>;
  createAccount: (data: accountsApi.CreateAccountData) => Promise<void>;
  updateAccount: (id: string, data: accountsApi.UpdateAccountData) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  clearError: () => void;
}

const useAccountsStore = create<AccountsState>((set, get) => ({
  accounts: [],
  totalBalance: 0,
  balanceHistory: [],
  changeAmount: 0,
  loading: false,
  error: null,

  fetchAccounts: async () => {
    try {
      set({ loading: true, error: null });
      const response = await accountsApi.getAccounts();
      const accountsWithCurrency = response.data.accounts.map((account: any) => ({
        ...account,
        currency: currencies.find(c => c.code === account.currencyCode) || currencies[0],
      }));
      set({ accounts: accountsWithCurrency, loading: false });
    } catch (error: any) {
      const errorMsg = error.code === 'ERR_NETWORK' 
        ? 'Unable to connect to server. Please check your connection.' 
        : error.message || 'Failed to fetch accounts';
      console.error('Failed to fetch accounts:', errorMsg);
      set({ error: errorMsg, loading: false, accounts: [] });
    }
  },

  fetchTotalBalance: async () => {
    try {
      const [totalResponse, historyResponse] = await Promise.all([
        accountsApi.getAccountsTotal(),
        accountsApi.getBalanceHistory(6)
      ]);
      
      set({ 
        totalBalance: totalResponse.data.total,
        balanceHistory: historyResponse.data.history,
        changeAmount: totalResponse.data.changeAmount
      });
    } catch (error: any) {
      console.error('Failed to fetch total balance and history:', error);
      set({ totalBalance: 0, balanceHistory: [], changeAmount: 0 });
    }
  },

  fetchBalanceHistory: async () => {
    await get().fetchTotalBalance();
  },

  createAccount: async (data: accountsApi.CreateAccountData) => {
    try {
      set({ loading: true, error: null });
      await accountsApi.createAccount(data);
      await Promise.all([
        get().fetchAccounts(),
        get().fetchTotalBalance()
      ]);
    } catch (error: any) {
      const errorMsg = error.code === 'ERR_NETWORK' 
        ? 'Unable to connect to server' 
        : error.message || 'Failed to create account';
      console.error('Failed to create account:', errorMsg);
      set({ error: errorMsg, loading: false });
      throw error;
    }
  },

  updateAccount: async (id: string, data: accountsApi.UpdateAccountData) => {
    try {
      set({ loading: true, error: null });
      await accountsApi.updateAccount(id, data);
      await Promise.all([
        get().fetchAccounts(),
        get().fetchTotalBalance()
      ]);
    } catch (error: any) {
      const errorMsg = error.code === 'ERR_NETWORK' 
        ? 'Unable to connect to server' 
        : error.message || 'Failed to update account';
      console.error('Failed to update account:', errorMsg);
      set({ error: errorMsg, loading: false });
      throw error;
    }
  },

  deleteAccount: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await accountsApi.deleteAccount(id);
      await Promise.all([
        get().fetchAccounts(),
        get().fetchTotalBalance()
      ]);
    } catch (error: any) {
      const errorMsg = error.code === 'ERR_NETWORK' 
        ? 'Unable to connect to server' 
        : error.message || 'Failed to delete account';
      console.error('Failed to delete account:', errorMsg);
      set({ error: errorMsg, loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAccountsStore;
