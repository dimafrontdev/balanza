import { AccountTypeConfig } from '@/types/account';

export const ACCOUNT_TYPE_CONFIG: Record<string, AccountTypeConfig> = {
  cash: { translationKey: 'accounts.groups.cash', icon: '💵', defaultExpanded: true },
  card: { translationKey: 'accounts.groups.card', icon: '💳', defaultExpanded: true },
  bank: { translationKey: 'accounts.groups.bank', icon: '💳', defaultExpanded: true },
  credit: { translationKey: 'accounts.groups.credit', icon: '💎', defaultExpanded: false },
  investment: { translationKey: 'accounts.groups.investment', icon: '💎', defaultExpanded: false },
  realEstate: { translationKey: 'accounts.groups.realEstate', icon: '🏠', defaultExpanded: false },
  cars: { translationKey: 'accounts.groups.cars', icon: '🚗', defaultExpanded: false },
  goal: { translationKey: 'accounts.groups.goal', icon: '🎯', defaultExpanded: false },
  other: { translationKey: 'accounts.groups.other', icon: '💰', defaultExpanded: false },
};
