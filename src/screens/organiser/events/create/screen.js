import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EventImage1 } from '../../../../assets';
import { InputText, TextButton } from '../../../../components';
import { createEvent } from '../../../../services/events';
import { WIDTH_DEVICE, FONTS, SIZES, HEIGHT_DEVICE } from '../../../../utils/constants/Theme';

export const CreateEventScreen = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('COCO CRAZY PARTY');
  const [address, setAddress] = useState('Via Montegrappa, 25, 24060 Rogno BG');
  const [date, setDate] = useState('COCO CRAZY PARTY');
  const [description, setDescription] = useState(
    'Cocò Snow PartySabato 10 Dicembre, vestiti a tema neve e vinci ricchi premi! Stupiscici col tuo outfit e vinci un tavolo al Cocò'
  );

  const onPressPublish = async () => {
    try {
      setLoading(true);
      await createEvent({
        name,
        address,
        description,
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
        <View style={styles.uploadImage}>
          <Image source={EventImage1} style={styles.image} />
          <TextButton text="Upload an Image" textStyle={styles.uploadImageText} />
        </View>
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
    flexDirection: 'row',
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
