import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { setUserSelected } from '../store/user';
import { formatDate, formatTime } from '../utils/dates';
import { COLORS, FONTS, SHADOWS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';

export const EventCard = ({ data }) => {
  const navigation = useNavigation();
  console.log('EventDetails', data.organiser);
  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(setUserSelected(data.organiser));
    navigation.navigate('EventDetails', { data });
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.cardContainer}>
        {!data.coverImage || data.coverImage === '' ? (
          <View style={styles.eventImageView} />
        ) : (
          <Image source={{ uri: data.coverImage }} style={styles.eventImage} resizeMode="cover" />
        )}
        <View style={styles.startTime}>
          <Text style={styles.startTimeText}>{formatTime(data.date)}</Text>
        </View>
        <View style={styles.descContainer}>
          <View style={styles.informationContainer}>
            <Image resizeMode="contain" style={styles.organiserImage} source={{ uri: data.organiser.profilePic }} />
            <View style={styles.textContainer}>
              <Text style={styles.textDate}> {formatDate(data.date)} </Text>
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
    height: SIZE * 34,
    backgroundColor: COLORS.white,
    width: WIDTH_DEVICE * 0.9,
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 1.5,
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
