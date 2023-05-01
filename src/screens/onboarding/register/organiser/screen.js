import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { object, string } from 'yup';

import { Button, InputText, TextButton, Container, Row, Text } from '../../../../components/index';
import { ROUTES } from '../../../../navigation/Navigation';
import { loginUser, organiserSignUp } from '../../../../services/users';
import { ROLES } from '../../../../utils/conts';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, SIZE } from '../../../../utils/theme';

export const OrganiserSignUpScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
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
        setError(e.response.request.status);
        showMessage({
          message: 'SignUp Failed',
          description: 'This username has already been used',
          type: 'danger',
        });
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
      title: 'Inserisci il tuo indirizzo',
      backScreenName: ROUTES.OrganiserSignUpScreen,
    });
  };

  const onPressPrivacyPolicy = () => {
    navigation.navigate(ROUTES.PrivacyPolicyScreen);
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <KeyboardAwareScrollView behavior="height" showsVerticalScrollIndicator={false} style={{ marginBottom: SIZE * 3 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Become an Organiser!</Text>
          <InputText formik={formik} label="Name" formikName="name" autoCapitalize="none" maxLength={25} />
          <InputText formik={formik} label="Username" formikName="username" autoCapitalize="none" maxLength={20} />
          <InputText formik={formik} label="Email" formikName="email" autoCapitalize="none" />
          <InputText formik={formik} label={t('address')} formikName="address" pointerEvents="none" onPress={onPressAddress} touchableOpacity />
          <InputText formik={formik} label="Password" formikName="password" hide autoCapitalize="none" secureTextEntry />
          <Text style={styles.passwordReq}>{t('password requirements')}</Text>
          <Button
            loading={loading}
            primary
            text="Sign Up"
            containerStyle={{ width: WIDTH_DEVICE * 0.9, height: HEIGHT_DEVICE / 15, marginBottom: SIZE / 1.5 }}
            onPress={handleSubmit}
          />
          <View style={styles.containerLine}>
            <Row style={styles.line} />
            <Text style={styles.orLoginUsing}>or</Text>
            <Row style={styles.line} />
          </View>
          <Row row style={{ alignSelf: 'center', marginTop: SIZE * 1.5, marginBottom: HEIGHT_DEVICE / 80 }}>
            <Text style={styles.registerText} fs={SIZES.sm}>Already have an account?</Text>
            <TouchableOpacity onPress={onPressGoBack}>
              <Text style={styles.registerButtonText}> Log in</Text>
            </TouchableOpacity>
          </Row>
          <TouchableOpacity onPress={onPressPrivacyPolicy}>
            <TextButton text={t('privacy and terms')} textStyle={styles.privacyText} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {error === 409 && <FlashMessage position="top" />}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 5,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
    alignSelf: 'center',
    marginTop: SIZE / 2,
    marginBottom: SIZE,
  },

  passwordReq: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.gray,
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
  },
  arrowIcon: {
    marginTop: SIZE / 2,
    position: 'absolute',
  },
  registerButtonText: {
    fontFamily: 'InterMedium',
    fontSize: SIZES.xs,
    color: COLORS.primary,
  },
  line: {
    backgroundColor: COLORS.lightGray,
    height: 0.5,
    flex: 1,
  },
});
