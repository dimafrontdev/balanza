import { forwardRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { GroupMember, MOCK_FRIENDS } from '@/mocks';
import { IconArrowBack, IconTrash } from '@/assets/icons';
import StyledButton from '@/components/ui/common/StyledButton';

interface GroupMembersSheetProps {
  members?: GroupMember[];
  onInvite?: () => void;
}

const GroupMembersSheet = forwardRef<BottomSheetModal, GroupMembersSheetProps>(
  ({ members = [], onInvite }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['80%']);
    const [showAddMembers, setShowAddMembers] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

    const handleClose = () => {
      (ref as any)?.current?.dismiss();
      setShowAddMembers(false);
      setSelectedFriends([]);
    };

    const handleToggleFriend = (friendId: string) => {
      setSelectedFriends(prev =>
        prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId],
      );
    };

    const handleAddMembers = () => {
      console.log('Adding members:', selectedFriends);
      setShowAddMembers(false);
      setSelectedFriends([]);
      onInvite?.();
    };

    const handleDeleteMember = (memberId: string, memberName: string) => {
      Alert.alert(
        t('groups.details.confirmTitle'),
        t('groups.details.confirmRemoveMember', { name: memberName }),
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('groups.details.remove'),
            style: 'destructive',
            onPress: () => {
              console.log('Removing member:', memberId);
              // TODO: Implement actual member removal
            },
          },
        ],
      );
    };

    const memberIds = members.map(m => m.id);
    const availableFriends = MOCK_FRIENDS.filter(
      f => f.status === 'active' && !memberIds.includes(f.id),
    );

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['80%']}
        stackBehavior="push"
        renderBackdrop={renderBackdrop}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.backButton}>
              <IconArrowBack />
            </TouchableOpacity>
            <Text style={styles.title}>{t('groups.details.members')}</Text>
          </View>

          {!showAddMembers ? (
            <>
              <ScrollView style={styles.membersList}>
                <View style={styles.memberItem}>
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>Y</Text>
                  </View>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{t('groups.details.you')}</Text>
                    <Text style={styles.memberRole}>{t('groups.details.admin')}</Text>
                  </View>
                </View>

                {members.map(member => (
                  <View key={member.id} style={styles.memberItem}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatarText}>{member.name.charAt(0).toUpperCase()}</Text>
                    </View>
                    <View style={styles.memberInfo}>
                      <Text style={styles.memberName}>{member.name}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteMember(member.id, member.name)}>
                      <IconTrash size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              <StyledButton
                title={t('groups.details.addMembers')}
                onPress={() => setShowAddMembers(true)}
                size="medium"
                style={styles.button}
              />
            </>
          ) : (
            <>
              <ScrollView style={styles.membersList} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>{t('groups.sections.friends')}</Text>
                {availableFriends.length > 0 ? (
                  availableFriends.map(friend => {
                    const isSelected = selectedFriends.includes(friend.id);
                    return (
                      <TouchableOpacity
                        key={friend.id}
                        style={[styles.friendItem, isSelected && styles.friendItemSelected]}
                        onPress={() => handleToggleFriend(friend.id)}>
                        <View style={styles.avatarContainerSmall}>
                          <Text style={styles.avatarTextSmall}>{friend.name.charAt(0)}</Text>
                        </View>
                        <View style={styles.friendInfo}>
                          <Text style={styles.friendName}>{friend.name}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text style={styles.emptyText}>{t('groups.details.noFriendsAvailable')}</Text>
                )}
              </ScrollView>

              <StyledButton
                title={`${t('groups.details.add')} (${selectedFriends.length})`}
                onPress={handleAddMembers}
                disabled={selectedFriends.length === 0}
                size="medium"
                style={styles.button}
              />
            </>
          )}
        </View>
      </BottomSheetWrapper>
    );
  },
);

GroupMembersSheet.displayName = 'GroupMembersSheet';

export default GroupMembersSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    color: '#101828',
  },
  content: {
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  membersList: {
    gap: 8,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    marginBottom: 8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#615FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  memberRole: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
  },
  friendItemSelected: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
  },
  avatarContainerSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#615FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarTextSmall: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 15,
    color: '#111827',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 32,
  },
  button: {
    marginBottom: 32,
    marginTop: 8,
  },
});
