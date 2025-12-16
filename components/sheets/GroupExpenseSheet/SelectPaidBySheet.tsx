import { forwardRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import BottomSheetWrapper from '@/components/ui/common/BottomSheetWrapper';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { GroupMember } from './index';

interface SelectPaidBySheetProps {
  members: GroupMember[];
  selectedPaidBy: GroupMember;
  onSelect: (member: GroupMember) => void;
}

const SelectPaidBySheet = forwardRef<BottomSheetModal, SelectPaidBySheetProps>(
  ({ members, selectedPaidBy, onSelect }, ref) => {
    const { t } = useTranslation();
    const { renderBackdrop } = useBottomSheet(['60%']);

    const handleSelect = (member: GroupMember) => {
      onSelect(member);
      (ref as any)?.current?.dismiss();
    };

    return (
      <BottomSheetWrapper
        sheetRef={ref}
        snapPoints={['60%']}
        stackBehavior="push"
        enableDynamicSizing={false}
        renderBackdrop={renderBackdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('transaction.whoPaid')}</Text>

          <ScrollView style={styles.membersList} showsVerticalScrollIndicator={false}>
            {members.map(member => {
              const isSelected = member.id === selectedPaidBy.id;

              return (
                <TouchableOpacity
                  key={member.id}
                  style={styles.memberItem}
                  onPress={() => handleSelect(member)}>
                  <View style={[styles.memberContent, isSelected && styles.memberContentSelected]}>
                    <View style={styles.memberAvatar}>
                      <Text style={styles.memberAvatarText}>{member.name.charAt(0)}</Text>
                    </View>
                    <View style={styles.memberInfo}>
                      <Text style={styles.memberName}>{member.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </BottomSheetWrapper>
    );
  },
);

SelectPaidBySheet.displayName = 'SelectPaidBySheet';

export default SelectPaidBySheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 0,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Bitter-Regular',
    textAlign: 'center',
    color: '#101828',
    marginBottom: 20,
  },
  membersList: {
    flex: 1,
  },
  memberItem: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  memberContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
  },
  memberContentSelected: {
    borderColor: '#615FFF',
    backgroundColor: '#EEF2FF',
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#615FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  memberAvatarText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Bitter-Regular',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 15,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
  },
});
