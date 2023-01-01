import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';

import { Button, InputText, Line, TextButton, SocialLoginButton, IconButton } from '../../../../components/index';
import { loginUser } from '../../../../store/user';
import { ROLES } from '../../../../utils/conts';
import { noAuthAxios } from '../../../../utils/core/axios';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const OrganiserSignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('Coco');
  const [email, setEmail] = useState('Coco@gmail.com');
  const [adress, setAdress] = useState('Via Coco');
  const [password, setPassword] = useState('Coco');
  const [loading, setLoading] = useState(false);

  const OnPressOrganiserSignUp = async () => {
    try {
      setLoading(true);
      await noAuthAxios.post('/auth/register', {
        username,
        email,
        adress,
        password,
        role: ROLES.ORGANIZER,
        name: 'b',
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
          <Text style={styles.title}>Become an organiser!</Text>
          <InputText value={username} setValue={setUsername} label="Username" autoCapitalize="none" />
          <InputText value={email} onChangeText={setEmail} label="Email" autoCapitalize="none" />
          <InputText value={adress} onChangeText={setAdress} label="Adress" />
          <InputText value={password} onChangeText={setPassword} label="Password" hide autoCapitalize="none" />
          <Text style={styles.passwordReq}>
            The password has to contain at least: {'\n'}-8 characters{'\n'}-1 number{' '}
          </Text>
          <Button loading={loading} primary text="Register" onPress={OnPressOrganiserSignUp} />
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
