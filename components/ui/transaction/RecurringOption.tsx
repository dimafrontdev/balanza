import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { RecurringFrequency } from '@/components/sheets/RecurringSheet';

interface RecurringOptionProps {
  onPress: () => void;
  selectedFrequency?: RecurringFrequency;
  onRemove?: () => void;
}

const frequencyLabels: Record<RecurringFrequency, string> = {
  daily: 'transaction.recurringDaily',
  weekly: 'transaction.recurringWeekly',
  monthly: 'transaction.recurringMonthly',
  yearly: 'transaction.recurringYearly',
};

export default function RecurringOption({
  onPress,
  selectedFrequency,
  onRemove,
}: RecurringOptionProps) {
  const { t } = useTranslation();
  const isSelected = !!selectedFrequency;

  return (
    <View style={[styles.container, isSelected && styles.containerSelected]}>
      <TouchableOpacity style={styles.mainContent} onPress={onPress}>
        <View style={[styles.iconContainer]}>
          <Ionicons name="repeat" size={20} color={isSelected ? '#615FFF' : '#6B7280'} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{t('transaction.recurring')}</Text>
          {isSelected && (
            <Text style={styles.selectedValue}>{t(frequencyLabels[selectedFrequency])}</Text>
          )}
        </View>

        {isSelected ? (
          <TouchableOpacity onPress={onRemove}>
            <Text style={styles.removeButtonText}>{t('transaction.remove')}</Text>
          </TouchableOpacity>
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
  },
  containerSelected: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#101828',
    fontFamily: 'Bitter-Regular',
    marginBottom: 2,
  },
  selectedValue: {
    fontSize: 12,
    color: '#615FFF',
    fontFamily: 'Bitter-Regular',
  },
  removeButtonText: {
    fontFamily: 'Bitter-Regular',
    fontSize: 12,
    color: '#615FFF',
  },
});
