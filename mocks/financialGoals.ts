export interface FinancialGoal {
  id: string;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
}

export const MOCK_FINANCIAL_GOALS: FinancialGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    icon: '🏦',
    targetAmount: 10000,
    currentAmount: 6500,
    deadline: new Date('2025-06-30'),
  },
  {
    id: '2',
    name: 'Vacation to Japan',
    icon: '🗾',
    targetAmount: 5000,
    currentAmount: 2300,
    deadline: new Date('2025-08-15'),
  },
  {
    id: '3',
    name: 'New Laptop',
    icon: '💻',
    targetAmount: 2500,
    currentAmount: 1800,
    deadline: new Date('2025-03-01'),
  },
];
