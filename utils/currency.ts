export interface Currency {
  code?: string;
  symbol: string;
}

const SUFFIX_CURRENCIES = ['UAH', 'RUB', 'PLN', 'CZK', 'HUF'];

export const formatAmount = (
  amount: number,
  currency: Currency,
  options?: { showSign?: boolean; decimals?: number },
): string => {
  const decimals = options?.decimals ?? 0;
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const isSuffix = SUFFIX_CURRENCIES.includes(currency?.code ?? '');
  const sign = amount < 0 ? '-' : options?.showSign && amount > 0 ? '+' : '';

  if (isSuffix) {
    return `${sign}${formatted} ${currency.symbol}`;
  }
  return `${sign}${currency.symbol}${formatted}`;
};
