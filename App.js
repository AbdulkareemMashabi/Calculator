import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  NativeModules,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import Button from './Components/Button';
import {calculatorElements} from './helpers/helpers';
import Icon from './Components/Icon';
import {darkThemes, lightThemes} from './helpers/Themes';

export const APP = () => {
  const [writing, setWriting] = useState('');
  const [appLanguage, setAppLanguage] = useState('ar');

  const colorScheme = useColorScheme();
  const {height} = useWindowDimensions();

  const theme = colorScheme === 'light' ? lightThemes : darkThemes;

  useEffect(() => {
    const deviceLanguage = Platform.select({
      ios: () => {
        const sharedI18nUtilInstance = NativeModules.RCTI18nUtil;
        return sharedI18nUtilInstance.localeIdentifier;
      },
      android: () => {
        return NativeModules.I18nManager.localeIdentifier;
      },
    })();
    setAppLanguage(deviceLanguage);
  }, []);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.container,
      }}>
      <Text
        style={{
          ...styles.text,
          color: theme.text,
          textAlign: appLanguage.startsWith('ar') ? 'left' : 'right',
        }}>
        {writing}
      </Text>
      <Icon
        path={require('./assets/backSpace.png')}
        theme={theme}
        style={{
          ...styles.deleteIcon,
          alignSelf: appLanguage.startsWith('ar') ? 'flex-start' : 'flex-end',
        }}
        onPress={() => {
          // to delete the last character
          setWriting(writing.slice(0, -1));
        }}
      />
      <View>
        <FlatList
          data={calculatorElements(theme)}
          contentContainerStyle={{
            transform: [{scaleX: appLanguage.startsWith('ar') ? -1 : 1}],
          }}
          numColumns={4}
          scrollEnabled={false}
          renderItem={({item}) => {
            return (
              <Button
                theme={theme}
                textStyle={item?.textStyle}
                buttonStyle={{
                  ...item?.buttonStyle,
                  transform: [{scaleX: appLanguage.startsWith('ar') ? -1 : 1}],
                  height: height * 0.1,
                }}
                title={item.title}
                onPress={() => {
                  item.onPress(setWriting, writing);
                }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  container: {
    flex: 1,
    padding: 5,
  },
  deleteIcon: {
    marginTop: 5,
  },
});

export default APP;
