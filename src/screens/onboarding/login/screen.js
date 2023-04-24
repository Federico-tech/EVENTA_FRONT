import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { object, string } from 'yup';

import { Button, Container, InputText, Row, TextButton } from '../../../components/index';
import { ROUTES } from '../../../navigation/Navigation';
import { loginUser } from '../../../services/users';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, SIZE, SHADOWS } from '../../../utils/theme';

export const SocilaLoginButtons = () => {
  return (
    <View style={styles.containerAppleSocialLogin}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
        cornerRadius={SIZES.xxs}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
            });
            // signed in
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
    </View>
  );
};

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
      <KeyboardAwareScrollView>
        <Container>
          <Image source={require('../../../assets/logos/BlueLogo.png')} style={styles.logo} />
          <View style={styles.container}>
            <Text style={styles.textLogin} />
            <InputText label="Email" formik={formik} formikName="email" autoCapitalize="none" />
            <InputText label="Password" formik={formik} formikName="password" autoCapitalize="none" secureTextEntry />
            <TextButton text="Forgot password?" textStyle={styles.forgotPassword} />
            <Button
              primary
              text="Login"
              onPress={handleSubmit}
              containerStyle={{ width: WIDTH_DEVICE * 0.9 }}
              loading={loading}
              disabled={!values.password || (!values.email && true)}
              disabledStyle={!values.password || (!values.email && true)}
            />
            <View style={styles.containerLine}>
              <Row style={styles.line} />
              <Text style={styles.orLoginUsing}>or</Text>
              <Row style={styles.line} />
            </View>
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
    marginTop: SIZE * 2,
  },

  logo: {
    alignSelf: 'center',
    marginTop: SIZE * 9,
  },

  textLogin: {
    alignSelf: 'center',
    marginTop: SIZE / 2,
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
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
