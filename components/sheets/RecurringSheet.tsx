import { forwardRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';

export type RecurringFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurringOption {
  value: RecurringFrequency;
  label: string;
}

interface RecurringSheetProps {
  onSelect: (frequency: RecurringFrequency) => void;
  selectedFrequency?: RecurringFrequency;
}

const recurringOptions: RecurringOption[] = [
  { value: 'daily', label: 'transaction.recurringDaily' },
  { value: 'weekly', label: 'transaction.recurringWeekly' },
  { value: 'monthly', label: 'transaction.recurringMonthly' },
  { value: 'yearly', label: 'transaction.recurringYearly' },
];

const RecurringSheet = forwardRef<BottomSheetModal, RecurringSheetProps>(
  ({ onSelect, selectedFrequency }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['50%']);

    const handleSelect = (frequency: RecurringFrequency) => {
      onSelect(frequency);
      (ref as any)?.current?.dismiss();
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref as any}
        snapPoints={['50%']}
        stackBehavior="push"
        renderBackdrop={renderBackdrop}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>{t('transaction.recurring')}</Text>
          <ScrollView style={styles.optionList} showsVerticalScrollIndicator={false}>
            {recurringOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionItem,
                  selectedFrequency === option.value && styles.optionItemSelected,
                ]}
                onPress={() => handleSelect(option.value)}>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionLabel}>{t(option.label)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </BottomSheetView>
      </BottomSheetWrapper>
    );
  },
);

RecurringSheet.displayName = 'RecurringSheet';
export default RecurringSheet;

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  optionList: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
  },
  optionItemSelected: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
  },
  optionIcon: {
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 14,
    color: '#101828',
    fontFamily: 'Bitter-Regular',
  },
});
