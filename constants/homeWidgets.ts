import { HomeWidgetConfig } from '@/store/settingsStore';

export const DEFAULT_HOME_WIDGETS: HomeWidgetConfig[] = [
  { id: 'totalBalance', title: 'balance.widgets.totalBalance', visible: true, order: 0 },
  { id: 'monthlyBudget', title: 'balance.widgets.monthlyBudget', visible: true, order: 1 },
  { id: 'financialGoals', title: 'balance.widgets.financialGoals', visible: true, order: 2 },
  { id: 'sharedExpenses', title: 'balance.widgets.sharedExpenses', visible: true, order: 3 },
  {
    id: 'recentTransactions',
    title: 'balance.widgets.recentTransactions',
    visible: true,
    order: 4,
  },
];
