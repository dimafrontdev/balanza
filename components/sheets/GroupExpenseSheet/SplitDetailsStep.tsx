import { useState, useEffect, useRef, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import StyledButton from '@/components/ui/common/StyledButton';
import { Friend, Group, MOCK_FRIENDS } from '@/mocks/groups';
import { ScannedItem } from '@/components/ui/transaction/types';
import { GroupMember, SplitType } from './index';
import ByItemsStep from './splits/ByItemsStep';
import SelectPaidBySheet from './SelectPaidBySheet';
import { validateAmountInput } from '@/utils/validation';

interface SplitDetailsStepProps {
  group?: Group;
  friend?: Friend;
  items?: ScannedItem[];
  totalAmount: number;
  currency: { code: string; symbol: string };
  onBack: () => void;
  onConfirm: (data: { paidBy: GroupMember; splitType: SplitType; splits: GroupMember[] }) => void;
}

const getGroupMembers = (group?: Group): GroupMember[] => {
  if (!group) return [];
  const uniqueFriends = MOCK_FRIENDS.slice(0, group.membersCount);
  return uniqueFriends.map(f => ({
    ...f,
    selected: true,
  }));
};

export default function SplitDetailsStep({
  group,
  friend,
  items,
  totalAmount,
  currency,
  onBack,
  onConfirm,
}: SplitDetailsStepProps) {
  const { t } = useTranslation();
  const [splitType, setSplitType] = useState<SplitType>('equally');
  const [paidBy, setPaidBy] = useState<GroupMember>({
    id: 'you',
    name: t('transaction.you'),
    icon: '',
    balance: 0,
    status: 'active',
  });
  const [selectedMembers, setSelectedMembers] = useState<GroupMember[]>([]);
  const paidBySheetRef = useRef<BottomSheetModal>(null);

  const members = useMemo(() => {
    return group ? getGroupMembers(group) : friend ? [friend as GroupMember] : [];
  }, [friend, group]);

  const showItems =
    items && items.filter(item => item.name.trim() && item.amount.trim()).length > 0;

  const youMember: GroupMember = useMemo(() => {
    return {
      id: 'you',
      name: t('transaction.you'),
      icon: '',
      balance: 0,
      status: 'active',
    };
  }, [t]);

  const allMembers = useMemo(() => [youMember, ...members], [members, youMember]);

  useEffect(() => {
    if (allMembers.length > 0 && selectedMembers.length === 0) {
      setSelectedMembers(allMembers.map(m => ({ ...m, selected: true, amount: '0' })));
    }
  }, [allMembers, selectedMembers.length]);

  const handleSplitTypeChange = (type: SplitType) => {
    setSplitType(type);
  };

  const handleConfirmSplit = () => {
    let splits: GroupMember[] = [];

    switch (splitType) {
      case 'equally':
        const perPerson = totalAmount / allMembers.length;
        splits = allMembers.map(m => ({ ...m, amount: perPerson.toFixed(2) }));
        break;
      case 'custom':
        const selected = selectedMembers.filter(m => m.selected);
        const perPersonCustom = totalAmount / selected.length;
        splits = selected.map(m => ({ ...m, amount: perPersonCustom.toFixed(2) }));
        break;
      case 'exact':
        splits = selectedMembers.filter(m => parseFloat(m.amount || '0') > 0);
        break;
      case 'byItems':
        splits = selectedMembers;
        break;
    }

    onConfirm({ paidBy, splitType, splits });
  };

  const toggleMemberCustom = (id: string) => {
    setSelectedMembers(prev => prev.map(m => (m.id === id ? { ...m, selected: !m.selected } : m)));
  };

  const handleExactAmountChange = (id: string, value: string) => {
    const validated = validateAmountInput(value);
    setSelectedMembers(prev => prev.map(m => (m.id === id ? { ...m, amount: validated } : m)));
  };

  const calculateEqualSplit = () => {
    if (splitType === 'custom') {
      const selected = selectedMembers.filter(m => m.selected);
      return totalAmount / selected.length;
    }
    return totalAmount / allMembers.length;
  };

  const calculateExactTotal = () => {
    return selectedMembers.reduce((sum, m) => sum + parseFloat(m.amount || '0'), 0);
  };

  const exactRemaining = splitType === 'exact' ? totalAmount - calculateExactTotal() : 0;

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={[styles.selectedCard, styles.selectedCardHighlight]}>
            <TouchableOpacity style={styles.selectedMainContent} onPress={onBack}>
              <View style={styles.selectedIconContainer}>
                <Text style={styles.selectedIcon}>
                  {group ? group.icon : friend?.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.selectedContent}>
                <Text style={styles.selectedTitle}>{group?.name || friend?.name}</Text>
                {!!group && (
                  <Text style={styles.selectedSubtitle}>
                    {`${t('groups.balance.members', { count: group?.membersCount })}`}
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={onBack}>
                <Text style={styles.changeText}>{t('transaction.change')}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          <View style={[styles.selectedCard, styles.selectedCardHighlight]}>
            <TouchableOpacity
              style={styles.selectedMainContent}
              onPress={() => paidBySheetRef.current?.present()}>
              <View style={styles.selectedContent}>
                <Text style={styles.selectedTitle}>{t('transaction.whoPaid')}</Text>
                <Text style={styles.selectedSubtitle}>
                  {t(`transaction.${paidBy.id === 'you' ? 'you' : 'selectedPerson'}`, {
                    name: paidBy.name,
                  })}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>{t('transaction.howToSplit')}</Text>
          <View style={styles.splitTypeToggle}>
            <TouchableOpacity
              style={[styles.toggleOption, splitType === 'equally' && styles.toggleOptionActive]}
              onPress={() => handleSplitTypeChange('equally')}>
              <Text
                style={[
                  styles.toggleOptionText,
                  splitType === 'equally' && styles.toggleOptionTextActive,
                ]}>
                {t('transaction.equally')}
              </Text>
            </TouchableOpacity>

            {group && (
              <TouchableOpacity
                style={[styles.toggleOption, splitType === 'custom' && styles.toggleOptionActive]}
                onPress={() => handleSplitTypeChange('custom')}>
                <Text
                  style={[
                    styles.toggleOptionText,
                    splitType === 'custom' && styles.toggleOptionTextActive,
                  ]}>
                  {t('transaction.custom')}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.toggleOption, splitType === 'exact' && styles.toggleOptionActive]}
              onPress={() => handleSplitTypeChange('exact')}>
              <Text
                style={[
                  styles.toggleOptionText,
                  splitType === 'exact' && styles.toggleOptionTextActive,
                ]}>
                {t('transaction.exact')}
              </Text>
            </TouchableOpacity>

            {showItems && (
              <TouchableOpacity
                style={[styles.toggleOption, splitType === 'byItems' && styles.toggleOptionActive]}
                onPress={() => handleSplitTypeChange('byItems')}>
                <Text
                  style={[
                    styles.toggleOptionText,
                    splitType === 'byItems' && styles.toggleOptionTextActive,
                  ]}>
                  {t('transaction.byItems')}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {splitType === 'equally' && (
            <View style={styles.splitInfo}>
              <Ionicons name="people" size={48} color="#615FFF" style={styles.splitIcon} />
              <Text style={styles.splitMessage}>
                {t('transaction.eachPersonPays')}{' '}
                <Text style={styles.splitAmount}>
                  {currency.symbol}
                  {calculateEqualSplit().toFixed(2)}
                </Text>
              </Text>
            </View>
          )}

          {splitType === 'custom' && group && (
            <View style={styles.splitInfo}>
              <Text style={styles.splitInfoTitle}>{t('transaction.selectPeopleToSplit')}</Text>
              <Text style={styles.splitInfoSubtitle}>
                {selectedMembers.filter(m => m.selected).length} {t('transaction.people')} •{' '}
                {currency.symbol}
                {calculateEqualSplit().toFixed(2)} {t('transaction.each')}
              </Text>
              <View style={styles.membersList}>
                {selectedMembers.map(member => (
                  <TouchableOpacity
                    key={member.id}
                    style={[styles.memberItem, member.selected && styles.memberItemSelected]}
                    onPress={() => toggleMemberCustom(member.id)}>
                    <View style={styles.memberInfo}>
                      <View style={styles.memberAvatarSmall}>
                        <Text style={styles.memberAvatarTextSmall}>{member.name.charAt(0)}</Text>
                      </View>
                      <Text style={styles.memberNameText}>{member.name}</Text>
                    </View>
                    <View style={[styles.checkbox, member.selected && styles.checkboxSelected]}>
                      {member.selected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {splitType === 'exact' && (
            <View style={styles.splitInfo}>
              <View style={styles.exactHeader}>
                <Text style={styles.splitInfoTitle}>{t('transaction.enterExactAmounts')}</Text>
                <Text style={[styles.remaining, exactRemaining < 0 && styles.remainingNegative]}>
                  {exactRemaining >= 0 ? t('transaction.remaining') : t('transaction.over')}:{' '}
                  {currency.symbol}
                  {Math.abs(exactRemaining).toFixed(2)}
                </Text>
              </View>
              <View style={styles.membersList}>
                {selectedMembers.map((member, index) => (
                  <View key={member.id} style={styles.exactCard}>
                    <View style={styles.exactRow}>
                      <View style={styles.exactIndex}>
                        <Text style={styles.exactIndexText}>{index + 1}</Text>
                      </View>
                      <View style={styles.exactContent}>
                        <Text style={styles.exactName}>{member.name}</Text>
                        <View style={styles.exactAmountRow}>
                          <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                          <TextInput
                            style={styles.exactInput}
                            value={member.amount || ''}
                            onChangeText={value => handleExactAmountChange(member.id, value)}
                            placeholder="0.00"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="decimal-pad"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {splitType === 'byItems' && showItems && (
            <View style={styles.splitInfo}>
              <ByItemsStep
                items={items!}
                members={allMembers}
                onConfirm={splits => {
                  setSelectedMembers(splits);
                }}
                hideButtons={true}
                currency={currency}
              />
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <StyledButton
            title={t('transaction.confirmSplit')}
            onPress={handleConfirmSplit}
            size="medium"
            disabled={splitType === 'exact' && exactRemaining !== 0}
          />
        </View>
      </KeyboardAvoidingView>

      <SelectPaidBySheet
        ref={paidBySheetRef}
        members={allMembers}
        selectedPaidBy={paidBy}
        onSelect={setPaidBy}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedCard: {
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
  },
  selectedCardHighlight: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
  },
  selectedMainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  selectedIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedIcon: {
    fontSize: 20,
  },
  selectedContent: {
    flex: 1,
  },
  selectedTitle: {
    color: '#101828',
    fontFamily: 'Bitter-Regular',
    fontSize: 15,
    marginBottom: 2,
  },
  selectedSubtitle: {
    fontSize: 12,
    color: '#615FFF',
    fontFamily: 'Bitter-Regular',
  },
  changeText: {
    fontFamily: 'Bitter-Regular',
    fontSize: 12,
    color: '#615FFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
    fontFamily: 'Bitter-Regular',
  },
  splitTypeToggle: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 3,
    gap: 3,
    marginBottom: 20,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 7,
    alignItems: 'center',
  },
  toggleOptionActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleOptionText: {
    fontSize: 13,
    fontFamily: 'Bitter-Regular',
    color: '#6B7280',
  },
  toggleOptionTextActive: {
    color: '#111827',
  },
  splitInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  splitIcon: {
    marginBottom: 16,
  },
  splitMessage: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  splitAmount: {
    fontSize: 20,
    color: '#615FFF',
    fontFamily: 'Bitter-Regular',
  },
  membersChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  memberChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#615FFF',
  },
  memberChipText: {
    fontSize: 14,
    color: '#615FFF',
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
  },
  splitInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    marginBottom: 8,
    textAlign: 'center',
  },
  splitInfoSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    marginBottom: 16,
    textAlign: 'center',
  },
  membersList: {
    width: '100%',
    gap: 10,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  memberItemSelected: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  memberAvatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#615FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberAvatarTextSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Bitter-Regular',
  },
  memberNameText: {
    fontSize: 15,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    fontWeight: '500',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#615FFF',
    borderColor: '#615FFF',
  },
  exactHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  remaining: {
    fontSize: 13,
    color: '#10B981',
    fontFamily: 'Bitter-Regular',
    fontWeight: '600',
  },
  remainingNegative: {
    color: '#EF4444',
  },
  exactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  exactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exactIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exactIndexText: {
    fontSize: 14,
    fontFamily: 'Bitter-Regular',
    color: '#6B7280',
    fontWeight: '600',
  },
  exactContent: {
    flex: 1,
    gap: 8,
  },
  exactName: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    fontWeight: '500',
  },
  exactAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
  },
  exactInput: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    padding: 0,
    margin: 0,
    flex: 1,
  },
  footer: {
    paddingVertical: 20,
  },
});
