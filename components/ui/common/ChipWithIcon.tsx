import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ReactNode } from 'react';

type ChipWithIconProps = {
  text: string;
  icon: ReactNode;
  style?: object;
  textStyle?: object;
};

export default function ChipWithIcon({ text, icon, style, textStyle }: ChipWithIconProps) {
  return (
    <View style={[styles.chip, style]}>
      <View>{icon}</View>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
    gap: 8,
  },
  text: {
    fontSize: 12,
  },
});
