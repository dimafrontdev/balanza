import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

interface CategoryAnalyticsItemProps {
  icon: string;
  category: string;
  amount: string;
  percentage: number;
  color: string;
  isLast?: boolean;
  animationDelay?: number;
}

export default function CategoryAnalyticsItem({
  icon,
  category,
  amount,
  percentage,
  color,
  isLast = false,
  animationDelay = 0,
}: CategoryAnalyticsItemProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400, delay: animationDelay }}
      style={[styles.container, isLast && styles.lastItem]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <MotiView
              from={{ width: '0%' }}
              animate={{ width: `${percentage}%` }}
              transition={{ type: 'timing', duration: 800, delay: animationDelay + 200 }}
              style={[styles.progressFill, { backgroundColor: color }]}
            />
          </View>
          <Text style={styles.percentage}>{percentage.toFixed(0)}%</Text>
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastItem: {
    borderBottomWidth: 0,
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
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
    fontWeight: '500',
  },
  amount: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    minWidth: 35,
    textAlign: 'right',
  },
});
