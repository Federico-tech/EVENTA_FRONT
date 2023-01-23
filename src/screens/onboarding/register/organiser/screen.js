import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { object, string } from 'yup';
import i18n from '../../../../utils/locales/i18n';

import { Button, InputText, Line, TextButton, SocialLoginButton, IconButton, Container } from '../../../../components/index';
import { loginUser, organiserSignUp } from '../../../../services/users';
import { ROLES } from '../../../../utils/conts';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';
import { ROUTES } from '../../../../navigation/Navigation';

export const OrganiserSignUpScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);

  const { values, errors, validateForm, setFieldValue, setFieldError, touched, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      email: '',
      address: '',
      password: '',
      role: ROLES.ORGANISER,
      name: 'org',
    },
    validationSchema: object().shape({
      username: string().required('Username is a required field'),
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
            <IconButton name="chevron-back-outline" onPress={() => navigation.goBack()} iconStyle={styles.arrowIcon} size={22} />
            <Text style={styles.title}>{i18n.t('become an organiser!')}</Text>
            <InputText formik={formik} label="Username" formikName="username" autoCapitalize="none" />
            <InputText formik={formik} label="Email" formikName="email" autoCapitalize="none" />
            <InputText formik={formik} label={i18n.t('address')} formikName="address" pointerEvents="none" onPress={onPressAddress} touchableOpacity/>
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
            <TouchableOpacity>
              <TextButton text={i18n.t('privacy and terms')} textStyle={styles.privacyText} />
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
