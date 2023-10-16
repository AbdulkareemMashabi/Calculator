import {StyleSheet, Text, TouchableOpacity, Vibration} from 'react-native';

export const Button = ({title, onPress, buttonStyle, textStyle, theme}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        Vibration.vibrate(10);
      }}
      style={{
        ...styles.button,
        backgroundColor: theme.button,
        ...buttonStyle,
      }}>
      <Text style={{...styles.title, color: theme.text, ...textStyle}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Button;
