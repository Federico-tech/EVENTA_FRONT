import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';

import { Button, InputText, Line, TextButton, SocialLoginButton, IconButton } from '../../../../components/index';
import { loginUser } from '../../../../services/users';
import { noAuthAxios } from '../../../../utils/core/axios';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const UserSingUpScreen = ({ navigation }) => {
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
      <KeyboardAvoidingView behavior="padding">
        <ScrollView showsVerticalScrollIndicator={false}>
          <IconButton name="chevron-back-outline" onPress={() => navigation.goBack()} iconStyle={styles.arrowIcon} size={22} />
          <Text style={styles.title}> Create your account</Text>
          <InputText value={name} label="Name" onChangeText={setName} maxLength={20} />
          <InputText value={username} label="Username" onChangeText={setUsername} autoCapitalize="none" maxLength={20} />
          <InputText value={email} label="Email" onChangeText={setEmail} autoCapitalize="none" />
          <InputText value={password} label="Password" onChangeText={setPassword} hide autoCapitalize="none" />
          <Text style={styles.passwordReq}>
            The password has to contain at least: {'\n'}-8 characters{'\n'}-1 numeber{' '}
          </Text>
          <Button loading={loading} primary text="Register" onPress={onPressUserSignUp} />
          <View style={styles.containerLine}>
            <Line lineStyle={{ flex: 1 }} />
            <Text style={styles.orLoginUsing}>Or Register Using</Text>
            <Line lineStyle={{ flex: 1 }} />
          </View>
          <View style={styles.socialLoginContainer}>
            <SocialLoginButton />
            <SocialLoginButton google />
          </View>
          <TouchableOpacity>
            <TextButton text="Privacy & Terms" textStyle={styles.privacyText} />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  arrowIcon: {
    marginTop: HEIGHT_DEVICE / 70,
  },
});
