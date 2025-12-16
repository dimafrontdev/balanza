import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Friend, Group } from '@/mocks';

interface SharedExpensesWidgetProps {
  totalOwe: number;
  totalOwed: number;
  formatAmount: (amount: number) => string;
  recentItems: (Friend | Group)[];
}

export default function SharedExpensesWidget({
  totalOwe,
  totalOwed,
  formatAmount,
  recentItems,
}: SharedExpensesWidgetProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleSeeAllGroups = () => {
    router.push('/groups');
  };

  const isGroup = (item: Friend | Group): item is Group => {
    return 'membersCount' in item;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('balance.widgets.sharedExpenses')}</Text>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>{t('groups.balance.youreOwed')}</Text>
          <Text style={[styles.balanceAmount, styles.owedAmount]}>
            {totalOwed > 0 ? '+' : ''}
            {formatAmount(totalOwed)}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>{t('groups.balance.youOwe')}</Text>
          <Text style={[styles.balanceAmount, styles.oweAmount]}>
            {totalOwe > 0 ? '-' : ''}
            {formatAmount(totalOwe)}
          </Text>
        </View>
      </View>

      {recentItems.length > 0 && (
        <View style={styles.recentItems}>
          {recentItems.map(item => (
            <View key={item.id} style={styles.recentItem}>
              <View style={styles.recentIcon}>
                <Text style={styles.recentIconText}>{item.icon}</Text>
              </View>
              <View style={styles.recentInfo}>
                <Text style={styles.recentName}>{item.name}</Text>
                {isGroup(item) && (
                  <Text style={styles.recentMembers}>
                    {t('groups.balance.members', { count: item.membersCount })}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.recentBalance,
                  item.balance > 0 ? styles.positiveBalance : styles.negativeBalance,
                ]}>
                {item.balance > 0 ? '+' : item.balance < 0 ? '-' : ''}
                {formatAmount(Math.abs(item.balance))}
              </Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllGroups}>
        <Text style={styles.seeAllText}>{t('balance.seeAllGroups')}</Text>
        <MaterialIcons name="arrow-forward" size={16} color="#6366F1" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
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
  balanceContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 18,
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
  },
  oweAmount: {
    color: '#EF4444',
  },
  owedAmount: {
    color: '#10B981',
  },
  separator: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  recentItems: {
    marginBottom: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentIconText: {
    fontSize: 18,
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
  },
  recentMembers: {
    fontSize: 12,
    color: '#6B7280',
  },
  recentBalance: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
  },
  positiveBalance: {
    color: '#10B981',
  },
  negativeBalance: {
    color: '#EF4444',
  },
  seeAllButton: {
    paddingVertical: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366F1',
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
  },
});
