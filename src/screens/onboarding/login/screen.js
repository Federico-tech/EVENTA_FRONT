import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { object, string } from 'yup';

import { BlueGradientLogo } from '../../../assets';
import { Button, Container, InputText, Row, SocialLoginButton, TextButton } from '../../../components/index';
import { ROUTES } from '../../../navigation/Navigation';
import { loginUser } from '../../../services/users';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, SIZE, SHADOWS } from '../../../utils/theme';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [error, setError] = useState();

  const onPressLogin = async (email, password) => {
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

  const { values, errors, validateForm, setFieldValue, setFieldError, touched, handleSubmit } = useFormik({
    initialValues: {
      email: 'riccardo@gmail.com',
      password: 'Dezzolo10',
      // email: 'cococlub@gmail.com',
      // password: 'cococlub10',
    },
    validationSchema: object().shape({
      email: string().required('Email is a required field').email('This is not a valid email'),
      password: string()
        .required('Password is a required field')
        .matches(/^(?=.*\d)[a-zA-Z\d]{8,}$/, 'This is not a valid password'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (data) => {
      try {
        setLoading(true);
        await validateForm(data);
        console.log(data);
        await onPressLogin(data.email, data.password);
        await loginUser(data.email, data.password);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e.response.request.status);
        showMessage({
          message: 'Login failed',
          description: 'Wrong Username or passsword',
          type: 'danger',
        });
      }
    },
  });

  const onChangeText = (formikName, newValue) => {
    setFieldValue(formikName, newValue);
    setFieldError(formikName, '');
  };

  const formik = {
    values,
    errors,
    touched,
    onChangeText,
  };

  const onPressPrivacyPolicy = () => {
    navigation.navigate(ROUTES.PrivacyPolicyScreen);
  };

  return (
    <Container>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Image source={BlueGradientLogo} style={styles.logo} />
          <View style={styles.container}>
            <InputText label="Email" formik={formik} formikName="email" autoCapitalize="none" />
            <InputText label="Password" formik={formik} formikName="password" autoCapitalize="none" secureTextEntry />
            <TextButton text="Forgot password?" textStyle={styles.forgotPassword} />
            <Button
              primary
              text="Login"
              onPress={handleSubmit}
              containerStyle={{ width: WIDTH_DEVICE * 0.9, height: HEIGHT_DEVICE / 15, marginBottom: SIZE / 1.5 }}
              loading={loading}
              disabled={!values.password || (!values.email && true)}
              disabledStyle={!values.password || (!values.email && true)}
            />
            <View style={styles.containerLine}>
              <Row style={styles.line} />
              <Text style={styles.orLoginUsing}>or</Text>
              <Row style={styles.line} />
            </View>
            <SocialLoginButton apple google />
            <View style={styles.socialLoginContainer} />
            <View style={styles.registerContainer}>
              <View style={styles.registerTextContainer}>
                <Text style={styles.registerText}>{t(`you don't have an account`)}</Text>
                <TouchableOpacity onPress={onPressUserRegister}>
                  <Text style={styles.registerButtonText}> Sign Up</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.registerTextContainer}>
                <Text style={styles.registerText}>{t('become an organiser')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('OrganiserSignUpScreen')}>
                  <Text style={styles.registerButtonText}> {t('click here')}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={onPressPrivacyPolicy}>
              <Text style={styles.privacyText}>{t('privacy and terms')}</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </KeyboardAwareScrollView>
      {error === 401 && <FlashMessage position="top" />}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: -SIZE,
  },

  logo: {
    alignSelf: 'center',
    marginTop: SIZE * 5,
    width: SIZE * 20,
    height: SIZE * 20,
  },
  emailText: {
    marginTop: HEIGHT_DEVICE / 100,
    fontFamily: 'InterSemiBold',
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: SIZE,
    fontFamily: FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.primary,
  },
  orLoginUsing: {
    alignSelf: 'center',
    alignItems: 'center',
    color: COLORS.darkGray,
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  containerLine: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZE * 1.5,
  },

  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  appleLogo: {
    width: WIDTH_DEVICE / 20,
    height: HEIGHT_DEVICE / 20,
  },

  registerContainer: {
    marginTop: SIZE * 1.5,
  },

  registerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: HEIGHT_DEVICE / 80,
  },

  registerText: {
    fontFamily: 'InterRegular',
    fontSize: SIZES.xs,
  },

  registerButtonText: {
    fontFamily: 'InterMedium',
    fontSize: SIZES.xs,
    color: COLORS.primary,
  },

  privacyText: {
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 30,
    fontFamily: 'InterMedium',
    color: COLORS.primary,
    fontSize: SIZES.sm,
  },
  error401: {
    color: 'red',
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
    position: 'absolute',
    marginTop: SIZE,
  },
  containerAppleSocialLogin: {
    width: SIZE * 10,
    height: SIZE * 5,
  },
  button: {
    width: WIDTH_DEVICE / 2.3,
    height: HEIGHT_DEVICE / 15,
    ...SHADOWS.medium,
  },
  line: {
    backgroundColor: COLORS.lightGray,
    height: 0.5,
    flex: 1,
  },
});
