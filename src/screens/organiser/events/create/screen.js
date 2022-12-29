import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InputText, TextButton } from '../../../../components';
import { createEvent } from '../../../../services/events';
import { WIDTH_DEVICE, FONTS, SIZES, HEIGHT_DEVICE, COLORS } from '../../../../utils/constants/Theme';

export const CreateEventScreen = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('COCO CRAZY PARTY');
  const [address, setAddress] = useState('Via Montegrappa, 25, 24060 Rogno BG');
  const [description, setDescription] = useState(
    'Cocò Snow PartySabato 10 Dicembre, vestiti a tema neve e vinci ricchi premi! Stupiscici col tuo outfit e vinci un tavolo al Cocò'
  );
  const [eventImage, setEventImage] = useState();

  useEffect(() => {
    const loadData = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission denied!');
        }
      }
    };
    loadData();
  }, []);

  const PickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setEventImage(result.assets[0].uri);
    }
  };

  const onPressPublish = async () => {
    try {
      setLoading(true);
      await createEvent({
        name,
        address,
        description,
        eventImage,
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log({ e });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Create a new Event </Text>
      <View>
        <TouchableOpacity onPress={PickImage}>
          <View style={styles.uploadImage}>
            {!eventImage ? (
              <>
                <Ionicons name="add" size={50} />
                <Text>Pick an image</Text>
              </>
            ) : (
              <Image source={{ uri: eventImage }} style={{ width: WIDTH_DEVICE / 2, aspectRatio: 1, borderRadius: SIZES.xxs }} />
            )}
          </View>
        </TouchableOpacity>
        <InputText label="Name" value={name} setValue={setName} />
        <InputText label="Address" value={address} setValue={setAddress} />
        {/*<InputText label="Date" value={date} setValue={setDate} />*/}
        <InputText label="Description" containerStyle={styles.description} value={description} setValue={setDescription} multiline />
        <TextButton text="Publish Event" textStyle={styles.publishEvent} onPress={onPressPublish} loading={loading} />
      </View>
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
  },
  publishEvent: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 30,
  },
});
