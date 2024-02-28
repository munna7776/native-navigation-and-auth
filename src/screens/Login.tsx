import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Input} from '../components/input';
import {useForm} from 'react-hook-form';
import {Label} from '../components/label';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackRoute} from '../routes/AuthStack';

type LoginProps = NativeStackScreenProps<AuthStackRoute, 'Login'>;

export const Login = ({navigation}: LoginProps) => {
  const {control} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Label>Email*</Label>
      <Input
        control={control}
        name="email"
        placeholder="johdoe@example.com"
        placeholderTextColor="#30336B"
      />
      <Label>Password*</Label>
      <Input
        control={control}
        name="password"
        placeholder="********"
        placeholderTextColor="#30336B"
      />
      <Pressable style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>Login</Text>
      </Pressable>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.signupText, {fontWeight: '600'}]}>Sign up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    rowGap: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  loginBtn: {
    width: '100%',
    paddingVertical: 15,
    textAlign: 'center',
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 6,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    justifyContent: 'center',
  },
  signupText: {fontSize: 17, lineHeight: 21, color: '#47535E'},
});
