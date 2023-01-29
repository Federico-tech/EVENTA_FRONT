import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { DateTime } from 'luxon';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS, FONTS, SHADOWS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';

export const EventCard = ({ data }) => {
  const navigation = useNavigation();
  const dateTime = DateTime.fromISO(data.date);
  const formDate = dateTime.toFormat('ccc d LLL yyyy');
  console.log('Organiser', data);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { data })}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: data.coverImage }} style={styles.eventImage} resizeMode="cover" />
        <View style={styles.descContainer}>
          <View style={styles.informationContainer}>
            <Image resizeMode="contain" style={styles.organiserImage} source={{ uri: data.organiser.profilePic }} />
            <View style={styles.textContainer}>
              <Text style={styles.textDate}> {formDate} </Text>
              <Text style={styles.textTitle}> {data.name} </Text>
              <View style={{ width: SIZE * 20 }}>
                <Text style={styles.textAdress} numberOfLines={1} ellipsizeMode="tail">
                  {' '}
                  {data.address}{' '}
                </Text>
              </View>
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
    height: SIZE * 34,
    backgroundColor: COLORS.white,
    width: WIDTH_DEVICE * 0.9,
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 2,
    alignSelf: 'center',
    borderRadius: SIZES.xxs,
    
    ...SHADOWS.light,
  },
  eventImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
  },

  organiserImage: {
    width: SIZE * 4,
    aspectRatio: 1,
    borderRadius: 100,
  },

  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: SIZE,
    paddingHorizontal: SIZE,
  },

  informationContainer: {
    flexDirection: 'row',
  },

  textContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: SIZE / 2,
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
