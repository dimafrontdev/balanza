import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { IconGroup, IconAddPerson } from '@/assets/icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ChoiceStepProps {
  onSelectChoice: (choice: 'friend' | 'group') => void;
}

export const ChoiceStep = ({ onSelectChoice }: ChoiceStepProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Text style={styles.subtitle}>{t('groups.chooseOption')}</Text>
      <BottomSheetScrollView
        style={styles.choiceList}
        contentContainerStyle={styles.choiceListContent}>
        <TouchableOpacity onPress={() => onSelectChoice('friend')}>
          <LinearGradient
            colors={['#EEF2FF', '#FAF5FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.choiceItem, styles.choiceFriend]}>
            <View style={[styles.iconContainer, styles.iconFriend]}>
              <IconAddPerson />
            </View>
            <View style={styles.choiceContent}>
              <Text style={styles.choiceTitle}>{t('groups.inviteFriend')}</Text>
              <Text style={styles.choiceDescription}>{t('groups.inviteFriendDescription')}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onSelectChoice('group')}>
          <LinearGradient
            colors={['#FAF5FF', '#FDF2F8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.choiceItem, styles.choiceGroup]}>
            <View style={[styles.iconContainer, styles.iconGroup]}>
              <IconGroup size={24} color="white" />
            </View>
            <View style={styles.choiceContent}>
              <Text style={styles.choiceTitle}>{t('groups.createGroup')}</Text>
              <Text style={styles.choiceDescription}>{t('groups.createGroupDescription')}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
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
  choiceList: {
    flex: 1,
  },
  choiceListContent: {
    gap: 12,
    paddingBottom: 24,
  },
  choiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 16,
    borderWidth: 1,
    backgroundColor: '#FAFAFA',
  },
  choiceFriend: { borderColor: '#E0E7FF' },
  choiceGroup: { borderColor: '#F3E8FF' },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconFriend: {
    backgroundColor: '#615FFF',
  },
  iconGroup: {
    backgroundColor: '#AD46FF',
  },
  choiceContent: {
    flex: 1,
  },
  choiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  choiceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
