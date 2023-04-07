import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import { object, string } from 'yup';

import { Button, Container, InputText, Line, SocialLoginButton, TextButton } from '../../../components/index';
import { ROUTES } from '../../../navigation/Navigation';
import { loginUser } from '../../../services/users';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, SIZE } from '../../../utils/theme';

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
      // email: 'riccardo@gmail.com',
      // password: 'Dezzolo10',
      email: 'cococlub@gmail.com',
      password: 'cococlub10',
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

  return (
    <Container>
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <Container>
            <Image source={require('../../../assets/logos/BlueLogo.png')} style={styles.logo} />
            <View style={styles.container}>
              <Text style={styles.textLogin}>{t('login to your account')}</Text>
              <InputText label="Email" formik={formik} formikName="email" autoCapitalize="none" />
              <InputText label="Password" formik={formik} formikName="password" autoCapitalize="none" secureTextEntry />
              <TextButton text={t('forgot password')} textStyle={styles.forgotPassword} />
              <Button primary text={t('login')} onPress={handleSubmit} containerStyle={{ width: WIDTH_DEVICE * 0.9}} loading={loading} disabled={!values.password || (!values.email && true)} />
              <View style={styles.containerLine}>
                <Line lineStyle={{ flex: 1 }} />
                <Text style={styles.orLoginUsing}>{t('or login using')}</Text>
                <Line lineStyle={{ flex: 1 }} />
              </View>
              <View style={styles.socialLoginContainer}>
                <SocialLoginButton apple />
                <SocialLoginButton google />
              </View>
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
              <TouchableOpacity>
                <Text style={styles.privacyText}>{t('privacy and terms')}</Text>
              </TouchableOpacity>
            </View>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      {error === 401 && <FlashMessage position="top" />}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: WIDTH_DEVICE / 20,
  },

  logo: {
    alignSelf: 'center',
    marginTop: SIZE * 4,
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
});
