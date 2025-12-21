import { Transaction } from '@/mocks';

export function groupTransactionsByDate(transactions: Transaction[]) {
  const groups: { [key: string]: Transaction[] } = {};

  transactions.forEach(transaction => {
    const dateKey = transaction.date.toISOString().split('T')[0];
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
  });

  return Object.entries(groups)
    .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
    .map(([date, transactions]) => ({
      date: new Date(date),
      transactions,
    }));
}

export function formatTransactionDate(date: Date, t: any): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return t('common.today');
  if (isYesterday) return t('common.yesterday');

  const locale = t('balance.locale');
  return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
}
