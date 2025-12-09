import { forwardRef, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { Switch } from 'react-native-paper';
import { HomeWidgetConfig } from '@/store/settingsStore';

export type HomeWidget =
  | 'totalBalance'
  | 'monthlyBudget'
  | 'financialGoals'
  | 'sharedExpenses'
  | 'recentTransactions';

export type { HomeWidgetConfig };

interface CustomizeHomeSheetProps {
  widgets: HomeWidgetConfig[];
  onSave: (widgets: HomeWidgetConfig[]) => void;
}

const CustomizeHomeSheet = forwardRef<BottomSheetModal, CustomizeHomeSheetProps>(
  ({ widgets, onSave }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['55%']);
    const [localWidgets, setLocalWidgets] = useState<HomeWidgetConfig[]>(widgets);

    useEffect(() => {
      setLocalWidgets(widgets);
    }, [widgets]);

    const handleToggleVisibility = useCallback(
      (id: string) => {
        const visibleCount = localWidgets.filter(w => w.visible).length;
        const widget = localWidgets.find(w => w.id === id);

        if (widget?.visible && visibleCount === 1) {
          return;
        }

        const newWidgets = localWidgets.map(w => (w.id === id ? { ...w, visible: !w.visible } : w));
        setLocalWidgets(newWidgets);
        onSave(newWidgets);
      },
      [localWidgets, onSave],
    );

    const handleDragEnd = useCallback(
      ({ data }: { data: HomeWidgetConfig[] }) => {
        const reorderedWidgets = data.map((w, i) => ({ ...w, order: i }));
        setLocalWidgets(reorderedWidgets);
        onSave(reorderedWidgets);
      },
      [onSave],
    );

    const visibleCount = localWidgets.filter(w => w.visible).length;

    const renderItem = ({ item, drag, isActive }: RenderItemParams<HomeWidgetConfig>) => {
      return (
        <View style={[styles.widgetItem, isActive && styles.widgetItemActive]}>
          <View style={styles.dragHandle} onTouchStart={drag}>
            <MaterialIcons name="drag-indicator" size={24} color="#9CA3AF" />
          </View>

          <Text style={[styles.widgetTitle, !item.visible && styles.widgetTitleDisabled]}>
            {item.title}
          </Text>

          <Switch
            value={item.visible}
            onValueChange={() => handleToggleVisibility(item.id)}
            disabled={item.visible && visibleCount === 1}
            trackColor={{ false: '#E5E7EB', true: 'black' }}
            thumbColor={item.visible ? 'white' : '#F3F4F6'}
          />
        </View>
      );
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['55%']}
        renderBackdrop={renderBackdrop}
        enableDynamicSizing={false}>
        <BottomSheetView style={styles.container}>
          <Text style={styles.title}>{t('balance.customizeHome')}</Text>
          <Text style={styles.subtitle}>{t('balance.customizeHomeSubtitle')}</Text>

          <GestureHandlerRootView>
            <DraggableFlatList
              data={localWidgets}
              onDragEnd={handleDragEnd}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </GestureHandlerRootView>
        </BottomSheetView>
      </BottomSheetWrapper>
    );
  },
);

CustomizeHomeSheet.displayName = 'CustomizeHomeSheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#6A7282',
    marginBottom: 24,
    lineHeight: 20,
  },
  widgetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#F3F4F6',
    backgroundColor: 'white',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  widgetItemActive: {
    backgroundColor: 'transparent',
  },
  dragHandle: {
    marginRight: 12,
    padding: 4,
  },
  widgetTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Bitter-Regular',
    color: '#101828',
  },
  widgetTitleDisabled: {
    color: '#9CA3AF',
  },
});

export default CustomizeHomeSheet;
