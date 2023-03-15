import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { setSelectedEvent } from '../store/event';
import { setUserSelected } from '../store/user';
import { EVENT_DATE_FORMAT, formatDate } from '../utils/dates';
import { COLORS, FONTS, SHADOWS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';

export const EventCard = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(setUserSelected(data.organiser));
    dispatch(setSelectedEvent(data));
    navigation.navigate('EventDetails', { data });
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.cardContainer}>
        <LoadingImage source={data.coverImage} style={styles.eventImage} resizeMode="cover" indicator />
        <View style={styles.descContainer}>
          <View style={styles.informationContainer}>
            <LoadingImage resizeMode="contain" style={styles.organiserImage} source={data.organiser.profilePic} />
            <View style={styles.textContainer}>
              <Text style={styles.textDate}> {formatDate(data.date, EVENT_DATE_FORMAT)} </Text>
              <Text style={styles.textTitle}> {data.name} </Text>
              <View style={{ width: SIZE * 20 }}>
                <Text style={styles.textAdress} numberOfLines={1} ellipsizeMode="tail">
                  {' '}
                  {data.address}{' '}
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.likeContainer}>
            <FontAwesome name="heart" size={17} color="red" />
            <Text> {} </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: SIZE * 33,
    backgroundColor: COLORS.white,
    width: WIDTH_DEVICE * 0.9,
    marginHorizontal: WIDTH_DEVICE / 20,
    ...SHADOWS.medium,
    marginBottom: SIZE * 1.5,
    alignSelf: 'center',
    borderRadius: SIZES.xxs,
    borderWidth: 0,
    borderColor: COLORS.lightGray,
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
  eventImageView: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
    backgroundColor: COLORS.lightGray,
  },
  startTime: {
    backgroundColor: COLORS.white,
    width: SIZE * 5,
    height: SIZE * 2.5,
    position: 'absolute',
    marginTop: SIZE * 26.5,
    marginLeft: SIZE * 22,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.xxs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startTimeText: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
  },
});
