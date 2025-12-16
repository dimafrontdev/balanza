import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { ScannedItem } from './types';

interface ItemsListProps {
  items: ScannedItem[];
  onPress: () => void;
  currency?: { code: string; symbol: string };
}

export default function ItemsList({
  items,
  onPress,
  currency = { code: 'USD', symbol: '$' },
}: ItemsListProps) {
  const { t } = useTranslation();

  const validItems = items.filter(item => item.name?.trim() && item.amount?.trim());

  if (!validItems || validItems.length === 0) {
    return null;
  }

  const totalAmount = validItems.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('transaction.items')}</Text>
        <Text style={styles.headerCount}>
          {t('transaction.itemsCount', { count: validItems.length })}
        </Text>
      </View>

      <View style={styles.itemsContainer}>
        {validItems.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemAmount}>
              {currency.symbol}
              {item.amount}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{t('transaction.total')}</Text>
          <Text style={styles.totalAmount}>
            {currency.symbol}
            {totalAmount.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={onPress}>
          <Ionicons name="pencil" size={16} color="#615FFF" />
          <Text style={styles.editButtonText}>{t('transaction.editItems')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Bitter-Regular',
  },
  headerCount: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
  },
  itemsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Bitter-Regular',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Bitter-Regular',
  },
  totalAmount: {
    fontSize: 18,

    color: '#615FFF',
    fontFamily: 'Bitter-Regular',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 6,
  },
  editButtonText: {
    fontSize: 14,
    color: '#615FFF',
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
  },
});
