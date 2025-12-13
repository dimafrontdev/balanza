import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface MonthlyBudgetWidgetProps {
  budgetAmount: number;
  spentAmount: number;
  formatAmount: (amount: number) => string;
}

export default function MonthlyBudgetWidget({
  budgetAmount,
  spentAmount,
  formatAmount,
}: MonthlyBudgetWidgetProps) {
  const { t } = useTranslation();
  const percentageSpent = Math.min((spentAmount / budgetAmount) * 100, 100);
  const isOverBudget = spentAmount > budgetAmount;
  const leftAmount = budgetAmount - spentAmount;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('balance.monthlyBudget')}</Text>

      <Text style={[styles.spentAmount, isOverBudget ? styles.amountOver : styles.amountNormal]}>
        {formatAmount(isOverBudget ? leftAmount * -1 : leftAmount)}
        <Text style={styles.spentText}>{isOverBudget ? t('balance.over') : t('balance.left')}</Text>
      </Text>

      <Text style={styles.remaining}>
        {`${formatAmount(spentAmount)} / ${formatAmount(budgetAmount)}`}
      </Text>

      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${percentageSpent}%` },
            isOverBudget ? styles.progressOverBudget : styles.progressNormal,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  spentAmount: {
    fontSize: 26,
    lineHeight: 39,
    fontFamily: 'Bitter-Regular',
    marginBottom: 4,
  },
  amountNormal: {
    color: '#00C950',
  },
  amountOver: {
    color: '#FB2C36',
  },
  spentText: {
    fontFamily: 'Bitter-Light',
    fontSize: 16,
  },
  remaining: {
    color: '#99A1AF',
    fontSize: 12,
    marginBottom: 14,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressNormal: {
    backgroundColor: '#00C950',
  },
  progressOverBudget: {
    backgroundColor: '#EF4444',
  },
});
