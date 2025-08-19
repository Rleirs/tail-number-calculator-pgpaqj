
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function Button({ text, onPress, style, textStyle, disabled = false }: ButtonProps) {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    disabled: {
      backgroundColor: theme.grey,
      opacity: 0.6,
    },
    disabledText: {
      color: theme.textSecondary,
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.buttonText,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
