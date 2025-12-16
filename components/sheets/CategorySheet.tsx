import { forwardRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';

const defaultCategories = [
  {
    id: '1',
    nameKey: 'settings.categories.income.salary',
    type: 'Income',
    icon: '💰',
    color: '#10B981',
  },
  {
    id: '2',
    nameKey: 'settings.categories.income.freelance',
    type: 'Income',
    icon: '💻',
    color: '#10B981',
  },
  {
    id: '3',
    nameKey: 'settings.categories.income.sale',
    type: 'Income',
    icon: '💵',
    color: '#10B981',
  },
  {
    id: '4',
    nameKey: 'settings.categories.income.gifts',
    type: 'Income',
    icon: '🎁',
    color: '#10B981',
  },
  {
    id: '5',
    nameKey: 'settings.categories.income.rent',
    type: 'Income',
    icon: '🏠',
    color: '#10B981',
  },
  {
    id: '6',
    nameKey: 'settings.categories.income.otherIncome',
    type: 'Income',
    icon: '💸',
    color: '#10B981',
  },
  {
    id: '7',
    nameKey: 'settings.categories.expense.groceries',
    type: 'Expense',
    icon: '🛒',
    color: '#EF4444',
  },
  {
    id: '8',
    nameKey: 'settings.categories.expense.dining',
    type: 'Expense',
    icon: '🍽️',
    color: '#EF4444',
  },
  {
    id: '9',
    nameKey: 'settings.categories.expense.clothes',
    type: 'Expense',
    icon: '👕',
    color: '#EF4444',
  },
  {
    id: '10',
    nameKey: 'settings.categories.expense.rent',
    type: 'Expense',
    icon: '🏠',
    color: '#EF4444',
  },
  {
    id: '11',
    nameKey: 'settings.categories.expense.education',
    type: 'Expense',
    icon: '📚',
    color: '#EF4444',
  },
  {
    id: '12',
    nameKey: 'settings.categories.expense.gifts',
    type: 'Expense',
    icon: '🎁',
    color: '#EF4444',
  },
  {
    id: '14',
    nameKey: 'settings.categories.expense.health',
    type: 'Expense',
    icon: '🏥',
    color: '#EF4444',
  },
  {
    id: '15',
    nameKey: 'settings.categories.expense.entertainment',
    type: 'Expense',
    icon: '🎬',
    color: '#EF4444',
  },
  {
    id: '17',
    nameKey: 'settings.categories.expense.subscriptions',
    type: 'Expense',
    icon: '📱',
    color: '#EF4444',
  },
  {
    id: '13',
    nameKey: 'settings.categories.expense.gasFuel',
    type: 'Expense',
    icon: '⛽',
    color: '#EF4444',
  },
  {
    id: '16',
    nameKey: 'settings.categories.expense.transport',
    type: 'Expense',
    icon: '🚗',
    color: '#EF4444',
  },
];

interface Category {
  id: string;
  nameKey: string;
  type: string;
  icon: string;
  color: string;
}

interface CategorySheetProps {
  onSelect?: (category: string, icon: string) => void;
  selectedCategoryName?: string;
}

const CategorySheet = forwardRef<BottomSheetModal, CategorySheetProps>(
  ({ onSelect, selectedCategoryName }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['80%']);
    const [categories] = useState<Category[]>(defaultCategories);
    const [selectedType, setSelectedType] = useState<'Income' | 'Expense'>('Expense');

    const filteredCategories = categories.filter(cat => cat.type === selectedType);

    const handleCategorySelect = (category: Category) => {
      onSelect?.(t(category.nameKey), category.icon);
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['80%']}
        renderBackdrop={renderBackdrop}
        stackBehavior="push">
        <BottomSheetView style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>{t('settings.sheets.categories')}</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, selectedType === 'Expense' && styles.toggleButtonActive]}
              onPress={() => setSelectedType('Expense')}>
              <Text
                style={[styles.toggleText, selectedType === 'Expense' && styles.toggleTextActive]}>
                {t('settings.sheets.expense')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, selectedType === 'Income' && styles.toggleButtonActive]}
              onPress={() => setSelectedType('Income')}>
              <Text
                style={[styles.toggleText, selectedType === 'Income' && styles.toggleTextActive]}>
                {t('settings.sheets.income')}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.categoryList} showsVerticalScrollIndicator={false}>
            {filteredCategories.map(category => {
              const isSelected = t(category.nameKey) === selectedCategoryName;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
                  onPress={() => handleCategorySelect(category)}>
                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                  <Text style={styles.categoryName}>{t(category.nameKey)}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </BottomSheetView>
      </BottomSheetWrapper>
    );
  },
);

CategorySheet.displayName = 'CategorySheet';

export default CategorySheet;

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 24,
    paddingTop: 8,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    gap: 4,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#111827',
    fontWeight: '600',
  },
  categoryList: {
    maxHeight: 550,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    gap: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryItemSelected: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
});
