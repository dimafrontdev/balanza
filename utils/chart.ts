import moment from 'moment';

export interface ChartDataPoint {
  value: number;
  label: string;
}

export interface HistoryDataPoint {
  date: string;
  balance: number;
}

export const generateLast6MonthsData = (historyData: HistoryDataPoint[]): ChartDataPoint[] => {
  const monthsMap = new Map<string, number>();
  
  historyData.forEach(item => {
    const monthKey = moment(item.date).format('MMM');
    monthsMap.set(monthKey, item.balance);
  });

  const data: ChartDataPoint[] = [];
  
  for (let i = 5; i >= 0; i--) {
    const monthMoment = moment().subtract(i, 'months');
    const monthKey = monthMoment.format('MMM');
    
    data.push({
      value: monthsMap.get(monthKey) || 0,
      label: monthKey,
    });
  }

  return data;
};
