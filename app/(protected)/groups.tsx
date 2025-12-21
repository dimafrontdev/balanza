import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import FloatingActionButton from '@/components/ui/common/FloatingActionButton';
import AddFriendOrGroupSheet from '@/components/sheets/AddFriendOrGroupSheet';
import GroupFriendDetailsSheet from '@/components/sheets/GroupFriendDetailsSheet';
import { IconAddPerson } from '@/assets/icons';
import { BalanceSummary, SectionHeader, ListItem, SettledUpSection } from '@/components/ui/groups';
import { Friend, Group } from '@/mocks';
import useSettingsStore from '@/store/settingsStore';
import { formatAmount } from '@/utils/currency';
import { groupsApi } from '@/api/groups';

function isGroup(item: Friend | Group): item is Group {
  return 'membersCount' in item;
}

export default function GroupsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { currency } = useSettingsStore();
  const { invitationToken } = useLocalSearchParams<{ invitationToken?: string }>();
  const addFriendOrGroupSheetRef = useRef<BottomSheetModal>(null);
  const detailsSheetRef = useRef<BottomSheetModal>(null);
  const [selectedItem, setSelectedItem] = useState<Friend | Group | null>(null);
  const [editGroupData, setEditGroupData] = useState<{
    id: string;
    name: string;
    icon: string;
  } | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    loadGroupsAndFriends();
  }, []);

  useEffect(() => {
    if (invitationToken) {
      acceptInvitation(invitationToken as string);
    }
  }, [invitationToken]);

  const loadGroupsAndFriends = async () => {
    const data = await groupsApi.getGroupsAndFriends();
    setGroups(data.groups);
    setFriends(data.friends);
  };

  const acceptInvitation = async (token: string) => {
    await groupsApi.acceptInvitation(token);
    await loadGroupsAndFriends();
  };

  const handleAddPress = () => {
    setEditGroupData(null);
    addFriendOrGroupSheetRef.current?.present();
  };

  const handleItemPress = (item: Friend | Group) => {
    setSelectedItem(item);
    detailsSheetRef.current?.present();
  };

  const handleUpdateItem = async () => {
    await loadGroupsAndFriends();
    if (selectedItem) {
      const allData = await groupsApi.getGroupsAndFriends();
      const updatedItem = isGroup(selectedItem)
        ? allData.groups.find(g => g.id === selectedItem.id)
        : allData.friends.find(f => f.id === selectedItem.id);
      if (updatedItem) {
        setSelectedItem(updatedItem);
      }
    }
  };

  const handleEdit = (item: Friend | Group) => {
    if (isGroup(item)) {
      setEditGroupData({ id: item.id, name: item.name, icon: item.icon });
      addFriendOrGroupSheetRef.current?.present();
      detailsSheetRef.current?.dismiss();
    }
  };

  const handleDelete = async (item: Friend | Group) => {
    if (isGroup(item)) {
      await groupsApi.deleteGroup(item.id);
    } else {
      const idToRemove = item.friendshipId || item.id;
      await groupsApi.removeFriend(idToRemove);
    }
    detailsSheetRef.current?.dismiss();
    loadGroupsAndFriends();
  };

  const handleRemoveFriend = async (friend: Friend) => {
    const idToRemove = friend.friendshipId || friend.id;
    await groupsApi.removeFriend(idToRemove);
    detailsSheetRef.current?.dismiss();
    loadGroupsAndFriends();
  };

  const formatAmountCallback = useCallback(
    (amount: number) => formatAmount(amount, currency, { decimals: 2 }),
    [currency],
  );

  const { activeGroups, activeFriends, settledItems } = useMemo(() => {
    const activeGroups = groups.filter(group => group.balance !== 0);
    const activeFriends = friends.filter(
      friend => friend.balance !== 0 || friend.status === 'pending',
    );
    const settledGroups = groups.filter(group => group.balance === 0);
    const settledFriends = friends.filter(
      friend => friend.balance === 0 && friend.status === 'active',
    );
    const settledItems: (Friend | Group)[] = [...settledGroups, ...settledFriends];

    return { activeGroups, activeFriends, settledItems };
  }, [groups, friends]);

  const { totalOwe, totalOwed } = useMemo(() => {
    const friendsOwe = friends.reduce(
      (sum, friend) => (friend.balance > 0 ? sum + friend.balance : sum),
      0,
    );
    const friendsOwed = friends.reduce(
      (sum, friend) => (friend.balance < 0 ? sum + Math.abs(friend.balance) : sum),
      0,
    );
    const groupsOwe = groups.reduce(
      (sum, group) => (group.balance > 0 ? sum + group.balance : sum),
      0,
    );
    const groupsOwed = groups.reduce(
      (sum, group) => (group.balance < 0 ? sum + Math.abs(group.balance) : sum),
      0,
    );

    return {
      totalOwe: friendsOwe + groupsOwe,
      totalOwed: friendsOwed + groupsOwed,
    };
  }, [groups, friends]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <BalanceSummary
          totalOwe={totalOwe}
          totalOwed={totalOwed}
          formatAmount={formatAmountCallback}
        />

        <SectionHeader title={t('groups.sections.groups')} />
        {activeGroups.length > 0 ? (
          <View style={styles.listSection}>
            {activeGroups.map(group => (
              <ListItem
                key={`group-${group.id}`}
                item={group}
                formatAmount={formatAmountCallback}
                onPress={() => handleItemPress(group)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t('groups.emptyGroups')}</Text>
          </View>
        )}

        <SectionHeader title={t('groups.sections.friends')} />
        {activeFriends.length > 0 ? (
          <View style={styles.listSection}>
            {activeFriends.map(friend => (
              <ListItem
                key={`friend-${friend.id}`}
                item={friend}
                formatAmount={formatAmountCallback}
                onPress={() => handleItemPress(friend)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t('groups.emptyFriends')}</Text>
          </View>
        )}

        {settledItems.length > 0 && (
          <SettledUpSection title={t('groups.settledUp.title')} count={settledItems.length}>
            {settledItems.map(item => {
              return (
                <ListItem
                  key={`${item.name}-${item.id}}`}
                  item={item}
                  formatAmount={formatAmountCallback}
                  onPress={() => handleItemPress(item)}
                />
              );
            })}
          </SettledUpSection>
        )}
      </ScrollView>
      <FloatingActionButton onPress={handleAddPress} icon={<IconAddPerson />} />
      <AddFriendOrGroupSheet
        ref={addFriendOrGroupSheetRef}
        editGroup={editGroupData}
        onSuccess={loadGroupsAndFriends}
      />
      <GroupFriendDetailsSheet
        ref={detailsSheetRef}
        item={selectedItem}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRemoveFriend={handleRemoveFriend}
        onUpdate={handleUpdateItem}
      />
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
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6A7282',
    textAlign: 'center',
  },
});
