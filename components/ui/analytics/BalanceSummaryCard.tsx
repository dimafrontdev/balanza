import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

interface BalanceSummaryCardProps {
  leftLabel: string;
  leftAmount: string;
  rightLabel: string;
  rightAmount: string;
  animationDelay?: number;
  isPositive?: boolean;
}

export default function BalanceSummaryCard({
  leftLabel,
  leftAmount,
  rightLabel,
  rightAmount,
  animationDelay = 0,
  isPositive,
}: BalanceSummaryCardProps) {
  const isSingleColumn = !rightLabel && !rightAmount;

  const getAmountColor = () => {
    if (isPositive === undefined) return styles.netAmount;
    return isPositive ? styles.owedAmount : styles.oweAmount;
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400, delay: animationDelay }}
      style={styles.container}>
      {isSingleColumn ? (
        <View style={styles.singleBalanceItem}>
          <Text style={styles.balanceLabel}>{leftLabel}</Text>
          <Text style={[styles.balanceAmount, getAmountColor()]}>{leftAmount}</Text>
        </View>
      ) : (
        <>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>{leftLabel}</Text>
            <Text style={[styles.balanceAmount, styles.owedAmount]}>{leftAmount}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>{rightLabel}</Text>
            <Text style={[styles.balanceAmount, styles.oweAmount]}>{rightAmount}</Text>
          </View>
        </>
      )}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  singleBalanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 20,
    fontFamily: 'Bitter-Regular',
  },
  oweAmount: {
    color: '#EF4444',
  },
  owedAmount: {
    color: '#10B981',
  },
  netAmount: {
    color: '#101828',
  },
  separator: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
});
