import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ReactNode } from 'react';

interface SettingsItemProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
  iconBackground?: string;
  danger?: boolean;
}

export default function SettingsItem({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  iconBackground = '#EEF0FF',
  danger = false,
}: SettingsItemProps) {
  return (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View
        style={[styles.iconContainer, { backgroundColor: danger ? '#FFEBEE' : iconBackground }]}>
        <View>{icon}</View>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.itemTitle, danger && { color: '#EF4444' }]}>{title}</Text>
        {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
      </View>
      {showChevron && <Text style={[styles.chevron, danger && { color: '#EF4444' }]}>›</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    height: 64,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  chevron: {
    fontSize: 24,
    color: '#D1D5DB',
    marginLeft: 8,
  },
});
