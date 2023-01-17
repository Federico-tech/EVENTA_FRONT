import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { object, string } from 'yup';

import { Container, InputText, TextButton, Header, Row } from '../../../components';
import { requestCameraPermission } from '../../../utils/permissions';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';

export const EditUserScreen = () => {
  useEffect(requestCameraPermission, []);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { values, errors, validateForm, setFieldValue, touched, setFieldError, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      bio: '',
      file: '',
    },
    validationSchema: object().shape({
      name: string().required('Name is a required field'),
      address: string().required('Address is a required field'),
      description: string().required('Description is a required field'),
      file: string().required('Image is a required field'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (data) => {
      try {
        setLoading(true);
        await validateForm(data);
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

  return (
    <Container>
      <Header title='Edit Profile'/>
      <View style={styles.container}>
        <Row alignCenter>
          <View style={styles.imageContainer}>
            <Ionicons name='person' size={50} color={COLORS.darkGray}/>
          </View>
          <TextButton text='Upload an image' textStyle={styles.upload}/>
        </Row>
        <InputText label="Name" formik={formik} formikName="name" maxLength={30} />
        <InputText label="Username" formik={formik} formikName="description" />
        <InputText label="Bio" formik={formik} formikName="description" multiline/>
        <TextButton text="Save" textStyle={styles.publishEvent} onPress={handleSubmit} loading={loading} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE,
  },
  image: {
    borderRadius: SIZES.xs,
    width: WIDTH_DEVICE / 2.5,
    height: HEIGHT_DEVICE / 6,
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
  publishEvent: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 30,
  },
  requiredImage: {
    color: COLORS.error,
    fontSize: SIZES.sm,
    alignSelf: 'center',
  },
  upload: {
    fontFamily: FONTS.semiBold, 
    fontSize: SIZES.sm
  }
});
