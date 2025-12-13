import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { ReactNode } from 'react';

type FormFieldProps = {
  children: ReactNode;
  error?: string;
};

export default function FormField({ children, error }: FormFieldProps) {
  return (
    <View>
      {children}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});
