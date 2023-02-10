import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { object, string } from 'yup';

import { Button, InputText, Line, TextButton, SocialLoginButton, IconButton, Container } from '../../../../components/index';
import { ROUTES } from '../../../../navigation/Navigation';
import { loginUser, organiserSignUp } from '../../../../services/users';
import { ROLES } from '../../../../utils/conts';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, SIZE } from '../../../../utils/theme';

export const OrganiserSignUpScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { values, errors, validateForm, setFieldValue, setFieldError, touched, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      email: '',
      address: '',
      password: '',
      role: ROLES.ORGANISER,
      name: '',
    },
    validationSchema: object().shape({
      name: string().required('Name is a required field'),
      username: string()
        .required('Username is a required field')
        .min(6, 'Username must be at least 6 characters')
        .max(20, "Username can't be more than 20 characters")
        .test('no-uppercase', 'The username cannot contain capital letters', (value) => {
          if (!value) {
            return false;
          }
          return !value.match(/[A-Z]/);
        }),
      email: string().required().email('This is not a valid email'),
      address: string().required('Address is a required field'),
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

  useEffect(() => {
    const { addressInfo } = route.params || {};
    console.debug({ addressInfo });
    if (addressInfo) {
      onChangeText('address', addressInfo.formatted_address);
      onChangeText('position', {
        type: 'Point',
        coordinates: [addressInfo.lng, addressInfo.lat],
      });
    }
  }, [route.params?.addressInfo]);

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

  const onPressAddress = () => {
    navigation.navigate(ROUTES.AddressAutocompleteScreen, {
      title: "Inserisci l'indirizzo dell'evento",
      backScreenName: ROUTES.OrganiserSignUpScreen,
    });
  };

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ position: 'absolute', left: 0 }}>
              <IconButton name="chevron-back-outline" onPress={() => navigation.goBack()} iconStyle={styles.arrowIcon} size={SIZE * 2} />
            </View>
            <Text style={styles.title}>{t('become an organiser!')}</Text>
            <InputText formik={formik} label="Name" formikName="name" autoCapitalize="none" />
            <InputText formik={formik} label="Username" formikName="username" autoCapitalize="none" />
            <InputText formik={formik} label="Email" formikName="email" autoCapitalize="none" />
            <InputText formik={formik} label={t('address')} formikName="address" pointerEvents="none" onPress={onPressAddress} touchableOpacity />
            <InputText formik={formik} label="Password" formikName="password" hide autoCapitalize="none" secureTextEntry />
            <Text style={styles.passwordReq}>{t('password requirements')}</Text>
            <Button loading={loading} primary text={t('register')} onPress={handleSubmit} />
            <View style={styles.containerLine}>
              <Line lineStyle={{ flex: 1 }} />
              <Text style={styles.orLoginUsing}>{t('or register using')}</Text>
              <Line lineStyle={{ flex: 1 }} />
            </View>
            <View style={styles.socialLoginContainer}>
              <SocialLoginButton apple />
              <SocialLoginButton google />
            </View>
            <TouchableOpacity>
              <TextButton text={t('privacy and terms')} textStyle={styles.privacyText} />
            </TouchableOpacity>
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
    position: 'absolute',
  },
});
