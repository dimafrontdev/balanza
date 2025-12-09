import { useRef, useMemo, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import FloatingActionButton from '@/components/ui/common/FloatingActionButton';
import AddFriendOrGroupSheet from '@/components/sheets/AddFriendOrGroupSheet';
import { IconAddPerson } from '@/assets/icons';
import {
  BalanceSummary,
  SectionHeader,
  ListItem,
  SettledUpSection,
} from '@/components/ui/groups';
import { MOCK_GROUPS, MOCK_FRIENDS, Friend, Group } from '@/mocks';
import useSettingsStore from '@/store/settingsStore';
import { formatAmount } from '@/utils/currency';

export default function GroupsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { currency } = useSettingsStore();
  const addFriendOrGroupSheetRef = useRef<BottomSheetModal>(null);

  const handleAddPress = () => {
    addFriendOrGroupSheetRef.current?.present();
  };

  const formatAmountCallback = useCallback(
    (amount: number) => formatAmount(amount, currency, { decimals: 2 }),
    [currency],
  );

  const { activeGroups, activeFriends, settledItems } = useMemo(() => {
    const activeGroups = MOCK_GROUPS.filter(group => group.balance !== 0);
    const activeFriends = MOCK_FRIENDS.filter(
      friend => friend.balance !== 0 || friend.status === 'pending',
    );
    const settledGroups = MOCK_GROUPS.filter(group => group.balance === 0);
    const settledFriends = MOCK_FRIENDS.filter(
      friend => friend.balance === 0 && friend.status === 'active',
    );
    const settledItems: (Friend | Group)[] = [...settledGroups, ...settledFriends];
    
    return { activeGroups, activeFriends, settledItems };
  }, []);

  const { totalOwe, totalOwed } = useMemo(() => {
    const friendsOwe = MOCK_FRIENDS.reduce(
      (sum, friend) => (friend.balance > 0 ? sum + friend.balance : sum),
      0,
    );
    const friendsOwed = MOCK_FRIENDS.reduce(
      (sum, friend) => (friend.balance < 0 ? sum + Math.abs(friend.balance) : sum),
      0,
    );
    const groupsOwe = MOCK_GROUPS.reduce(
      (sum, group) => (group.balance > 0 ? sum + group.balance : sum),
      0,
    );
    const groupsOwed = MOCK_GROUPS.reduce(
      (sum, group) => (group.balance < 0 ? sum + Math.abs(group.balance) : sum),
      0,
    );

    return {
      totalOwe: friendsOwe + groupsOwe,
      totalOwed: friendsOwed + groupsOwed,
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <BalanceSummary
          totalOwe={totalOwe}
          totalOwed={totalOwed}
          formatAmount={formatAmountCallback}
        />

        <SectionHeader title={t('groups.sections.groups')} />
        {activeGroups.length > 0 && (
          <View style={styles.listSection}>
            {activeGroups.map(group => (
              <ListItem key={group.id} item={group} formatAmount={formatAmountCallback} />
            ))}
          </View>
        )}

        <SectionHeader title={t('groups.sections.friends')} />
        {activeFriends.length > 0 && (
          <View style={styles.listSection}>
            {activeFriends.map(friend => (
              <ListItem key={friend.id} item={friend} formatAmount={formatAmountCallback} />
            ))}
          </View>
        )}

        {settledItems.length > 0 && (
          <SettledUpSection title={t('groups.settledUp.title')} count={settledItems.length}>
            {settledItems.map(item => (
              <ListItem key={item.id} item={item} formatAmount={formatAmountCallback} />
            ))}
          </SettledUpSection>
        )}
      </ScrollView>
      <FloatingActionButton onPress={handleAddPress} icon={<IconAddPerson />} />
      <AddFriendOrGroupSheet ref={addFriendOrGroupSheetRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  listSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});
