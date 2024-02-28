import {StyleSheet, Text, TextInput, View, TextInputProps, Pressable} from 'react-native';
import {
  type Control,
  type FieldValues,
  type FieldPath,
  Controller,
} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';

interface InputProps<TFieldValues extends FieldValues> extends TextInputProps {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
}

export const Input = <TFieldValues extends FieldValues,>({control, name, secureTextEntry, ...props}: InputProps<TFieldValues>) => {
    const [show, setShow] = useState(false)
  
    return (
    <View style={styles.inputContainer} >
      <Controller
        control={control}
        name={name}
        render={({field: {value, onChange}}) => {
          return (
            <TextInput
              value={value}
              onChangeText={text => onChange(text)}
              style={[styles.input, styles.securedInput, props.style]}
              secureTextEntry={!show}
              {...props}
            />
          );
        }}
      />
      {
        secureTextEntry && (
            <Pressable onPress={() => setShow(!show)} style={styles.iconBtn} >
                <Icon name={show ? 'eye' : 'eye-slash'} size={19} />
            </Pressable>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        position: "relative"
    },
    input: {
        borderWidth: 2,
        borderColor: "#192A56",
        padding: 10,
        borderRadius: 6,
        fontSize: 17,
        color: "#192A56"
    },
    securedInput: {
        paddingRight: 30
    },
    iconBtn: {
        position: "absolute",
        right: 6,
        top: "48%",
    }
});
