import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { accountTypes } from './constants';

interface AccountTypeStepProps {
  onSelectType: (type: { icon: string; id: string }) => void;
}

export const AccountTypeStep = ({ onSelectType }: AccountTypeStepProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Text style={styles.subtitle}>{t('accounts.selectAccountType')}</Text>
      <BottomSheetScrollView style={styles.typeList} contentContainerStyle={styles.typeListContent}>
        {accountTypes.map(type => (
          <TouchableOpacity
            key={type.id}
            style={styles.typeItem}
            onPress={() => onSelectType(type)}>
            <Text style={styles.typeIcon}>{type.icon}</Text>
            <Text style={styles.typeName}>{t(`accounts.types.${type.id}`)}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheetScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    color: '#6A7282',
    marginBottom: 16,
  },
  typeList: {
    flex: 1,
  },
  typeListContent: {
    gap: 8,
    paddingBottom: 24,
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  typeIcon: {
    fontSize: 24,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
});
