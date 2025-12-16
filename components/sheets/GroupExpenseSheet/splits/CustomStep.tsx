import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import StyledButton from '@/components/ui/common/StyledButton';
import { GroupMember } from '../index';

interface CustomStepProps {
  members: GroupMember[];
  totalAmount: number;
  onConfirm: (splits: GroupMember[]) => void;
}

export default function CustomStep({ members, totalAmount, onConfirm }: CustomStepProps) {
  const [selectedMembers, setSelectedMembers] = useState<GroupMember[]>(
    members.map(m => ({ ...m, selected: true })),
  );

  const toggleMember = (id: string) => {
    setSelectedMembers(prev => prev.map(m => (m.id === id ? { ...m, selected: !m.selected } : m)));
  };

  const handleConfirm = () => {
    const selected = selectedMembers.filter(m => m.selected);
    const perPerson = totalAmount / (selected.length + 1);

    const splits = selected.map(member => ({
      ...member,
      amount: perPerson.toFixed(2),
    }));
    onConfirm(splits);
  };

  const selectedCount = selectedMembers.filter(m => m.selected).length;
  const perPerson = totalAmount / (selectedCount + 1);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Select people to split with</Text>
        <Text style={styles.subtitle}>
          {selectedCount + 1} people • ${perPerson.toFixed(2)} each
        </Text>

        <View style={styles.membersList}>
          {selectedMembers.map(member => (
            <TouchableOpacity
              key={member.id}
              style={[styles.memberItem, member.selected && styles.memberItemSelected]}
              onPress={() => toggleMember(member.id)}>
              <View style={styles.memberInfo}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>{member.name.charAt(0)}</Text>
                </View>
                <Text style={styles.memberName}>{member.name}</Text>
              </View>
              <View style={[styles.checkbox, member.selected && styles.checkboxSelected]}>
                {member.selected && <Ionicons name="checkmark" size={18} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <StyledButton
          title="Confirm Split"
          onPress={handleConfirm}
          size="medium"
          disabled={selectedCount === 0}
        />
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
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Bitter-Regular',
    marginBottom: 20,
  },
  membersList: {
    gap: 12,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
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
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#615FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Bitter-Regular',
  },
  memberName: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Bitter-Regular',
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
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
  footer: {
    paddingVertical: 20,
  },
});
