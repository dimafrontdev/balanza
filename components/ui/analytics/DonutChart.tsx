import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { PieChart } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';
import { getChartColor } from '@/utils/chartColors';
import { formatAmount } from '@/utils';
import useSettingsStore from '@/store/settingsStore';

interface DonutChartData {
  category: string;
  value: number;
  icon: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  onSegmentPress?: (index: number) => void;
}

export default function DonutChart({ data, onSegmentPress }: DonutChartProps) {
  const { t, i18n } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { currency } = useSettingsStore();

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const today = new Date();
  const currentMonthYear = today.toLocaleDateString(i18n.language, {
    month: 'long',
    year: 'numeric',
  });

  const pieData = data.map((item, index) => ({
    value: item.value,
    color: getChartColor(index),
    text: `${((item.value / total) * 100).toFixed(1)}%`,
    onPress: () => handleSegmentPress(index),
    focused: selectedIndex === index,
  }));

  const handleSegmentPress = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
    onSegmentPress?.(index);
  };

  const selectedSegment = selectedIndex !== null ? data[selectedIndex] : null;
  const selectedPercentage = selectedSegment
    ? ((selectedSegment.value / total) * 100).toFixed(1)
    : '0';

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{currentMonthYear}</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          donut
          radius={90}
          innerRadius={60}
          innerCircleColor="#FFFFFF"
          strokeWidth={4}
          strokeColor="#FFFFFF"
          centerLabelComponent={() => (
            <View style={styles.centerContent}>
              {selectedSegment ? (
                <MotiView
                  key={`selected-${selectedIndex}`}
                  from={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  style={styles.selectedInfo}>
                  <Text style={styles.selectedIcon}>{selectedSegment.icon}</Text>
                  <Text style={styles.selectedCategory}>{selectedSegment.category}</Text>
                  <Text style={styles.selectedPercentage}>{selectedPercentage}%</Text>
                </MotiView>
              ) : (
                <MotiView
                  key="total"
                  from={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  style={styles.totalInfo}>
                  <Text style={styles.totalLabel}>{t('analytics.total')}</Text>
                  <Text style={styles.totalValue}>{formatAmount(total, currency)}</Text>
                </MotiView>
              )}
            </View>
          )}
          focusOnPress
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  date: {
    color: '#4A5565',
    marginBottom: 20,
    fontSize: 13,
    fontFamily: 'Bitter-Regular',
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedInfo: {
    alignItems: 'center',
  },
  selectedIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  selectedCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  selectedPercentage: {
    fontSize: 20,

    color: '#101828',
    fontFamily: 'Bitter-Regular',
  },
  totalInfo: {
    alignItems: 'center',
  },
  totalLabel: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 2,
    fontFamily: 'Bitter-Regular',
  },
  totalValue: {
    fontSize: 24,
    color: '#101828',
    fontFamily: 'Bitter-Regular',
    textAlign: 'center',
  },
});
