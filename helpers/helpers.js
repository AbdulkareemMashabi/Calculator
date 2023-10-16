import {Alert} from 'react-native';

export const calculatorElements = theme => {
  return [
    {
      title: 'C',
      onPress: setWriting => {
        setWriting('');
      },
      textStyle: {color: theme.clearButton},
    },
    {
      title: '()',
      onPress: (setWriting, writing) => {
        if (areParenthesesBalanced(writing)) {
          // to get the last character
          const lastCharacter = writing.slice(-1);
          if (
            lastCharacter === '+' ||
            lastCharacter === '-' ||
            lastCharacter === '*' ||
            lastCharacter === '/' ||
            !writing
          )
            setWriting(`${writing}(`);
          else setWriting(`${writing}*(`);
        } else setWriting(`${writing})`);
      },
      textStyle: {color: theme.operations},
    },
    {
      title: '%',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}%`);
      },
      textStyle: {color: theme.operations},
    },
    {
      title: '/',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}/`);
      },
      textStyle: {color: theme.operations},
    },
    {
      title: '7',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}7`);
      },
    },
    {
      title: '8',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}8`);
      },
    },
    {
      title: '9',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}9`);
      },
    },
    {
      title: '*',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}*`);
      },
      textStyle: {color: theme.operations},
    },
    {
      title: '4',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}4`);
      },
    },
    {
      title: '5',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}5`);
      },
    },
    {
      title: '6',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}6`);
      },
    },
    {
      title: '-',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}-`);
      },
      textStyle: {color: theme.operations},
    },
    {
      title: '1',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}1`);
      },
    },
    {
      title: '2',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}2`);
      },
    },
    {
      title: '3',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}3`);
      },
    },
    {
      title: '+',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}+`);
      },
      textStyle: {color: theme.operations},
    },
    {
      title: '+/-',
      onPress: (setWriting, writing) => {
        // to get the last character
        const lastCharacter = writing.slice(-1);
        if (
          lastCharacter === '+' ||
          lastCharacter === '-' ||
          lastCharacter === '*' ||
          lastCharacter === '/'
        )
          setWriting(`${writing}(-`);
        else if (!['+', '-', '*', '/'].includes(writing))
          setWriting(`(-${writing}`);
        // writing.slice(0, -1) to get the string without the last character
        else setWriting(`${writing.slice(0, -1)}(-${lastCharacter}`);
      },
    },
    {
      title: '0',
      onPress: (setWriting, writing) => {
        setWriting(`${writing}0`);
      },
    },
    {
      title: '.',
      onPress: (setWriting, writing) => {
        // to get the last character
        const lastCharacter = writing.slice(-1);
        if (
          lastCharacter === '+' ||
          lastCharacter === '-' ||
          lastCharacter === '*' ||
          lastCharacter === '/' ||
          !writing
        )
          setWriting(`${writing}0.`);
        else setWriting(`${writing}.`);
      },
    },
    {
      title: '=',
      onPress: (setWriting, writing) => {
        let finalResult = writing;
        if (!areParenthesesBalanced(writing)) finalResult = `${writing})`;
        try {
          setWriting(`${eval(finalResult)}`);
        } catch (e) {
          Alert.alert(e.message);
        }
      },
      textStyle: {color: theme.equalSymbol},
      buttonStyle: {backgroundColor: theme.equalButton},
    },
  ];
};

const areParenthesesBalanced = str => {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      stack.push(str[i]);
    } else if (str[i] === ')') {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
};
