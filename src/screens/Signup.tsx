import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FormLabel} from '../components/label';
import {FormInput} from '../components/input';
import {SubmitHandler, useForm} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackRoute} from '../routes/AuthStack';
import {UserSignup, userSignupSchema} from '../schema/user';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormError} from '../components/error';
import {useAppwriteService} from '../appwrite/provider';
import Snackbar from 'react-native-snackbar';

type SignupProps = NativeStackScreenProps<AuthStackRoute, 'Signup'>;

export const Signup = ({navigation}: SignupProps) => {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<UserSignup>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(userSignupSchema),
  });
  const [loading, setLoading] = useState(false);

  const {appwrite, updateUserLoggedInStatus} = useAppwriteService();

  const onSignupHandler: SubmitHandler<UserSignup> = async data => {
    const {name, email, password} = data;
    setLoading(true);
    const user = await appwrite.createUser({name, email, password});
    if (user) {
      updateUserLoggedInStatus(true);
      Snackbar.show({
        text: 'Signup Successfull',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <FormLabel>Name*</FormLabel>
      <FormInput
        control={control}
        name="name"
        placeholder="Joh Doe"
        placeholderTextColor="#30336B"
      />
      <FormError error={errors?.name?.message} />
      <FormLabel>Email*</FormLabel>
      <FormInput
        control={control}
        name="email"
        placeholder="johdoe@example.com"
        placeholderTextColor="#30336B"
        keyboardType="email-address"
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
      <FormLabel>Confirm Password*</FormLabel>
      <FormInput
        control={control}
        name="confirmPassword"
        placeholder="********"
        placeholderTextColor="#30336B"
        secureTextEntry
      />
      <FormError error={errors?.confirmPassword?.message} />
      <Pressable
        style={styles.signupBtn}
        disabled={loading}
        aria-disabled={loading}
        onPress={handleSubmit(onSignupHandler)}>
        {loading ? (
          <ActivityIndicator color="#fff" size={23} />
        ) : (
          <Text style={styles.signupBtnText}>Sign up</Text>
        )}
      </Pressable>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.loginText, styles.boldLoginText]}>Login</Text>
        </Pressable>
      </View>
    </View>
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
  signupBtn: {
    width: '100%',
    paddingVertical: 15,
    textAlign: 'center',
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 6,
  },
  signupBtnText: {
    color: '#fff',
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 17,
    lineHeight: 21,
    color: '#47535E',
  },
  boldLoginText: {fontWeight: '600'},
});
