import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Friend, Group } from '@/mocks/groups';

interface ListItemProps {
  item: Friend | Group;
  formatAmount: (amount: number) => string;
  onPress?: () => void;
}

function isFriend(item: Friend | Group): item is Friend {
  return 'status' in item;
}

export default function ListItem({ item, formatAmount, onPress }: ListItemProps) {
  const { t } = useTranslation();
  const formattedBalance = formatAmount(Math.abs(item.balance));
  
  const isSettledUp = item.balance === 0;
  const hasNoExpenses = isFriend(item) && item.balance === 0 && item.status === 'pending';
  const isPending = isFriend(item) && item.status === 'pending';

  const subtitle = isFriend(item) 
    ? (isPending ? t('groups.balance.pending') : undefined)
    : (item.membersCount === 1 
        ? t('groups.balance.members_one', { count: item.membersCount }) 
        : t('groups.balance.members_other', { count: item.membersCount }));

  const getIconDisplay = () => {
    if (isFriend(item)) {
      if (item.avatar) {
        return <Text style={styles.icon}>{item.avatar}</Text>;
      }
      const firstLetter = item.name.charAt(0).toUpperCase();
      return <Text style={styles.avatarLetter}>{firstLetter}</Text>;
    }
    return <Text style={styles.icon}>{item.icon}</Text>;
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.iconContainer}>
        {getIconDisplay()}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, isPending && styles.pending]}>
            {subtitle}
          </Text>
        )}
      </View>
      {hasNoExpenses ? (
        <Text style={styles.noExpenses}>{t('groups.balance.noExpenses')}</Text>
      ) : isSettledUp ? (
        <Text style={styles.settledUp}>{t('groups.balance.settledUp')}</Text>
      ) : (
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>
            {item.balance > 0 ? t('groups.balance.youOwe') : t('groups.balance.youreOwed')}
          </Text>
          <Text
            style={[styles.balance, item.balance > 0 ? styles.balanceOwe : styles.balanceOwed]}>
            {formattedBalance}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
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
  avatarLetter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 12,
    color: '#6A7282',
  },
  pending: {
    color: '#F59E0B',
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontSize: 11,
    color: '#6A7282',
    marginBottom: 2,
  },
  balance: {
    fontSize: 14,
    fontWeight: '600',
  },
  balanceOwe: {
    color: '#FF6B6B',
  },
  balanceOwed: {
    color: '#51CF66',
  },
  noExpenses: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  settledUp: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});
