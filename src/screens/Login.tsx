import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {FormInput} from '../components/input';
import { SubmitHandler, useForm} from 'react-hook-form';
import {FormLabel} from '../components/label';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackRoute} from '../routes/AuthStack';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserLogin, userLoginSchema } from '../schema/user';
import { FormError } from '../components/error';
import { useAppwriteService } from '../appwrite/provider';
import Snackbar from 'react-native-snackbar';

type LoginProps = NativeStackScreenProps<AuthStackRoute, 'Login'>;

export const Login = ({navigation}: LoginProps) => {
  const {control, formState: { errors }, handleSubmit} = useForm<UserLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(userLoginSchema)
  });

  const { appwrite, updateUserLoggedInStatus } = useAppwriteService()

  const onLoginHandler: SubmitHandler<UserLogin> = async(data) => {
    const user = await appwrite.login(data)
    if(user) {
      updateUserLoggedInStatus(true)
      Snackbar.show({
        text: "Login successfull",
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.innerContainer} >
      <FormLabel>Email*</FormLabel>
      <FormInput
        control={control}
        name="email"
        placeholder="johdoe@example.com"
        placeholderTextColor="#30336B"
        keyboardType='email-address'
      />
      <FormError error={errors?.email?.message} />
      <FormLabel>Password*</FormLabel>
      <FormInput
        control={control}
        name="password"
        placeholder="********"
        placeholderTextColor="#30336B"
        secureTextEntry
      />
      <FormError error={errors?.password?.message} />
      <Pressable style={styles.loginBtn} onPress={handleSubmit(onLoginHandler)} >
        <Text style={styles.loginBtnText}>Login</Text>
      </Pressable>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.signupText, {fontWeight: '600'}]}>Sign up</Text>
        </Pressable>
      </View>
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
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    gap: 10
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
