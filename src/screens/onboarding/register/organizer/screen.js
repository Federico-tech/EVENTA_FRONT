import { useFormik } from 'formik';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { object, string } from 'yup';

import { Button, InputText, Line, TextButton, SocialLoginButton, IconButton } from '../../../../components/index';
import { loginUser, organiserSignUp } from '../../../../services/users';
import { ROLES } from '../../../../utils/conts';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const OrganiserSignUpScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  // const OnPressOrganiserSignUp = async () => {
  //   try {
  //     setLoading(true);
  //     await noAuthAxios.post('/auth/register', {
  //       username,
  //       email,
  //       adress,
  //       password,
  //       role: ROLES.ORGANIZER,
  //       name: 'b',
  //     });
  //     await loginUser(email, password);
  //     setLoading(false);
  //   } catch (e) {
  //     setLoading(false);
  //     console.error({ e });
  //   }
  // };

  const { values, errors, validateForm, setFieldValue, setFieldError, touched, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      email: '',
      address: '',
      password: '',
      role: ROLES.ORGANIZER,
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
        await organiserSignUp(data);
        await loginUser(data.email, data.password);
        console.log(data);
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView showsVerticalScrollIndicator={false}>
          <IconButton name="chevron-back-outline" onPress={() => navigation.goBack()} iconStyle={styles.arrowIcon} size={22} />
          <Text style={styles.title}>Become an organiser!</Text>
          <InputText formik={formik} label="Username" formikName="username" autoCapitalize="none" />
          <InputText formik={formik} label="Email" formikName="email" autoCapitalize="none" />
          <InputText formik={formik} label="Address" formikName="address" />
          <InputText formik={formik} label="Password" formikName="password" hide autoCapitalize="none" />
          <Text style={styles.passwordReq}>
            The password has to contain at least: {'\n'}-8 characters{'\n'}-1 number{' '}
          </Text>
          <Button loading={loading} primary text="Register" onPress={handleSubmit} />
          <View style={styles.containerLine}>
            <Line lineStyle={{ flex: 1 }} />
            <Text style={styles.orLoginUsing}>Or Register Using</Text>
            <Line lineStyle={{ flex: 1 }} />
          </View>
          <View style={styles.socialLoginContainer}>
            <SocialLoginButton apple />
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
