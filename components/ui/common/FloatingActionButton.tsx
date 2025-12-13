import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { ReactNode } from 'react';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: ReactNode;
}

const FloatingActionButton = ({ onPress, icon }: FloatingActionButtonProps) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
      {icon ?? <Text style={styles.fabIcon}>+</Text>}
    </TouchableOpacity>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#615FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(99, 102, 241, 0.50)',
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});
