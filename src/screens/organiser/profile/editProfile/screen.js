import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
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
import { ROUTES } from '../../../../navigation/Navigation';
import { updateUserImage, userUpdate } from '../../../../services/users';
import { selectCurrentUser, selectCurrentUserId } from '../../../../store/user';
import { requestCameraPermission } from '../../../../utils/permissions';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const EditOrganiserScreen = ({ route }) => {
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
      username: user.username,
      bio: user.bio,
      address: user.address,
      file: user.profilePic,
      position: {
        type: 'Point',
        coordinates: [user.position.coordinates[0], user.position.coordinates[1]],
      },
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
        data.file !== user.profilePic && !!data?.file && (await updateUserImage(data.file));
        !data?.file && (await userUpdate({ profilePic: null }, userId));
        await userUpdate(data, userId);
        navigation.goBack();
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log({ e });
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

  const onPressAddress = () => {
    navigation.navigate(ROUTES.AddressAutocompleteScreen, {
      title: 'Inserisci il tuo indirizzo',
      backScreenName: route.name,
    });
  };

  const deleteImage = () => {
    setFieldValue('file', null);
    handleClosePress()
  };

  return (
    <Container>
      <KeyboardAvoidingView behavior="padding">
        <Header title="Edit Profile" onPress={handleSubmit} loading={loading} done />
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
              <TextButton text="Edit picture" textStyle={styles.upload} onPress={handlePresentModal} />
            </Row>
            <InputText label="Name" formik={formik} formikName="name" />
            <InputText label="Username" formik={formik} formikName="username" autoCapitalize="none" />
            <InputText label="Address" formik={formik} formikName="address" pointerEvents="none" onPress={onPressAddress} touchableOpacity />
            <InputText label="Description" formik={formik} formikName="bio" multiline maxLength={500} />
          </View>
        </ScrollView>
        <View>
          <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
            <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
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
