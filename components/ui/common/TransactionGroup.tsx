import { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TransactionGroupProps {
  dateLabel: string;
  children: ReactNode;
}

export default function TransactionGroup({ dateLabel, children }: TransactionGroupProps) {
  return (
    <View style={styles.dayGroup}>
      <Text style={styles.dayLabel}>{dateLabel}</Text>
      <View style={styles.transactionsContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayGroup: {
    marginBottom: 16,
  },
  dayLabel: {
    fontSize: 12,
    color: '#6A7282',
    fontFamily: 'Bitter-Regular',
    marginBottom: 8,
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
