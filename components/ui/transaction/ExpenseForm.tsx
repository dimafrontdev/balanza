import { Control } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import TransactionFormFields from './TransactionFormFields';
import RecurringOption from './RecurringOption';
import SplitWithGroupOption from './SplitWithGroupOption';
import ItemsList from './ItemsList';
import { TransactionFormData, ScannedItem } from './types';
import { RecurringFrequency } from '@/components/sheets/RecurringSheet';

interface Account {
  name: string;
  icon: string;
  currency: { code: string };
}

interface ExpenseFormProps {
  control: Control<TransactionFormData>;
  selectedCategory: { name: string; icon: string } | null;
  selectedAccount: Account | undefined;
  onCategoryPress: () => void;
  onAccountPress: () => void;
  onRecurringPress: () => void;
  selectedRecurring?: RecurringFrequency;
  onRemoveRecurring: () => void;
  items?: ScannedItem[];
  onEditItems: () => void;
  onSplitWithGroupPress: () => void;
  selectedGroup?: { id: string; name: string; icon: string };
  onRemoveSplitGroup: () => void;
  currency?: { code: string; symbol: string };
}

export default function ExpenseForm({
  control,
  selectedCategory,
  selectedAccount,
  onCategoryPress,
  onAccountPress,
  onRecurringPress,
  selectedRecurring,
  onRemoveRecurring,
  items,
  onEditItems,
  onSplitWithGroupPress,
  selectedGroup,
  onRemoveSplitGroup,
  currency,
}: ExpenseFormProps) {
  return (
    <ScrollView
      style={styles.content}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <TransactionFormFields
        control={control}
        selectedCategory={selectedCategory}
        selectedAccount={selectedAccount}
        onCategoryPress={onCategoryPress}
        onAccountPress={onAccountPress}
      />
      {items && items.length > 0 && (
        <ItemsList items={items} onPress={onEditItems} currency={currency} />
      )}
      <RecurringOption
        onPress={onRecurringPress}
        selectedFrequency={selectedRecurring}
        onRemove={onRemoveRecurring}
      />
      <SplitWithGroupOption
        onPress={onSplitWithGroupPress}
        selectedGroup={selectedGroup}
        onRemove={onRemoveSplitGroup}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});
