import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';

import { Container, InputText, TextButton, Header, Row } from '../../../../components';
import { userUpdate } from '../../../../services/users';
import { selectUser, selectUserId } from '../../../../store/user';
import { requestCameraPermission } from '../../../../utils/permissions';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const EditOrganiserScreen = () => {
  useEffect(requestCameraPermission, []);
  const navigation = useNavigation();

  const user = useSelector(selectUser);
  console.log(user);
  const userId = useSelector(selectUserId);

  const [loading, setLoading] = useState(false);

  const { values, errors, validateForm, setFieldValue, touched, setFieldError, handleSubmit } = useFormik({
    initialValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
      address: user.address,
      file: user.profilePic,
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
        }),
      address: string().required('Address is a required field'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (data) => {
      try {
        setLoading(true);
        await validateForm(data);
        await userUpdate(data, userId);
        navigation.goBack();
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log({ e });
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

  const pickImage = async () => {
    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(image);
    if (!image.canceled) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(image.assets[0].uri, [{ resize: { width: 150, height: 150 } }], {
        format: ImageManipulator.SaveFormat.PNG,
      });
      await setFieldValue('file', manipulatedImage.uri);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView behavior="padding">
        <Header title="Edit Profile" onPress={handleSubmit} loading={loading} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Row alignCenter>
              <View style={styles.imageContainer}>
                {!values.file ? (
                  <Ionicons name="person" size={50} color={COLORS.darkGray} />
                ) : (
                  <>
                    <Image source={{ uri: values.file }} style={styles.image} resizeMode="cover" />
                  </>
                )}
              </View>
              <TextButton text="Upload an image" textStyle={styles.upload} onPress={pickImage} />
            </Row>
            <InputText label="Name" formik={formik} formikName="name" />
            <InputText label="Username" formik={formik} formikName="username" autoCapitalize="none" />
            <InputText label="Address" formik={formik} formikName="address" />
            <InputText label="Description" formik={formik} formikName="bio" multiline maxLength={500} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE,
  },
  image: {
    borderRadius: 100,
    width: SIZE * 8,
    aspectRatio: 1,
  },
  imageContainer: {
    backgroundColor: COLORS.lightGray,
    width: SIZE * 8,
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upload: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.xs,
    marginTop: SIZE / 2,
    marginBottom: SIZE,
  },
});
