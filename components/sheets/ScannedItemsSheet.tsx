import { forwardRef, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import StyledButton from '@/components/ui/common/StyledButton';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { ScannedItem } from '@/components/ui/transaction/types';
import { IconArrowBack } from '@/assets/icons';
import { validateAmountInput } from '@/utils/validation';

interface ScannedItemsSheetProps {
  items: ScannedItem[];
  isLoading: boolean;
  onConfirm: (items: ScannedItem[]) => void;
  onItemChange: (index: number, field: keyof ScannedItem, value: string) => void;
  currency?: { code: string; symbol: string };
}

const ScannedItemsSheet = forwardRef<BottomSheetModal, ScannedItemsSheetProps>(
  ({ items, isLoading, onConfirm, onItemChange, currency = { code: 'USD', symbol: '$' } }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['80%']);
    const [localItems, setLocalItems] = useState<ScannedItem[]>(items);

    useEffect(() => {
      setLocalItems(items);
    }, [items]);

    const handleAddItem = () => {
      const newItem: ScannedItem = { name: '', amount: '' };
      const updatedItems = [...localItems, newItem];
      setLocalItems(updatedItems);
      updatedItems.forEach((item, index) => {
        if (index === updatedItems.length - 1) {
          onItemChange(index, 'name', item.name);
        }
      });
    };

    const handleRemoveItem = (index: number) => {
      const updatedItems = localItems.filter((_, i) => i !== index);
      setLocalItems(updatedItems);
    };

    const handleItemChange = (index: number, field: keyof ScannedItem, value: string) => {
      const processedValue = field === 'amount' ? validateAmountInput(value) : value;

      const updatedItems = [...localItems];
      updatedItems[index] = { ...updatedItems[index], [field]: processedValue };
      setLocalItems(updatedItems);
      onItemChange(index, field, processedValue);
    };

    const handleConfirm = () => {
      onConfirm(localItems);
      (ref as any)?.current?.dismiss();
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref as any}
        snapPoints={['80%']}
        stackBehavior="push"
        renderBackdrop={renderBackdrop}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => (ref as any)?.current?.dismiss()}
              style={styles.backButton}>
              <IconArrowBack />
            </TouchableOpacity>
            <Text style={styles.title}>{t('transaction.scannedItems')}</Text>
            <View style={styles.placeholder} />
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingContent}>
                <Ionicons name="document-text-outline" size={64} color="#615FFF" />
                <ActivityIndicator size="large" color="#615FFF" style={styles.loader} />
                <Text style={styles.loadingText}>{t('transaction.readingReceipt')}</Text>
                <Text style={styles.loadingSubtext}>{t('transaction.aiAnalyzing')}</Text>
              </View>
            </View>
          ) : (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={100}>
              <ScrollView
                style={styles.itemsList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                {localItems.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Ionicons name="receipt-outline" size={64} color="#D1D5DB" />
                    <Text style={styles.emptyText}>No items yet</Text>
                    <Text style={styles.emptySubtext}>Add items manually or scan a receipt</Text>
                  </View>
                ) : (
                  localItems.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                      <View style={styles.itemRow}>
                        <View style={styles.itemIndexContainer}>
                          <Text style={styles.itemIndex}>{index + 1}</Text>
                        </View>

                        <View style={styles.itemContent}>
                          <TextInput
                            style={styles.inputName}
                            value={item.name}
                            onChangeText={value => handleItemChange(index, 'name', value)}
                            placeholder={t('transaction.itemNamePlaceholder')}
                            placeholderTextColor="#9CA3AF"
                          />
                          <View style={styles.amountRow}>
                            <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                            <TextInput
                              style={styles.inputAmount}
                              value={item.amount}
                              onChangeText={value => handleItemChange(index, 'amount', value)}
                              placeholder="0.00"
                              placeholderTextColor="#9CA3AF"
                              keyboardType="decimal-pad"
                            />
                          </View>
                        </View>

                        <TouchableOpacity
                          onPress={() => handleRemoveItem(index)}
                          style={styles.removeButton}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                          <Ionicons name="close-circle" size={24} color="#D1D5DB" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}

                <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
                  <Ionicons name="add-circle-outline" size={22} color="#615FFF" />
                  <Text style={styles.addButtonText}>{t('transaction.addItem')}</Text>
                </TouchableOpacity>
              </ScrollView>

              <View style={styles.footer}>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>{t('transaction.total')}</Text>
                  <Text style={styles.totalAmount}>
                    {currency.symbol}
                    {localItems
                      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
                      .toFixed(2)}
                  </Text>
                </View>
                <StyledButton
                  title={t('transaction.confirm')}
                  onPress={handleConfirm}
                  size="medium"
                />
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </BottomSheetWrapper>
    );
  },
);

ScannedItemsSheet.displayName = 'ScannedItemsSheet';
export default ScannedItemsSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    height: 48,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Bitter-Regular',
    textAlign: 'center',
    color: '#101828',
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  loadingContent: {
    alignItems: 'center',
  },
  loader: {
    marginTop: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
  },
  itemsList: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    marginTop: 8,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemIndexContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIndex: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#6B7280',
    fontWeight: '600',
  },
  itemContent: {
    flex: 1,
    gap: 8,
  },
  inputName: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    padding: 0,
    margin: 0,
    fontWeight: '500',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
  },
  inputAmount: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    padding: 0,
    margin: 0,
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 15,
    color: '#615FFF',
    fontFamily: 'Bitter-Regular',
    marginLeft: 8,
    fontWeight: '600',
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Bitter-Regular',
    color: '#6B7280',
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 24,
    fontFamily: 'Bitter-Regular',
    color: '#111827',
  },
});
