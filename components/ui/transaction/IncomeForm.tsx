import { Control } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import TransactionFormFields from './TransactionFormFields';
import RecurringOption from './RecurringOption';
import { TransactionFormData } from './types';
import { RecurringFrequency } from '@/components/sheets/RecurringSheet';

interface Account {
  name: string;
  icon: string;
  currency: { code: string };
}

interface IncomeFormProps {
  control: Control<TransactionFormData>;
  selectedCategory: { name: string; icon: string } | null;
  selectedAccount: Account | undefined;
  onCategoryPress: () => void;
  onAccountPress: () => void;
  onRecurringPress: () => void;
  selectedRecurring?: RecurringFrequency;
  onRemoveRecurring: () => void;
}

export default function IncomeForm({
  control,
  selectedCategory,
  selectedAccount,
  onCategoryPress,
  onAccountPress,
  onRecurringPress,
  selectedRecurring,
  onRemoveRecurring,
}: IncomeFormProps) {
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
      <RecurringOption
        onPress={onRecurringPress}
        selectedFrequency={selectedRecurring}
        onRemove={onRemoveRecurring}
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
