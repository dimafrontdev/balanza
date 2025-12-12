export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  categoryIcon: string;
  date: Date;
  type: 'income' | 'expense';
  isGrouped?: boolean;
  account?: string;
  recurring?: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: -87.5,
    category: 'Groceries',
    categoryIcon: '🛒',
    date: new Date('2025-12-10'),
    type: 'expense',
    account: 'Chase Checking',
  },
  {
    id: '2',
    title: 'Barcelona Trip Dinner',
    amount: -125.0,
    category: 'Dining',
    categoryIcon: '🍽️',
    date: new Date('2025-12-10'),
    type: 'expense',
    isGrouped: true,
    account: 'Cash USD',
  },
  {
    id: '3',
    title: 'Monthly Salary',
    amount: 4500.0,
    category: 'Salary',
    categoryIcon: '💰',
    date: new Date('2025-11-29'),
    type: 'income',
    account: 'Chase Checking',
    recurring: true,
    frequency: 'monthly',
  },
  {
    id: '4',
    title: 'Office Lunch',
    amount: -23.8,
    category: 'Dining',
    categoryIcon: '🍽️',
    date: new Date('2024-12-05'),
    type: 'expense',
    isGrouped: true,
    account: 'Cash USD',
  },
  {
    id: '5',
    title: 'Uber Ride',
    amount: -15.3,
    category: 'Transport',
    categoryIcon: '🚗',
    date: new Date('2024-12-04'),
    type: 'expense',
    account: 'Visa Platinum',
  },
  {
    id: '6',
    title: 'Netflix Subscription',
    amount: -12.99,
    category: 'Subscriptions',
    categoryIcon: '📺',
    date: new Date('2024-12-03'),
    type: 'expense',
    account: 'Visa Platinum',
    recurring: true,
    frequency: 'monthly',
  },
  {
    id: '7',
    title: 'Coffee Shop',
    amount: -5.5,
    category: 'Dining',
    categoryIcon: '☕',
    date: new Date('2024-12-02'),
    type: 'expense',
    account: 'Cash USD',
  },
  {
    id: '8',
    title: 'Coffee Shop',
    amount: -5.5,
    category: 'Dining',
    categoryIcon: '☕',
    date: new Date('2024-12-02'),
    type: 'expense',
    account: 'Cash USD',
  },
  {
    id: '9',
    title: 'Coffee Shop',
    amount: -5.5,
    category: 'Dining',
    categoryIcon: '☕',
    date: new Date('2024-12-02'),
    type: 'expense',
    account: 'Cash USD',
  },
  {
    id: '10',
    title: 'Coffee Shop',
    amount: -5.5,
    category: 'Dining',
    categoryIcon: '☕',
    date: new Date('2024-12-02'),
    type: 'expense',
    account: 'Cash USD',
  },
  {
    id: '11',
    title: 'Coffee Shop',
    amount: -5.5,
    category: 'Dining',
    categoryIcon: '☕',
    date: new Date('2024-12-02'),
    type: 'expense',
    account: 'Cash USD',
  },
  {
    id: '12',
    title: 'Coffee Shop',
    amount: -5.5,
    category: 'Dining',
    categoryIcon: '☕',
    date: new Date('2024-12-02'),
    type: 'expense',
    account: 'Cash USD',
  },
];
