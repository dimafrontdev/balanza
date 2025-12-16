import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';
import { IconPositiveChange, IconNegativeChange } from '@/assets/icons';
import { generateLast6MonthsData } from '@/utils/chart';

interface TotalBalanceWidgetProps {
  totalBalance: number;
  changeAmount: number;
  formatAmount: (amount: number) => string;
  chartData?: number[];
  onPress?: () => void;
}

export default function TotalBalanceWidget({
  totalBalance,
  changeAmount,
  formatAmount,
  chartData: chartDataValues,
  onPress,
}: TotalBalanceWidgetProps) {
  const { t } = useTranslation();
  const chartData = generateLast6MonthsData(chartDataValues || []);
  const isPositiveChange = changeAmount >= 0;

  const content = (
    <>
      <View style={styles.header}>
        <Text style={styles.label}>{t('accounts.totalBalance')}</Text>
        <View
          style={[
            styles.changeContainer,
            isPositiveChange ? styles.changePositive : styles.changeNegative,
          ]}>
          {isPositiveChange ? <IconPositiveChange /> : <IconNegativeChange />}
          <Text
            style={[
              styles.changeAmount,
              isPositiveChange ? styles.changeAmountPositive : styles.changeAmountNegative,
            ]}>
            {formatAmount(changeAmount)}
          </Text>
        </View>
      </View>

      <Text style={styles.balance}>{formatAmount(totalBalance)}</Text>

      <View style={styles.chartContainer}>
        <LineChart
          isAnimated
          animateOnDataChange
          data={chartData}
          height={64}
          curved
          hideDataPoints
          color="rgba(255, 255, 255, 0.8)"
          thickness={2}
          hideRules
          hideYAxisText
          xAxisColor="transparent"
          yAxisColor="transparent"
          xAxisLabelTextStyle={styles.labelText}
          spacing={60}
          initialSpacing={20}
          endSpacing={20}
          yAxisOffset={1}
        />
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#6366F1',
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: 'white',
    opacity: 0.8,
    fontSize: 13,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  changePositive: {
    backgroundColor: 'rgba(123, 241, 168, 0.2)',
  },
  changeNegative: {
    backgroundColor: 'rgba(255, 100, 103, 0.2)',
  },
  changeAmount: {
    fontSize: 10,
  },
  changeAmountPositive: {
    color: '#7BF1A8',
  },
  changeAmountNegative: {
    color: '#FFA2A2',
  },
  balance: {
    fontFamily: 'Bitter-Regular',
    color: 'white',
    fontSize: 32,
    letterSpacing: 0.5,
  },
  chartContainer: {
    marginLeft: -20,
  },
  labelText: {
    fontFamily: 'Bitter-Regular',
    color: 'white',
    opacity: 0.5,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
  },
});
