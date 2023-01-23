import { useFormik } from 'formik';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { object, string } from 'yup';
import i18n from '../../../../utils/locales/i18n';

import { Button, InputText, Line, TextButton, SocialLoginButton, IconButton, Container } from '../../../../components/index';
import { organiserSignUp, loginUser } from '../../../../services/users';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const UserSingUpScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const { values, errors, validateForm, setFieldValue, setFieldError, touched, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      name: '',
    },
    validationSchema: object().shape({
      name: string().required('Name is a required field'),
      username: string()
        .required('Username is a required field')
        .min(6, 'Username must be at least 6 characters')
        .max(20, "Username can't be more than 20 characters")
        .test('no-uppercase', 'The username cannot contain capital letters', (value) => !value.match(/[A-Z]/)),
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
        await organiserSignUp(data);
        await loginUser(data.email, data.password);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log({ error: e.response.data });
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
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView showsVerticalScrollIndicator={false}>
            <IconButton name="chevron-back-outline" onPress={() => navigation.goBack()} iconStyle={styles.arrowIcon} size={22} />
            <Text style={styles.title}>{i18n.t('create your account')}</Text>
            <InputText formik={formik} label={i18n.t('name')} formikName="name" maxLength={20} />
            <InputText formik={formik} label="Username" formikName="username" autoCapitalize="none" maxLength={20} />
            <InputText formik={formik} label="Email" formikName="email" autoCapitalize="none" />
            <InputText formik={formik} label="Password" formikName="password" hide autoCapitalize="none" />
            <Text style={styles.passwordReq}>
              {i18n.t('password requirements')}
            </Text>
            <Button loading={loading} primary text={i18n.t('register')} onPress={handleSubmit} />
            <View style={styles.containerLine}>
              <Line lineStyle={{ flex: 1 }} />
              <Text style={styles.orLoginUsing}>{i18n.t('or register using')}</Text>
              <Line lineStyle={{ flex: 1 }} />
            </View>
            <View style={styles.socialLoginContainer}>
              <SocialLoginButton apple />
              <SocialLoginButton google />
            </View>
            <TextButton text={i18n.t('privacy and terms')} textStyle={styles.privacyText} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Container>
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
    marginTop: HEIGHT_DEVICE / 12,
  },
  arrowIcon: {
    marginTop: HEIGHT_DEVICE / 70,
    position: 'absolute',
  },
});
