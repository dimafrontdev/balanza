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
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: -87.50,
    category: 'Groceries',
    categoryIcon: '🛒',
    date: new Date('2024-12-06'),
    type: 'expense',
    account: 'Chase Checking',
  },
  {
    id: '2',
    title: 'Barcelona Trip Dinner',
    amount: -125.00,
    category: 'Dining',
    categoryIcon: '🍽️',
    date: new Date('2024-12-06'),
    type: 'expense',
    isGrouped: true,
    account: 'Cash USD',
  },
  {
    id: '3',
    title: 'Monthly Salary',
    amount: 4500.00,
    category: 'Salary',
    categoryIcon: '💰',
    date: new Date('2024-12-05'),
    type: 'income',
    account: 'Chase Checking',
  },
  {
    id: '4',
    title: 'Office Lunch',
    amount: -23.80,
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
    amount: -15.30,
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
  },
  {
    id: '7',
    title: 'Coffee Shop',
    amount: -5.50,
    category: 'Dining',
    categoryIcon: '☕',
    date: new Date('2024-12-02'),
    type: 'expense',
    account: 'Cash USD',
  },
];
