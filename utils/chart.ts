import moment from 'moment';

export interface ChartDataPoint {
  value: number;
  label: string;
}

export const generateLast6MonthsData = (values: number[]): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  
  for (let i = 5; i >= 0; i--) {
    data.push({
      value: values[5 - i] || 0,
      label: moment().subtract(i, 'months').format('MMM'),
    });
  }

  return data;
};
