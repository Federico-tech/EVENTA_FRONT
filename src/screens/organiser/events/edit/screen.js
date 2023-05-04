import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import { launchImageLibraryAsync, MediaTypeOptions, useMediaLibraryPermissions } from 'expo-image-picker';
import { useFormik } from 'formik';
import _, { size } from 'lodash';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, StyleSheet, Text, View, Linking } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';

import { Container, Header, InputText, Row } from '../../../../components';
import { ROUTES } from '../../../../navigation/Navigation';
import { updateEvent, updateEventImage } from '../../../../services/events';
import { selectSelectedEvent } from '../../../../store/event';
import { selectCurrentUser } from '../../../../store/user';
import { fromDateAndTimeToISODate, formatDate, DATE_FORMAT, TIME_FORMAT } from '../../../../utils/dates';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const EditEventScreen = ({ route }) => {
  const [status, requestPermission] = useMediaLibraryPermissions();
  useEffect(() => {
    if (!status) {
      requestPermission();
    } else if (status?.status === 'denied') {
      Alert.alert('Permission Required', 'Please allow access to your photo library in your device settings to select an image.', [
        {
          text: 'Go to Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
    }
  }, [status]);

  const organiser = useSelector(selectCurrentUser);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const event = useSelector(selectSelectedEvent);

  const { values, errors, validateForm, setFieldValue, touched, setFieldError, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: event.name,
      address: {
        fullAddress: event.address.fullAddress,
        city: event.address.city,
      },
      description: event.description,
      position: {
        type: 'Point',
        coordinates: [event.position.coordinates[0], event.position.coordinates[1]],
      },
      startDate: formatDate(event.date, DATE_FORMAT),
      startTime: formatDate(event.date, TIME_FORMAT),
      discount: event.discount.toString(),
      file: event.coverImage,
    },
    validationSchema: object().shape({
      name: string().required('Name is a required field'),
      address: object().required('Address is a required field'),
      description: string().required('Description is a required field'),
      startDate: string()
        .required('Date is a required field')
        .test('is-valid-date', 'Invalid date', (value) => {
          console.log(value);
          return !value || (DateTime.fromFormat(value, 'dd/MM/yyyy').isValid && DateTime.fromFormat(value, 'dd/MM/yyyy') >= DateTime.local());
        }),
      startTime: string()
        .required('Time is a required field')
        .test('is-valid-date', 'Invalid date', (value) => {
          console.log(value);
          return !value || DateTime.fromFormat(value, 'HH:mm').isValid;
        }),
      file: string().required('Image is a required field'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (data) => {
      try {
        setLoading(true);
        const date = fromDateAndTimeToISODate(data.startDate, data.startTime);
        await validateForm(data);
        data.file !== event.coverImage && (await updateEventImage(data.file, event._id));
        await updateEvent({ ..._.omit(data, ['startTime', 'startDate']), date, organiser });
        navigation.goBack();
        showMessage({
          message: 'Event Updated Succefully',
          description: 'The event has been updated succefully',
          type: 'success',
        });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log({ e });
      }
    },
  });

  const [discountEnabled, setDiscountEnabled] = useState(values.discount !== 0);

  useEffect(() => {
    if (!discountEnabled) {
      setFieldValue('discount', 0);
    }
  }, [discountEnabled]);

  useEffect(() => {
    const { addressInfo } = route.params || {};
    console.debug({ addressInfo });
    if (addressInfo) {
      onChangeText('address', {
        fullAddress: addressInfo.formatted_address,
        city: addressInfo.city,
      });
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
    if (!image.canceled) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(image.assets[0].uri, [{ resize: { width: 500, height: 500 } }], {
        format: ImageManipulator.SaveFormat.PNG,
      });
      await setFieldValue('file', manipulatedImage.uri);
    }
  };

  const onChangeDate = async (formikName, newValue) => {
    const isDeleting = size(newValue) < size(values.startDate);
    let newDate = newValue;
    if ((size(newDate) === 2 || size(newDate) === 5) && !isDeleting) {
      newDate += '/';
    }
    onChangeText(formikName, newDate);
  };

  const onChangeTime = async (formikName, newValue) => {
    const isDeleting = size(newValue) < size(values.startTime);
    let newTime = newValue;
    if (size(newTime) === 2 && !isDeleting) {
      newTime += ':';
    }
    onChangeText(formikName, newTime);
  };

  const onPressAddress = () => {
    navigation.navigate(ROUTES.AddressAutocompleteScreen, {
      title: "Inserisci l'indirizzo dell'evento",
      backScreenName: route.name,
    });
  };

  console.log('Discount', values.discount);

  return (
    <Container>
      <Header title="Edit event" done onPress={handleSubmit} loading={loading} cancel />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: SIZE * 2, marginHorizontal: WIDTH_DEVICE / 20, marginBottom: SIZE * 10 }}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.uploadImage}>
              {!values.file ? (
                <>
                  <Ionicons name="add" size={50} />
                  <Text>{t('pick an image')}</Text>
                </>
              ) : (
                <Image source={{ uri: values.file }} style={{ width: WIDTH_DEVICE / 2, aspectRatio: 1, borderRadius: SIZES.xxs }} />
              )}
            </View>
            <Text style={styles.requiredImage}>{errors.file && touched.file ? errors.file : null}</Text>
          </TouchableOpacity>
          <InputText label={t('name')} formik={formik} formikName="name" maxLength={30} />
          <InputText
            label={t('address')}
            {...getFieldProps('address.fullAddress')}
            formikName="address"
            pointerEvents="none"
            onPress={onPressAddress}
            touchableOpacity
          />
          <InputText label={t('description')} formik={formik} formikName="description" multiline />
          <InputText
            label={t('date')}
            formik={{ ...formik, onChangeText: onChangeDate }}
            formikName="startDate"
            maxLength={10}
            placeholder="dd/MM/yyyy"
          />
          <InputText
            label={t('start time')}
            formik={{ ...formik, onChangeText: onChangeTime }}
            formikName="startTime"
            maxLength={5}
            placeholder="HH:mm"
          />
          <Row row alignCenter style={{ marginTop: SIZE }}>
            <Text style={styles.textDiscount}>Discount</Text>
            <Switch value={discountEnabled} onValueChange={setDiscountEnabled} />
          </Row>
          {discountEnabled && <InputText formik={formik} formikName="discount" maxLength={30} placeholder="Enter the discount percentage" />}
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 3,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.xl,
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 70,
    marginBottom: HEIGHT_DEVICE / 50,
  },
  image: {
    borderRadius: SIZES.xs,
    width: WIDTH_DEVICE / 2.5,
    height: HEIGHT_DEVICE / 6,
  },
  uploadImage: {
    backgroundColor: COLORS.backGray,
    width: WIDTH_DEVICE / 2,
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: HEIGHT_DEVICE / 100,
    borderRadius: SIZES.xxs,
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
  textDiscount: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.xs,
    color: COLORS.darkGray,
    marginRight: SIZE,
  },
});
