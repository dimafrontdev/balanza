import { Account, AccountType, AccountTypeConfig } from '@/types/account';
import { Currency, convertCurrency } from '@/utils/currency';
import { ACCOUNT_TYPE_CONFIG } from '@/constants/accounts';

export interface GroupedAccount {
  type: string;
  accounts: Account[];
  total: number;
  config: AccountTypeConfig;
}

export const groupAccountsByType = (
  accounts: Account[],
  currency: Currency,
): GroupedAccount[] => {
  const groups = accounts.reduce(
    (acc, account) => {
      if (!acc[account.type]) {
        acc[account.type] = [];
      }
      acc[account.type].push(account);
      return acc;
    },
    {} as Record<AccountType, Account[]>,
  );

  return Object.entries(groups)
    .map(([type, accountsList]) => {
      const total = accountsList.reduce((sum, acc) => {
        const converted = convertCurrency(
          acc.balance,
          acc.currency.code || '',
          currency.code || '',
        );
        return sum + converted;
      }, 0);
      const config = ACCOUNT_TYPE_CONFIG[type];

      return {
        type,
        accounts: accountsList,
        total,
        config,
      };
    })
    .filter(group => group.config !== undefined);
};
