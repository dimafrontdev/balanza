import { Currency } from '@/store/settingsStore';
import { currencies } from '@/components/sheets/AddAccountSheet/constants';

export type AccountType = 'cash' | 'bank' | 'credit_card' | 'investment';

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
  icon: string;
  currency: Currency;
}

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: '1',
    name: 'Cash USD',
    balance: 1234.56,
    type: 'cash',
    icon: '🗿',
    currency: currencies.find(c => c.code === 'USD')!,
  },
  {
    id: '2',
    name: 'Cash EUR',
    balance: 850.0,
    type: 'cash',
    icon: '📱',
    currency: currencies.find(c => c.code === 'EUR')!,
  },
  {
    id: '3',
    name: 'Chase Checking',
    balance: 5432.1,
    type: 'bank',
    icon: '🏆',
    currency: currencies.find(c => c.code === 'UAH')!,
  },
  {
    id: '4',
    name: 'Savings Account',
    balance: 12500.0,
    type: 'bank',
    icon: '📌',
    currency: currencies.find(c => c.code === 'USD')!,
  },
  {
    id: '5',
    name: 'Visa Platinum',
    balance: -2345.67,
    type: 'credit_card',
    icon: '🏢',
    currency: currencies.find(c => c.code === 'USD')!,
  },
  {
    id: '6',
    name: 'Mastercard Gold',
    balance: -1123.45,
    type: 'credit_card',
    icon: '💎',
    currency: currencies.find(c => c.code === 'USD')!,
  },
  {
    id: '7',
    name: 'Stocks Portfolio',
    balance: 45678.9,
    type: 'investment',
    icon: '🎁',
    currency: currencies.find(c => c.code === 'USD')!,
  },
];
