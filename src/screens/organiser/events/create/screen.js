import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useFormik } from 'formik';
import _, { size } from 'lodash';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';

import { Container, InputText, TextButton } from '../../../../components';
import { ROUTES } from '../../../../navigation/Navigation';
import { createEvent } from '../../../../services/events';
import { selectUserId } from '../../../../store/user';
import { fromDateAndTimeToISODate } from '../../../../utils/dates';
import { requestCameraPermission } from '../../../../utils/permissions';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const CreateEventScreen = ({ route }) => {
  useEffect(requestCameraPermission, []);

  const organiserId = useSelector(selectUserId);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { values, errors, validateForm, setFieldValue, touched, setFieldError, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      address: '',
      description: '',
      position: {
        type: 'Point',
        coordinates: [],
      },
      startDate: '',
      startTime: '',
      file: '',
    },
    validationSchema: object().shape({
      name: string().required('Name is a required field'),
      address: string().required('Address is a required field'),
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
    onSubmit: async (data, { resetForm }) => {
      try {
        setLoading(true);
        const date = fromDateAndTimeToISODate(data.startDate, data.startTime);
        await validateForm(data);
        await createEvent({ ..._.omit(data, ['startTime', 'startDate']), date, organiserId });
        navigation.navigate(ROUTES.OrganiserHome);
        showMessage({
          message: 'Event Created Succefully',
          description: 'The event has been cerated succefully',
          type: 'success',
        });
        resetForm();
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

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{t('create event')}</Text>
            <View>
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
              <InputText label={t('address')} formik={formik} formikName="address" pointerEvents="none" onPress={onPressAddress} touchableOpacity />
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
              <TextButton text={t('publish event')} textStyle={styles.publishEvent} onPress={handleSubmit} loading={loading} />
            </View>
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
    marginBottom: HEIGHT_DEVICE / 50,
  },
  image: {
    borderRadius: SIZES.xs,
    width: WIDTH_DEVICE / 2.5,
    height: HEIGHT_DEVICE / 6,
  },
  uploadImage: {
    backgroundColor: COLORS.lightGray,
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
});
