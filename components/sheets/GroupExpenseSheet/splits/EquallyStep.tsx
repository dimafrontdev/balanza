import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import StyledButton from '@/components/ui/common/StyledButton';
import { GroupMember } from '../index';

interface EquallyStepProps {
  members: GroupMember[];
  totalAmount: number;
  onBack: () => void;
  onConfirm: (splits: GroupMember[]) => void;
}

export default function EquallyStep({ members, totalAmount, onConfirm }: EquallyStepProps) {
  const perPerson = totalAmount / (members.length + 1);

  const handleConfirm = () => {
    const splits = members.map(member => ({
      ...member,
      amount: perPerson.toFixed(2),
    }));
    onConfirm(splits);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="people" size={64} color="#615FFF" />
        </View>

        <Text style={styles.title}>Split Equally</Text>
        <Text style={styles.message}>
          Each person pays <Text style={styles.amount}>${perPerson.toFixed(2)}</Text>
        </Text>

        <View style={styles.membersContainer}>
          <View style={styles.memberChip}>
            <Text style={styles.memberChipText}>You</Text>
          </View>
          {members.map(member => (
            <View key={member.id} style={styles.memberChip}>
              <Text style={styles.memberChipText}>{member.name.split(' ')[0]}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <StyledButton title="Confirm Split" onPress={handleConfirm} size="medium" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,

    color: '#111827',
    fontFamily: 'Bitter-Regular',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    textAlign: 'center',
  },
  amount: {
    fontSize: 20,

    color: '#615FFF',
    fontFamily: 'Bitter-Regular',
  },
  membersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 24,
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
  footer: {
    paddingVertical: 20,
  },
});
