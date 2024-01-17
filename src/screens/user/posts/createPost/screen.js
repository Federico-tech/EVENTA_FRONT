import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import { launchImageLibraryAsync, MediaTypeOptions, useMediaLibraryPermissions } from 'expo-image-picker';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Image, ActivityIndicator, Alert, Linking } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';

import { Container, Header, InputText, ListEmptyComponent, MiniEventCard, Row, Text, TextButton } from '../../../../components';
import { createPost } from '../../../../services/posts';
import { selectCurrentUser, selectCurrentUserId } from '../../../../store/user';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const CreatePostScreen = () => {
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

  const currentUser = useSelector(selectCurrentUser);
  const userId = useSelector(selectCurrentUserId);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [entity] = useState(currentUser.role === 'organiser' ? 'events' : `users/${userId}/events`);
  const [event, setEvent] = useState();
  const { t } = useTranslation();

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['70%'];

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleClosePress = () => bottomSheetModalRef.current.close();

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

  const filters = currentUser.role === 'organiser' && { organiserId: userId };

  const { data, refreshing, getRefreshedData, getMoreData, loadMore } = useInfiniteScroll({
    entity,
    limit: 6,
    filters,
  });

  const handleSelectEvent = (item) => {
    console.log('item', item);
    setFieldValue('eventId', item._id);
    setEvent(item);
    handleClosePress();
  };

  const { values, errors, validateForm, setFieldValue, touched, setFieldError, handleSubmit } = useFormik({
    initialValues: {
      eventId: '',
      caption: '',
      file: '',
    },
    validationSchema: object().shape({
      file: string().required('Image is a required field'),
      eventId: string().required('You must choose an event'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (data, { resetForm }) => {
      console.log(data);
      try {
        setLoading(true);
        await validateForm(data);
        await createPost({ ...data, userId });
        navigation.goBack({ myParam: 'getData' });
        resetForm();
        showMessage({
          type: 'success',
          message: 'Post created succefully',
        });
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
      const manipulatedImage = await ImageManipulator.manipulateAsync(image.assets[0].uri, [{ resize: { width: 600, height: 600 } }], {
        format: ImageManipulator.SaveFormat.PNG,
      });
      await setFieldValue('file', manipulatedImage.uri);
    }
  };

  return (
    <Container>
      <Header title="Create your moment" create onPress={handleSubmit} loading={loading} cancel getData />
      <KeyboardAwareScrollView behavior="height" showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={status?.status !== 'granted' ? () => alert('Please allow access to your photo library in your device settings') : pickImage}>
            <View style={styles.uploadImage}>
              {!values.file ? (
                <>
                  <Ionicons name="add" size={50} color={COLORS.lightGray} />
                  <Text color={COLORS.lightGray}>{t('pick an image')}</Text>
                </>
              ) : (
                <Image source={{ uri: values.file }} style={{ width: SIZE * 26, aspectRatio: 1, borderRadius: SIZES.xxs }} />
              )}
            </View>
            <Text style={styles.requiredImage}>{errors.file && touched.file ? errors.file : null}</Text>
          </TouchableOpacity>
          <InputText label="Caption" formik={formik} formikName="caption" maxLength={80} />
          <TextButton text="Choose the event" style={styles.chooseEvent} onPress={handlePresentModal} />
          {event && (
            <Row row alignCenter style={{ marginTop: SIZE }}>
              <Image source={{ uri: event.coverImage }} style={styles.eventImage} />
              <Row style={{ marginLeft: SIZE }}>
                <Text style={{ textTransform: 'capitalize', fontFamily: FONTS.medium }}>{event.name}</Text>
                <Text color={COLORS.gray}>by {event.organiser.username}</Text>
              </Row>
            </Row>
          )}
          <Text style={[styles.requiredImage]}>{errors.eventId && touched.eventId ? errors.eventId : null}</Text>
        </View>
      </KeyboardAwareScrollView>
      <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop} backgroundStyle={{ backgroundColor: '#080808' }}>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => <MiniEventCard data={item} onPress={() => handleSelectEvent(item)} />}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            onEndReached={_.throttle(getMoreData, 400)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
            ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
            ListEmptyComponent={<ListEmptyComponent text="There are no events you have participated to in the last 2 days " />}
          />
        </View>
      </BottomSheetModal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 2,
  },
  uploadImage: {
    backgroundColor: COLORS.darkGray,
    width: SIZE * 26,
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: HEIGHT_DEVICE / 100,
    borderRadius: SIZES.xxs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseEvent: {
    color: COLORS.primary,
    fontSize: SIZES.sm,
    marginTop: SIZE,
    fontFamily: FONTS.semiBold,
  },
  eventImage: {
    width: SIZE * 5,
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
  },
  requiredImage: {
    color: COLORS.error,
    fontSize: SIZES.sm,
    alignSelf: 'center',
  },
});
