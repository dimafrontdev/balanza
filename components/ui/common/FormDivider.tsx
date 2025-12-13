import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function FormDivider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>or</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  text: {
    marginHorizontal: 12,
    color: '#9CA3AF',
    fontSize: 12,
  },
});
