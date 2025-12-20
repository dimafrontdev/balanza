import { forwardRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import StyledButton from '@/components/ui/common/StyledButton';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import useSettingsStore, { Currency } from '@/store/settingsStore';
import { currencies } from '@/components/sheets/AddAccountSheet/constants';

interface CurrencySheetProps {
  onSelectCurrency?: (currency: Currency) => void;
  showSaveButton?: boolean;
  value?: Currency | null;
}

const CurrencySheet = forwardRef<BottomSheetModal, CurrencySheetProps>(
  ({ onSelectCurrency, showSaveButton = true, value = null }, ref) => {
    const { t } = useTranslation();
    const { currency, setCurrency } = useSettingsStore();
    const { renderBackdrop } = useBottomSheet(['70%']);
    const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

    const handleSelect = (curr: Currency) => {
      setSelectedCurrency(curr);
      if (!showSaveButton && onSelectCurrency) {
        onSelectCurrency(curr);
        (ref as any)?.current?.dismiss();
      }
    };

    const handleSave = () => {
      if (selectedCurrency) {
        if (onSelectCurrency) {
          onSelectCurrency(selectedCurrency);
        } else {
          setCurrency(selectedCurrency);
        }
      }
      (ref as any)?.current?.dismiss();
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref as any}
        snapPoints={['70%']}
        stackBehavior="push"
        onDismiss={() => setSelectedCurrency(null)}
        renderBackdrop={renderBackdrop}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>{t('settings.sheets.selectCurrency')}</Text>
          <ScrollView style={styles.currencyList} showsVerticalScrollIndicator={false}>
            {currencies.map(curr => (
              <TouchableOpacity
                key={curr.code}
                style={[
                  styles.currencyItem,
                  (value?.code ?? selectedCurrency?.code ?? currency.code) === curr.code &&
                    styles.currencyItemSelected,
                ]}
                onPress={() => handleSelect(curr)}>
                <Text style={styles.currencyFlag}>{curr.flag}</Text>
                <View style={styles.currencyTextContainer}>
                  <Text style={styles.currencyCode}>{curr.code}</Text>
                  <Text style={styles.currencyName}>{curr.name}</Text>
                </View>
                <Text style={styles.currencySymbol}>{curr.symbol}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {showSaveButton && (
            <StyledButton title={t('settings.sheets.save')} onPress={handleSave} size="medium" />
          )}
        </View>
      </BottomSheetWrapper>
    );
  },
);

CurrencySheet.displayName = 'CurrencySheet';
export default CurrencySheet;

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 0,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  currencyList: {
    flex: 1,
    maxHeight: 460,
    marginBottom: 8,
  },
  buttonContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
  },
  currencyItemSelected: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
  },
  currencyFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  currencyTextContainer: {
    flex: 1,
  },
  currencyCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  currencyName: {
    fontSize: 10,
    color: '#6B7280',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
});
