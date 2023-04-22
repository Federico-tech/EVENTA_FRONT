import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { object, string } from 'yup';

import { Button, InputText, Line, TextButton, SocialLoginButton, IconButton, Container, Row } from '../../../../components/index';
import { organiserSignUp, loginUser, userUpdate } from '../../../../services/users';
import { ROLES } from '../../../../utils/conts';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, SIZE } from '../../../../utils/theme';
import { registerForPushNotificationsAsync } from '../../../../utils/notifications';
import { ROUTES } from '../../../../navigation/Navigation';

export const UserSingUpScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { t } = useTranslation();

  const registerPushNotifications = async () => {
    const token = await registerForPushNotificationsAsync();
    console.log('Token', token)
    if (token) {
      userUpdate({ expoPushToken: token })
        .then((res) => console.debug({ res }))
        .catch((error) => console.debug({ errorUpdateUser: error }));
    }
  };

  const { values, errors, validateForm, setFieldValue, setFieldError, touched, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      name: '',
      role: ROLES.USER,
    },
    validationSchema: object().shape({
      username: string()
        .required('Username is a required field')
        .min(6, 'Username must be at least 6 characters')
        .max(20, "Username can't be more than 20 characters")
        .test('no-uppercase', 'The username cannot contain capital letters', (value) => {
          if (!value) {
            return false;
          }
          return !value.match(/[A-Z]/);
        })
        .test('no-spaces', 'The username cannot contain blank spaces', (value) => {
          if (!value) {
            return false;
          }
          return !value.match(/\s/);
        }),
      email: string().required('Email is a required field').email('This is not a valid email'),
      password: string()
        .required('Password is a required field')
        .matches(/^(?=.*\d)[a-zA-Z\d]{8,}$/, 'This is not a valid password'),
      name: string().required('Name is a required field'),
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
        await organiserSignUp(data);
        await registerPushNotifications();
        await loginUser(data.email, data.password);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e.response.request.status);
        showMessage({
          message: 'SignUp Failed',
          description: 'This username has already been used',
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
        <View style={styles.container}>
          <Row>
            <View style={{ position: 'absolute', left: 0 }}>
              <IconButton name="chevron-back-outline" onPress={() => navigation.goBack()} iconStyle={styles.arrowIcon} size={SIZE * 2} />
            </View>
            <Text style={styles.title}>{t('create your account')}</Text>
          </Row>
          <InputText formik={formik} label={t('name')} formikName="name" maxLength={25} />
          <InputText formik={formik} label="Username" formikName="username" autoCapitalize="none" maxLength={20} noAutoCorrect />
          <InputText formik={formik} label="Email" formikName="email" autoCapitalize="none" />
          <InputText formik={formik} label="Password" formikName="password" hide autoCapitalize="none" secureTextEntry />
          <Text style={styles.passwordReq}>{t('password requirements')}</Text>
          <Button loading={loading} primary containerStyle={{ width: WIDTH_DEVICE * 0.9 }} text={t('register')} onPress={handleSubmit} />
          <View style={styles.containerLine}>
            <Line lineStyle={{ flex: 1 }} />
            <Text style={styles.orLoginUsing}>{t('or register using')}</Text>
            <Line lineStyle={{ flex: 1 }} />
          </View>
          <View style={styles.socialLoginContainer}>
            <SocialLoginButton apple />
            <SocialLoginButton google />
          </View>
          <TextButton text={t('privacy and terms')} textStyle={styles.privacyText} onPress={onPressPrivacyPolicy} />
        </View>
      </KeyboardAwareScrollView>
      {error === 409 && <FlashMessage position="top" />}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 3,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.xl,
    alignSelf: 'center',
    marginTop: SIZE / 2,
    marginBottom: SIZE,
  },

  passwordReq: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.xs,
    color: COLORS.darkGray,
    marginTop: SIZE,
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
    marginTop: SIZE * 2,
  },

  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZE * 2,
  },

  privacyText: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: SIZES.sm,
    textAlign: 'center',
    marginTop: HEIGHT_DEVICE / 12,
  },
  arrowIcon: {
    marginTop: SIZE / 2,
  },
});
