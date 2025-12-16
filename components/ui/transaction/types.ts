import { Currency } from '@/store/settingsStore';

export interface ScannedItem {
  name: string;
  amount: string;
}

export interface TransactionFormData {
  amount: string;
  category: { name: string; icon: string } | null;
  account: string;
  toAccount: string;
  note: string;
  date: Date;
  currency: Currency;
  items?: ScannedItem[];
}
