import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Account } from '@/types/account';
import { Currency } from '@/store/settingsStore';

interface AccountItemProps {
  account: Account;
  formatAmount: (amount: number, currency?: Currency) => string;
  onPress?: () => void;
}

export default function AccountItem({ account, formatAmount, onPress }: AccountItemProps) {
  const total = formatAmount(account.balance, account.currency);
  const isNegative = total.startsWith('-');

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.iconContainer]}>
        <Text style={styles.icon}>{account.icon}</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.name}>{account.name}</Text>
        <Text style={styles.code}>{account.currency.code}</Text>
      </View>
      <Text style={[styles.balance, isNegative && styles.balanceNegative]}>{total}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  code: {
    fontSize: 12,
    color: '#6A7282',
  },
  balance: {
    fontSize: 14,
    color: '#101828',
  },
  balanceNegative: {
    color: '#FF6467',
  },
});
