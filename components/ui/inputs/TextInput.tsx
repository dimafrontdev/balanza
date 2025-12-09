import { ReactNode, useState, forwardRef } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { TextInput as TextInputRNP } from 'react-native-paper';

type TextInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  startIcon?: ReactNode;
  secureTextEntry?: boolean;
  style?: object;
  autoFocus?: boolean;
  size?: 'medium' | 'big';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
};

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      placeholder,
      value,
      onChangeText,
      keyboardType = 'default',
      autoCapitalize = 'none',
      secureTextEntry = false,
      startIcon,
      style,
      autoFocus = false,
      size = 'big',
      returnKeyType = 'done',
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <TextInputRNP
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        style={[size === 'big' ? styles.input : styles.inputMedium, style]}
        contentStyle={startIcon ? styles.content : null}
        outlineStyle={styles.outline}
        mode="outlined"
        activeOutlineColor="black"
        placeholderTextColor="#6A7282"
        returnKeyType={returnKeyType}
        right={
          secureTextEntry && (
            <TextInputRNP.Icon
              onPress={togglePasswordVisibility}
              icon={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              color="#99A1AF"
            />
          )
        }
        left={
          startIcon ? <TextInputRNP.Icon icon={() => startIcon} rippleColor="transparent" /> : null
        }
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F3F4F6',
    fontSize: 12,
  },
  inputMedium: {
    backgroundColor: '#F3F4F6',
    fontSize: 14,
    height: 48,
  },
  content: {
    marginLeft: 46,
  },
  outline: {
    borderRadius: 12,
    borderWidth: 0,
  },
});
