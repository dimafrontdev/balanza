import api from './index';
import { ACCOUNT_ENDPOINTS } from '@/constants/endpoints';
import { Account } from '@/types/account';

export interface CreateAccountData {
  name: string;
  balance?: number;
  type: string;
  icon?: string;
  currencyCode: string;
  includeInTotal?: boolean;
}

export interface UpdateAccountData {
  name?: string;
  balance?: number;
  type?: string;
  icon?: string;
  currencyCode?: string;
  includeInTotal?: boolean;
}

export interface AccountsTotalResponse {
  total: number;
  byCurrency: Record<string, number>;
  currency: string;
  changeAmount: number;
}

export const getAccounts = async () => {
  return api.get<{ accounts: Account[] }>(ACCOUNT_ENDPOINTS.GET_ALL);
};

export const getAccount = async (id: string) => {
  return api.get<{ account: Account }>(ACCOUNT_ENDPOINTS.GET_ONE(id));
};

export const createAccount = async (data: CreateAccountData) => {
  return api.post<{ message: string; account: Account }>(ACCOUNT_ENDPOINTS.CREATE, data);
};

export const updateAccount = async (id: string, data: UpdateAccountData) => {
  return api.put<{ message: string; account: Account }>(ACCOUNT_ENDPOINTS.UPDATE(id), data);
};

export const deleteAccount = async (id: string) => {
  return api.delete<{ message: string }>(ACCOUNT_ENDPOINTS.DELETE(id));
};

export const getAccountsTotal = async () => {
  return api.get<AccountsTotalResponse>(ACCOUNT_ENDPOINTS.GET_TOTAL);
};

export interface BalanceHistoryItem {
  date: string;
  balance: number;
}

export const getBalanceHistory = async (months: number = 6) => {
  return api.get<{ history: BalanceHistoryItem[] }>(`${ACCOUNT_ENDPOINTS.GET_ALL}/history?months=${months}`);
};
