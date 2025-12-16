import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '@/store/settingsStore';
import { formatAmount } from '@/utils/currency';
import CategoryAnalyticsItem from '@/components/ui/analytics/CategoryAnalyticsItem';
import DonutChart from '@/components/ui/analytics/DonutChart';
import DynamicChart from '@/components/ui/analytics/DynamicChart';
import { MOCK_CATEGORY_ANALYTICS, MOCK_DYNAMIC_ANALYTICS } from '@/mocks';
import { getChartColor, getProgressColor } from '@/utils/chartColors';

type TabType = 'categories' | 'dynamic';

export default function AnalyticsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { currency } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<TabType>('categories');

  const chartData = MOCK_CATEGORY_ANALYTICS.map(item => ({
    category: item.category,
    value: item.amount,
    icon: item.icon,
  }));

  const categoriesWithColors = MOCK_CATEGORY_ANALYTICS.map((item, index) => ({
    ...item,
    chartColor: getChartColor(index),
    progressColor: getProgressColor(item.percentage),
  }));

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'categories' && styles.tabActive]}
          onPress={() => setActiveTab('categories')}>
          <Text style={[styles.tabText, activeTab === 'categories' && styles.tabTextActive]}>
            {t('analytics.byCategories')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dynamic' && styles.tabActive]}
          onPress={() => setActiveTab('dynamic')}>
          <Text style={[styles.tabText, activeTab === 'dynamic' && styles.tabTextActive]}>
            {t('analytics.dynamic')}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'categories' ? (
        <View style={styles.content}>
          <DonutChart data={chartData} />

          <View style={styles.categoryList}>
            <Text style={styles.sectionTitle}>{t('analytics.expenseByCategories')}</Text>
            <View style={styles.listContainer}>
              {categoriesWithColors.map((item, index) => (
                <CategoryAnalyticsItem
                  key={item.id}
                  icon={item.icon}
                  category={item.category}
                  amount={formatAmount(item.amount, currency)}
                  percentage={item.percentage}
                  color={item.chartColor}
                  isLast={index === categoriesWithColors.length - 1}
                  animationDelay={index * 100}
                />
              ))}
            </View>
          </View>
        </View>
      ) : (
        <DynamicChart data={MOCK_DYNAMIC_ANALYTICS} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    gap: 4,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#111827',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  sectionTitle: {
    color: '#4A5565',
    marginBottom: 8,
    fontSize: 13,
    fontFamily: 'Bitter-Regular',
  },
  listContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
