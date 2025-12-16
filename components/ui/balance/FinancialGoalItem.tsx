import { View, Text, StyleSheet } from 'react-native';
import { FinancialGoal } from '@/mocks';

interface FinancialGoalItemProps {
  goal: FinancialGoal;
  formatAmount: (amount: number) => string;
  isLast?: boolean;
}

export default function FinancialGoalItem({ goal, formatAmount, isLast = false }: FinancialGoalItemProps) {
  const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

  return (
    <View style={[styles.container, isLast && styles.containerLast]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{goal.icon}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{goal.name}</Text>
          <Text style={styles.amounts}>
            {formatAmount(goal.currentAmount)} / {formatAmount(goal.targetAmount)}
          </Text>
        </View>
        <Text style={styles.percentage}>{progress.toFixed(0)}%</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  containerLast: {
    borderBottomWidth: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
    marginBottom: 2,
  },
  amounts: {
    fontSize: 12,
    color: '#6B7280',
  },
  percentage: {
    fontSize: 12,
    color: '#6A7282',
    fontFamily: 'Bitter-Regular',
  },
  progressBarContainer: {
    marginLeft: 52,
  },
  progressBarBackground: {
    height: 5,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#00C950',
  },
});
