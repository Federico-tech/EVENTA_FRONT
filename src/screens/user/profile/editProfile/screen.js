import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';

import { Container, InputText, TextButton, Header, Row, Text } from '../../../../components';
import { updateUserImage, userUpdate } from '../../../../services/users';
import { selectCurrentUser, selectCurrentUserId } from '../../../../store/user';
import { requestCameraPermission } from '../../../../utils/permissions';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const EditUserScreen = () => {
  useEffect(requestCameraPermission, []);
  const navigation = useNavigation();

  const user = useSelector(selectCurrentUser);
  const userId = useSelector(selectCurrentUserId);

  const [loading, setLoading] = useState(false);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['18%'];

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleClosePress = () => bottomSheetModalRef.current.close()

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  );

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
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (data) => {
      try {
        setLoading(true);
        await validateForm(data);
        await updateUserImage(data.file);
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
    handleClosePress()
  };

  const deleteImage = () => {
    setFieldValue('file', undefined);
    handleClosePress()
  };

  return (
    <BottomSheetModalProvider>
      <Container>
        <KeyboardAvoidingView behavior="padding">
          <Header title="Edit Profile" onPress={handleSubmit} loading={loading} done />
          <ScrollView>
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
                <TextButton text="Edit picture" textStyle={styles.upload} onPress={handlePresentModal} />
              </Row>
              <InputText label="Name" formik={formik} formikName="name" />
              <InputText label="Username" formik={formik} formikName="username" />
              <InputText label="Bio" formik={formik} formikName="bio" multiline maxLength={90} />
            </View>
          </ScrollView>
          <View>
            <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
              <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
                {/* <View style={styles.editImageContainer}>
                  {!values.file ? (
                    <Ionicons name="person" size={5} color={COLORS.darkGray} />
                  ) : (
                    <>
                      <Image source={{ uri: values.file }} style={styles.editImage} resizeMode="cover" />
                    </>
                  )}
                </View> */}
                <TouchableOpacity onPress={pickImage}>
                  <Row row alignCenter style={{ marginTop: SIZE }}>
                    <Ionicons name="images-outline" size={SIZE * 2} />
                    <Text regularSm style={{ marginLeft: SIZE }}>
                      Choose From your library
                    </Text>
                  </Row>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteImage}>
                  <Row row alignCenter style={{ marginTop: SIZE }}>
                    <Ionicons name="ios-trash-outline" size={SIZE * 2} color="red" />
                    <Text regularSm color="red" style={{ marginLeft: SIZE }}>
                      Delete the image
                    </Text>
                  </Row>
                </TouchableOpacity>
              </View>
            </BottomSheetModal>
          </View>
        </KeyboardAvoidingView>
      </Container>
    </BottomSheetModalProvider>
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
  editImage: {
    width: SIZE * 4,
    aspectRatio: 1,
    borderRadius: 100,
  },
});
