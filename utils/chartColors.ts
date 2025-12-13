export const CHART_COLORS = [
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#6366F1', // Indigo
  '#22C55E', // Green
  '#D946EF', // Fuchsia
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#A855F7', // Purple
  '#0EA5E9', // Sky
  '#F43F5E', // Rose
  '#60A5FA', // Blue 400
  '#34D399', // Emerald 400
  '#FB923C', // Orange 400
  '#A78BFA', // Violet 400
  '#F472B6', // Pink 400
  '#2DD4BF', // Teal 400
  '#FCD34D', // Amber 300
  '#818CF8', // Indigo 400
  '#4ADE80', // Green 400
  '#E879F9', // Fuchsia 400
  '#22D3EE', // Cyan 400
  '#BEF264', // Lime 300
  '#C084FC', // Purple 400
  '#38BDF8', // Sky 400
  '#EAB308', // Yellow
];

export function getChartColor(index: number): string {
  return CHART_COLORS[index % CHART_COLORS.length];
}

export function getChartColors(count: number): string[] {
  return Array.from({ length: count }, (_, index) => getChartColor(index));
}

export function getProgressColor(percentage: number): string {
  if (percentage < 10) return '#10B981'; // Green
  if (percentage < 20) return '#84CC16'; // Lime
  if (percentage < 30) return '#F59E0B'; // Amber
  if (percentage < 40) return '#F97316'; // Orange
  return '#EF4444'; // Red
}
