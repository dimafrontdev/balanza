import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { MOCK_GROUPS, MOCK_FRIENDS, Group, Friend } from '@/mocks/groups';

interface SelectGroupStepProps {
  onSelectGroup: (group: Group) => void;
  onSelectFriend: (friend: Friend) => void;
  selectedGroup?: Group;
  selectedFriend?: Friend;
}

export default function SelectGroupStep({
  onSelectGroup,
  onSelectFriend,
  selectedGroup,
  selectedFriend,
}: SelectGroupStepProps) {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>{t('groups.sections.groups')}</Text>
      {MOCK_GROUPS.map(group => (
        <TouchableOpacity
          key={`group-${group.id}`}
          style={[styles.item, selectedGroup?.id === group.id && styles.selected]}
          onPress={() => onSelectGroup(group)}>
          <Text style={styles.icon}>{group.icon}</Text>
          <View style={styles.itemContent}>
            <Text style={styles.itemName}>{group.name}</Text>
            <Text style={styles.itemSubtext}>
              {t('groups.balance.members', { count: group.membersCount })}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
        {t('groups.sections.friends')}
      </Text>
      {MOCK_FRIENDS.filter(f => f.status === 'active').map(friend => (
        <TouchableOpacity
          key={`friend-${friend.id}`}
          style={[styles.item, selectedFriend?.id === friend.id && styles.selected]}
          onPress={() => onSelectFriend(friend)}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{friend.name.charAt(0)}</Text>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemName}>{friend.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    fontFamily: 'Bitter-Regular',
    letterSpacing: 0.5,
  },
  sectionTitleSpaced: {
    marginTop: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
  },
  selected: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
  },
  icon: {
    marginRight: 12,
    fontSize: 22,
  },
  avatarContainer: {
    width: 30,
    height: 30,
    borderRadius: 22,
    backgroundColor: '#615FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Bitter-Regular',
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
  },
  itemSubtext: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    marginTop: 2,
  },
});
