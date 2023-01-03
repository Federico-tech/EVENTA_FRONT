import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { BlueLogo } from '../../../assets';
import { Button, InputText, Line, SocialLoginButton, TextButton } from '../../../components/index';
import { ROUTES } from '../../../navigation/Navigation';
import { loginUser } from '../../../store/user';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // const [email, setEmail] = useState('cococlubing@gmail.com');
  // const [password, setPassword] = useState('Cococlub20');
  const [email, setEmail] = useState('riccardocarizzoni@gmail.com');
  const [password, setPassword] = useState('Dezzolo10');

  const onPressLogin = async () => {
    try {
      setLoading(true);
      await loginUser(email, password);
      setLoading(false);
    } catch (e) {
      console.log({ e });
      setLoading(false);
    }
  };

  const onPressUserRegister = () => {
    navigation.navigate(ROUTES.UserSingUpScreen);
  };

  return (
    <ScrollView>
      <View>
        <Image source={require('../../../assets/logos/BlueLogo.png')} style={styles.logo} />
        <View style={styles.container}>
          <Text style={styles.textLogin}>Login to your account</Text>
          <InputText label="Email" value={email} setValue={setEmail} autoCapitalize="none" />
          <InputText label="Password" value={password} setValue={setPassword} autoCapitalize="none" hide />
          <TextButton text="Forgot Password?" textStyle={styles.forgotPassword} />
          <Button primary text="Login" onPress={onPressLogin} loading={loading} disabled={!password || (!email && true)} />
          <View style={styles.containerLine}>
            <Line lineStyle={{ flex: 1 }} />
            <Text style={styles.orLoginUsing}>Or Login Using</Text>
            <Line lineStyle={{ flex: 1 }} />
          </View>
          <View style={styles.socialLoginContainer}>
            <SocialLoginButton />
            <SocialLoginButton google />
          </View>
          <View style={styles.registerContainer}>
            <View style={styles.registerTextContainer}>
              <Text style={styles.registerText}>You don't have an account?</Text>
              <TouchableOpacity onPress={onPressUserRegister}>
                <Text style={styles.registerButtonText}> Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.registerTextContainer}>
              <Text style={styles.registerText}>Do you want to become an organiser? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('OrganiserSignUpScreen')}>
                <Text style={styles.registerButtonText}> Click here</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.privacyText}> Privacy & Terms </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: WIDTH_DEVICE / 20,
  },

  logo: {
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 18,
  },

  textLogin: {
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 35,
    fontFamily: 'InterMedium',
    fontSize: SIZES.md,
  },

  textInput: {
    height: HEIGHT_DEVICE / 16,
    marginTop: HEIGHT_DEVICE / 140,
    borderRadius: SIZES.md,
    borderWidth: 0.5,
    borderColor: COLORS.lightGray,
    paddingHorizontal: WIDTH_DEVICE / 20,
  },
  emailText: {
    marginTop: HEIGHT_DEVICE / 100,
    fontFamily: 'InterSemiBold',
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: HEIGHT_DEVICE / 50,
    fontFamily: 'InterRegular',
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },
  orLoginUsing: {
    alignSelf: 'center',
    alignItems: 'center',
    color: COLORS.darkGray,
    fontFamily: 'InterRegular',
    fontSize: 12,
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

  appleLogo: {
    width: WIDTH_DEVICE / 20,
    height: HEIGHT_DEVICE / 20,
  },

  registerContainer: {
    marginTop: HEIGHT_DEVICE / 40,
  },

  registerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: HEIGHT_DEVICE / 80,
  },

  registerText: {
    fontFamily: 'InterRegular',
    fontSize: SIZES.sm,
  },

  registerButtonText: {
    fontFamily: 'InterMedium',
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },

  privacyText: {
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 30,
    fontFamily: 'InterMedium',
    color: COLORS.primary,
    fontSize: SIZES.md,
  },
  error401: {
    color: 'red',
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
  },
});
