import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DateTime } from 'luxon';

import { COLORS, FONTS, HEIGHT_DEVICE, SHADOWS, SIZES, WIDTH_DEVICE } from '../utils/theme';

export const EventCard = ({data}) => {

  const navigation = useNavigation();
  const dateTime = DateTime.fromISO(data.date);
  const formDate = dateTime.toFormat('ccc d LLL yyyy')

  return (
    <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { data })}>
      <View style={styles.cardContainer}>
        <Image source={{uri: data.coverImage}} style={styles.eventImage} />
        <View style={styles.descContainer}>
          <View style={styles.informationContainer}>
            <Image resizeMode="contain" style={styles.organiserImage} />
            <View style={styles.textContainer}>
              <Text style={styles.textDate}> {formDate} </Text>
              <Text style={styles.textTitle}> {data.name} </Text>
              <Text style={styles.textAdress}> {data.address} </Text>
            </View>
          </View>
          <View style={styles.likeContainer}>
            <FontAwesome name="heart" size={17} color="red" />
            <Text> {} </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    width: WIDTH_DEVICE / 1.1,
    height: HEIGHT_DEVICE / 2.2,
    marginTop: HEIGHT_DEVICE / 70,
    alignSelf: 'center',
    borderRadius: SIZES.xxs,
    ...SHADOWS.light,
  },

  eventImage: {
    width: WIDTH_DEVICE / 1.1,
    height: HEIGHT_DEVICE / 2.7,
    borderRadius: SIZES.xxs,
  },

  organiserImage: {
    width: WIDTH_DEVICE / 8,
    height: HEIGHT_DEVICE / 16,
  },

  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: HEIGHT_DEVICE / 90,
  },

  informationContainer: {
    flexDirection: 'row',
  },

  textContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: WIDTH_DEVICE / 100,
  },

  textDate: {
    color: COLORS.gray,
    fontSize: SIZES.xs,
  },

  textTitle: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
  },

  textAdress: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
  },

  likeContainer: {
    alignItems: 'center',
  },
});
