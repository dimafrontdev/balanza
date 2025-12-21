import { Currency } from '@/store/settingsStore';

export type AccountType =
  | 'cash'
  | 'card'
  | 'bank'
  | 'credit'
  | 'investment'
  | 'realEstate'
  | 'cars'
  | 'goal'
  | 'other';

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
  icon: string;
  currency: Currency;
  currencyCode?: string;
  includeInTotal?: boolean;
}

export interface AccountTypeConfig {
  translationKey: string;
  icon: string;
  defaultExpanded: boolean;
}
