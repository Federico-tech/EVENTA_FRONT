import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button, InputText, Line, TextButton } from '../../../../components';
import { loginUser, setUserInfo } from '../../../../store/user';
import {
  COLORS,
  FONTS,
  HEIGHT_DEVICE,
  SIZES,
  WIDTH_DEVICE,
} from '../../../../utils/constants/Theme';
import { noAuthAxios } from '../../../../utils/core/axios';

export const UserSingUpScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onPressUserSignUp = async () => {
    try {
      setLoading(true);
      await noAuthAxios.post('/auth/register', {
        name,
        username,
        email,
        password,
      });
      await loginUser(email, password);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error({ e });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Create your account</Text>
      <InputText value={name} label="Name" onChangeText={setName} />
      <InputText value={username} label="Username" onChangeText={setUsername} />
      <InputText value={email} label="Email" onChangeText={setEmail} />
      <InputText value={password} label="Password" onChangeText={setPassword} />
      <Text style={styles.passwordReq}>
        The password has to contain at least: {'\n'}-8 characters{'\n'}-1 numeber{' '}
      </Text>
      <Button loading={loading} text="Register" onPress={onPressUserSignUp} />
      <View style={styles.containerLine}>
        <Line />
        <Text style={styles.orLoginUsing}>Or Register Using</Text>
        <Line />
      </View>
      <View style={styles.socialLoginContainer} />
      <TouchableOpacity>
        <TextButton text="Privacy & Terms" textStyle={styles.privacyText} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.xl,
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 70,
    marginBottom: HEIGHT_DEVICE / 40,
  },

  textInput: {
    height: HEIGHT_DEVICE / 16,
    marginTop: HEIGHT_DEVICE / 100,
    borderRadius: SIZES.md,
    borderWidth: 0.5,
    borderColor: COLORS.lightGray,
    paddingHorizontal: WIDTH_DEVICE / 20,
  },

  emailText: {
    marginTop: HEIGHT_DEVICE / 100,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
  },

  passwordReq: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    marginTop: HEIGHT_DEVICE / 80,
  },

  orLoginUsing: {
    alignSelf: 'center',
    alignItems: 'center',
    color: COLORS.darkGray,
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
    marginHorizontal: WIDTH_DEVICE / 20,
  },

  containerLine: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HEIGHT_DEVICE / 40,
  },

  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: HEIGHT_DEVICE / 40,
  },

  privacyText: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: SIZES.md,
    textAlign: 'center',
    marginTop: HEIGHT_DEVICE / 8,
  },
});
