import { Ionicons } from '@expo/vector-icons';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useFormik } from 'formik';
// eslint-disable-next-line no-unused-vars
import { size, omit } from 'lodash';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';

import { InputText, TextButton } from '../../../../components';
import { createEvent } from '../../../../services/events';
import { store } from '../../../../store';
import { selectUser } from '../../../../store/user';
import { requestCameraPermission } from '../../../../utils/permissions';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const CreateEventScreen = () => {
  useEffect(requestCameraPermission, []);
  
  const user = useSelector(selectUser)
  console.log('user',{user})

  const [loading, setLoading] = useState(false);
  const { values, errors, validateForm, setFieldValue, touched, setFieldError, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      address: '',
      description: '',
      startDate: '',
      startTime: '',   
    },
    validationSchema: object().shape({
      name: string().required('Name is a required field'),
      address: string().required('Adress is a required field'),
      description: string().required('Description is a required field'),
      startDate: string()
        .required('Date is a required field')
        .test('is-valid-date', 'Invalid date', (value) => {
          console.log(value);
          return !value || DateTime.fromFormat(value, 'dd/MM/yyyy').isValid;
        }),
      startTime: string()
        .required('Time is a required field')
        .test('is-valid-date', 'Invalid date', (value) => {
          console.log(value);
          return !value || DateTime.fromFormat(value, 'HH:mm').isValid;
        }),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (data, event) => {
      try {
        const startDate = data.startDate;
        const time = data.startTime;
        const [day, month, year] = startDate.split('/');
        const [hour, minute] = time.split(':');
        const date = DateTime.fromObject({
          year,
          month,
          day,
          minute,
          hour,
        }).toISO();
        console.log('date' + date);
        setLoading(true);
        console.log(data);
        event = {
          organizerId: user._id,
          name: data.name,
          address: data.address,
          description: data.description,
          date,
        };
        console.log(event);
        await validateForm(data);
        await createEvent(event);
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
      await setFieldValue('coverImage', image.assets[0].uri);
    }
    
  };

  const onChangeDate = async (formikName, newValue) => {
    const isDeleting = size(newValue) < size(values.date);
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}> Create a new Event </Text>
          <View>
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.uploadImage}>
                {!values.eventImage ? (
                  <>
                    <Ionicons name="add" size={50} />
                    <Text>Pick an image</Text>
                  </>
                ) : (
                  <Image source={{ uri: values.eventImage }} style={{ width: WIDTH_DEVICE / 2, aspectRatio: 1, borderRadius: SIZES.xxs }} />
                )}
              </View>
            </TouchableOpacity>
            <InputText label="Name" formik={formik} formikName="name" maxLength={30} />
            <InputText label="Address" formik={formik} formikName="address" />
            <InputText label="Description" formik={formik} formikName="description" multiline />
            <InputText label="Date" formik={{ ...formik, onChangeText: onChangeDate }} formikName="startDate" maxLength={10} placeholder="dd/MM/yyyy" />
            <InputText label="Time" formik={{ ...formik, onChangeText: onChangeTime }} formikName="startTime" maxLength={5} placeholder="HH:mm" />
            <TextButton text="Publish Event" textStyle={styles.publishEvent} onPress={handleSubmit} loading={loading} />
          </View>
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
    marginBottom: HEIGHT_DEVICE / 80,
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
});
