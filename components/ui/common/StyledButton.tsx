import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper/src/types';

type StyledButtonProps = {
  onPress: (e: GestureResponderEvent) => void;
  title: string;
  style?: object;
  disabled?: boolean;
  color?: keyof MD3Theme['colors'];
  loading?: boolean;
  size?: 'medium' | 'big';
  variant?: 'primary' | 'secondary';
};

export default function StyledButton({
  onPress,
  title,
  style,
  disabled,
  loading,
  color = 'primary',
  size = 'big',
  variant = 'primary',
}: StyledButtonProps) {
  const theme = useTheme();

  return (
    <Button
      mode={variant === 'primary' ? 'contained' : 'outlined'}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      style={[
        variant === 'primary' ? styles.button : styles.buttonSecondary,
        variant === 'primary' && {
          backgroundColor: theme.colors[color],
          shadowColor: theme.colors[(color + 'Shadow') as keyof MD3Theme['colors']],
        },
        style,
      ]}
      contentStyle={size === 'big' ? styles.buttonContentBig : styles.buttonContentMedium}
      labelStyle={
        variant === 'primary'
          ? size === 'big'
            ? styles.buttonLabelBig
            : styles.buttonLabelMedium
          : styles.buttonLabelSecondary
      }>
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    boxShadow: '0 10px 15px -3px #C6D2FF, 0 4px 6px -4px #C6D2FF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  buttonSecondary: {
    borderRadius: 12,
    borderColor: '#E5E7EB',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  buttonContentBig: {
    paddingVertical: 8,
  },
  buttonContentMedium: {
    paddingVertical: 6,
  },
  buttonLabelBig: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24.5,
    letterSpacing: -0.292,
  },
  buttonLabelMedium: {
    fontSize: 16,
    color: 'white',
    lineHeight: 20,
    letterSpacing: -0.292,
  },
  buttonLabelSecondary: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 20,
    letterSpacing: -0.292,
  },
});
