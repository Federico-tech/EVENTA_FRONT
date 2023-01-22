import { Ionicons } from '@expo/vector-icons';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';

import { Container, InputText, TextButton, Header, Row } from '../../../components';
import { userUpdate } from '../../../services/users';
import { selectUser, selectUserId } from '../../../store/user';
import { requestCameraPermission } from '../../../utils/permissions';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';

export const EditUserScreen = () => {
  useEffect(requestCameraPermission, []);

  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);

  const [loading, setLoading] = useState(false);

  const { values, errors, validateForm, setFieldValue, touched, setFieldError, handleSubmit } = useFormik({
    initialValues: {
      name: user.name,
      bio: user.bio,
      username: user.username,
      file: user.profilePic,
    },
    validationSchema: object().shape({
      name: string().required('Name is a required field'),
      bio: string().required('Address is a required field'),
      username: string().required('Description is a required field'),
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
    if (!image.canceled) {
      await setFieldValue('file', image.assets[0].uri);
    }
  };
  console.log('file', values.file);
  return (
    <Container>
      <KeyboardAvoidingView behavior="padding">
        <Header title="Edit Profile" onPress={handleSubmit} loading={loading} />
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
          <InputText label="Name" formik={formik} formikName="name" maxLength={30} />
          <InputText label="Username" formik={formik} formikName="username" />
          <InputText label="Bio" formik={formik} formikName="bio" multiline />
        </View>
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
    marginBottom: SIZE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImageText: {
    alignSelf: 'center',
    position: 'relative',
    fontFamily: FONTS.semiBold,
    marginLeft: WIDTH_DEVICE / 6.5,
  },
  description: {
    height: HEIGHT_DEVICE / 5,
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  requiredImage: {
    color: COLORS.error,
    fontSize: SIZES.sm,
    alignSelf: 'center',
  },
  upload: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
  },
  publishEvent: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 30,
  },
});
