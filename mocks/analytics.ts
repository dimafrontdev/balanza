export interface CategoryAnalytics {
  id: string;
  category: string;
  icon: string;
  amount: number;
  percentage: number;
}

export const MOCK_CATEGORY_ANALYTICS: CategoryAnalytics[] = [
  {
    id: '1',
    category: 'Dining',
    icon: '🍽️',
    amount: 450.25,
    percentage: 35.5,
  },
  {
    id: '2',
    category: 'Transport',
    icon: '🚗',
    amount: 325.50,
    percentage: 25.7,
  },
  {
    id: '3',
    category: 'Groceries',
    icon: '🛒',
    amount: 280.00,
    percentage: 22.1,
  },
  {
    id: '4',
    category: 'Entertainment',
    icon: '🎬',
    amount: 145.75,
    percentage: 11.5,
  },
  {
    id: '5',
    category: 'Subscriptions',
    icon: '📱',
    amount: 65.50,
    percentage: 5.2,
  },
];

export interface DynamicAnalytics {
  date: string;
  income: number;
  expense: number;
}

export const MOCK_DYNAMIC_ANALYTICS: DynamicAnalytics[] = [
  { date: '2025-01-01', income: 3500, expense: 2200 },
  { date: '2025-02-01', income: 4200, expense: 2800 },
  { date: '2025-03-01', income: 3800, expense: 2500 },
  { date: '2025-04-01', income: 4500, expense: 3100 },
  { date: '2025-05-01', income: 3900, expense: 2700 },
  { date: '2025-06-01', income: 4100, expense: 2900 },
  { date: '2025-07-01', income: 4300, expense: 3200 },
  { date: '2025-08-01', income: 3700, expense: 2600 },
  { date: '2025-09-01', income: 4600, expense: 3300 },
  { date: '2025-10-01', income: 3900, expense: 2800 },
  { date: '2025-11-01', income: 4200, expense: 3000 },
  { date: '2025-12-01', income: 4000, expense: 2900 },
];
