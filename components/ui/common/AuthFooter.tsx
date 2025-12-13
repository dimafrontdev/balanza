import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

type AuthFooterProps = {
  text: string;
  linkText: string;
  onLinkPress: () => void;
};

export default function AuthFooter({ text, linkText, onLinkPress }: AuthFooterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onLinkPress}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#4A5565',
    fontSize: 14,
  },
  link: {
    color: '#6366F1',
    fontFamily: 'Bitter-SemiBold',
  },
});
