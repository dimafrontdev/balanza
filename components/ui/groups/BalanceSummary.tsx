import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface BalanceSummaryProps {
  totalOwe: number;
  totalOwed: number;
  formatAmount: (amount: number) => string;
}

export default function BalanceSummary({ totalOwe, totalOwed, formatAmount }: BalanceSummaryProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.summaryItem}>
        <Text style={styles.label}>{t('groups.balance.youOwe')}</Text>
        <Text style={styles.oweAmount}>{formatAmount(totalOwe)}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.summaryItem}>
        <Text style={styles.label}>{t('groups.balance.youreOwed')}</Text>
        <Text style={styles.owedAmount}>{formatAmount(totalOwed)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#6A7282',
    marginBottom: 8,
    textTransform: 'lowercase',
  },
  oweAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  owedAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: '#51CF66',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
});
