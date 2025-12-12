import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { MotiView } from 'moti';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '@/store/settingsStore';
import { formatAmount } from '@/utils';
import BalanceSummaryCard from './BalanceSummaryCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DynamicChartData {
  date: string;
  income: number;
  expense: number;
}

interface DynamicChartProps {
  data: DynamicChartData[];
}

export default function DynamicChart({ data }: DynamicChartProps) {
  const { t, i18n } = useTranslation();
  const { currency } = useSettingsStore();
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);

  const barData = data.flatMap(item => {
    const date = new Date(item.date);
    const label = date.toLocaleDateString(i18n.language, { month: 'short' });
    return [
      {
        value: item.income,
        label: label,
        frontColor: '#10B981',
        spacing: 2,
        labelWidth: 50,
        labelTextStyle: { fontSize: 10, color: '#6B7280' },
      },
      {
        value: item.expense,
        frontColor: '#EF4444',
        spacing: 12,
      },
    ];
  });

  const netBalance = totalIncome - totalExpense;

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400, delay: 0 }}
        style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>{t('analytics.incomeVsExpenses')}</Text>
        </View>

        <View style={styles.chartWrapper}>
          <BarChart
            data={barData}
            width={SCREEN_WIDTH - 64}
            height={220}
            barWidth={16}
            spacing={2}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={1}
            yAxisThickness={1}
            yAxisTextStyle={{ color: '#6B7280', fontSize: 10 }}
            xAxisColor="#E5E7EB"
            yAxisColor="#E5E7EB"
            noOfSections={4}
            maxValue={Math.max(...data.map(item => Math.max(item.income, item.expense))) * 1.2}
            isAnimated
            animationDuration={800}
            showScrollIndicator={false}
          />
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
            <Text style={styles.legendText}>{t('analytics.income')}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>{t('analytics.expense')}</Text>
          </View>
        </View>
      </MotiView>

      <View style={styles.statsContainer}>
        <BalanceSummaryCard
          leftLabel={t('analytics.income')}
          leftAmount={`+${formatAmount(totalIncome, currency)}`}
          rightLabel={t('analytics.expense')}
          rightAmount={`-${formatAmount(totalExpense, currency)}`}
          animationDelay={100}
        />

        <BalanceSummaryCard
          leftLabel={t('analytics.netBalance')}
          leftAmount={`${netBalance >= 0 ? '+' : ''}${formatAmount(netBalance, currency)}`}
          rightLabel=""
          rightAmount=""
          animationDelay={200}
          isPositive={netBalance >= 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  chartContainer: {
    paddingBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  chartWrapper: {
    paddingLeft: 16,
  },
  chartTitle: {
    fontSize: 13,
    color: '#4A5565',
    fontFamily: 'Bitter-Regular',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsContainer: {
    paddingBottom: 24,
  },
});
