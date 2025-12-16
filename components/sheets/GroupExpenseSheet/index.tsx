import { forwardRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { IconArrowBack } from '@/assets/icons';
import SelectGroupStep from './SelectGroupStep';
import SplitDetailsStep from './SplitDetailsStep';
import { Friend, Group } from '@/mocks/groups';
import { ScannedItem } from '@/components/ui/transaction/types';

export type SplitType = 'equally' | 'custom' | 'exact' | 'byItems';

export interface GroupMember extends Friend {
  selected?: boolean;
  amount?: string;
}

interface GroupExpenseSheetProps {
  items?: ScannedItem[];
  totalAmount: number;
  currency: { code: string; symbol: string };
  onConfirm: (data: {
    group?: Group;
    friend?: Friend;
    paidBy: GroupMember;
    splitType: SplitType;
    splits: GroupMember[];
  }) => void;
}

const GroupExpenseSheet = forwardRef<BottomSheetModal, GroupExpenseSheetProps>(
  ({ items, totalAmount, currency, onConfirm }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['90%']);
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedGroup, setSelectedGroup] = useState<Group | undefined>();
    const [selectedFriend, setSelectedFriend] = useState<Friend | undefined>();

    const handleBack = () => {
      if (step === 2) {
        setStep(1);
      } else {
        (ref as any)?.current?.dismiss();
      }
    };

    const handleGroupSelect = (group: Group) => {
      setSelectedGroup(group);
      setSelectedFriend(undefined);
      setStep(2);
    };

    const handleFriendSelect = (friend: Friend) => {
      setSelectedFriend(friend);
      setSelectedGroup(undefined);
      setStep(2);
    };

    const handleConfirm = (data: {
      paidBy: GroupMember;
      splitType: SplitType;
      splits: GroupMember[];
    }) => {
      onConfirm({
        group: selectedGroup,
        friend: selectedFriend,
        ...data,
      });
      (ref as any)?.current?.dismiss();
    };

    const handleSheetDismiss = () => {
      setStep(1);
      setSelectedGroup(undefined);
      setSelectedFriend(undefined);
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['90%']}
        stackBehavior="push"
        renderBackdrop={renderBackdrop}
        onDismiss={handleSheetDismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <IconArrowBack />
            </TouchableOpacity>
            <Text style={styles.title}>
              {step === 1 ? t('transaction.splitWithGroup') : t('transaction.splitDetails')}
            </Text>
            <View style={styles.placeholder} />
          </View>

          {step === 1 ? (
            <SelectGroupStep
              onSelectGroup={handleGroupSelect}
              onSelectFriend={handleFriendSelect}
              selectedGroup={selectedGroup}
              selectedFriend={selectedFriend}
            />
          ) : (
            <SplitDetailsStep
              group={selectedGroup}
              friend={selectedFriend}
              items={items}
              totalAmount={totalAmount}
              currency={currency}
              onBack={() => setStep(1)}
              onConfirm={handleConfirm}
            />
          )}
        </View>
      </BottomSheetWrapper>
    );
  },
);

GroupExpenseSheet.displayName = 'GroupExpenseSheet';

export default GroupExpenseSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
});
