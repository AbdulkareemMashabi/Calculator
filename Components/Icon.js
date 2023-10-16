import {Image, StyleSheet, TouchableOpacity, Vibration} from 'react-native';

export const Icon = ({path, onPress, theme, style}) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        onPress();
        Vibration.vibrate(10);
      }}>
      <Image source={path} style={{...styles.icon, tintColor: theme.icon}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default Icon;
