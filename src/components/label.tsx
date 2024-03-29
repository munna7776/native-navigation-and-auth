import {StyleSheet, Text} from 'react-native';
import {ComponentProps} from 'react';

type LabelProps = ComponentProps<typeof Text>;

export const FormLabel = ({children, style, ...props}: LabelProps) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 19,
    lineHeight: 23,
    color: '#192A56',
  },
});
