import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Accordion from '@/components/ui/common/Accordion';
import FinancialGoalItem from '@/components/ui/balance/FinancialGoalItem';
import { FinancialGoal } from '@/mocks';

interface FinancialGoalsWidgetProps {
  goals: FinancialGoal[];
  formatAmount: (amount: number) => string;
}

export default function FinancialGoalsWidget({
  goals,
  formatAmount,
}: FinancialGoalsWidgetProps) {
  const { t } = useTranslation();

  return (
    <Accordion
      header={
        <View style={styles.accordionHeader}>
          <Text style={styles.accordionTitle}>{t('balance.widgets.financialGoals')}</Text>
          <Text style={styles.accordionTitle}>
            {t('balance.goals', { count: goals.length })}
          </Text>
        </View>
      }
      defaultExpanded={false}
      disabled={goals.length === 1}
      collapsedChildren={
        goals.length > 0 ? (
          <FinancialGoalItem goal={goals[0]} formatAmount={formatAmount} isLast />
        ) : undefined
      }>
      <View style={styles.goalsList}>
        {goals.map((goal, index) => (
          <FinancialGoalItem 
            key={goal.id} 
            goal={goal} 
            formatAmount={formatAmount}
            isLast={index === goals.length - 1}
          />
        ))}
      </View>
    </Accordion>
  );
}

const styles = StyleSheet.create({
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 13,
    fontFamily: 'Bitter-Regular',
    color: '#6B7280',
  },
  goalsList: {
    gap: 10,
    paddingBottom: 6,
  },
});
