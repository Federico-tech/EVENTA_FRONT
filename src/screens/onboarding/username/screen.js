import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { object, string } from 'yup';

import { Container, InputText, Text, TextButton } from '../../../components';
import { checkUsername, userUpdate } from '../../../services/users';
import { FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../navigation/Navigation';

export const UsernameScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isUsernameFree, setIsUsernameFree] = useState(true);
  const [error, setError] = useState();
  const navigation = useNavigation()

  const { values, errors, validateForm, setFieldValue, setFieldError, touched, handleSubmit } = useFormik({
    initialValues: {
      username: '',
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
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (data) => {
      if (isUsernameFree) {
        try {
          setLoading(true);
          console.log(data);
          await validateForm(data);
          await userUpdate({ username: data.username });
          navigation.navigate(ROUTES.HomeScreen)
          setLoading(false);
        } catch (e) {
          showMessage({
            message: 'SignUp Failed',
            description: 'This username has already been used',
            type: 'danger',
          });
          setError(e.response.request.status);
        }
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

  useEffect(() => {
    checkUsername(values.username).then((result) => {
      console.log('username', result);
      setIsUsernameFree(result);
    });
  }, [values.username]);

  return (
    <Container>
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
        <Text mt={SIZE * 3} fs={SIZES.md} ff={FONTS.semiBold}>
          Choose your username
        </Text>
        <InputText formik={formik} formikName="Username" noAutoCorrect usernameError={!isUsernameFree && 'This username is already been taken'} />
        <TextButton text="Next" onPress={handleSubmit} textStyle={{ alignSelf: 'center', marginTop: SIZE }} loading={loading} />
      </View>
    </Container>
  );
};
