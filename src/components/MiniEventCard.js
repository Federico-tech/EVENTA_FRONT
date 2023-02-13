import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedEvent } from '../store/event';

import { setUserSelected } from '../store/user';
import { formatDate } from '../utils/dates';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { Line } from './Line';

export const MiniEventCard = ({ data }) => {
  const { organiser, coverImage, date, name, address } = data;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(setUserSelected(data.organiser));
    dispatch(setSelectedEvent(data));
    navigation.navigate('EventDetails', { data });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <Image source={{ uri: organiser.profilePic }} style={styles.profilePic} />
          <Text style={styles.textOrganiserName}>{organiser.username}</Text>
        </View>
        <Line lineStyle={{ backgroundColor: COLORS.backGray }} />
        <View style={styles.event}>
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
          <View style={styles.eventInformation}>
            <Text style={styles.date}>{formatDate(date)}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
              {address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: SIZE * 12.5,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZE,
    marginTop: SIZE,
    borderRadius: SIZES.xxs,
    borderColor: COLORS.backGray,
    borderWidth: 0.5,
    width: WIDTH_DEVICE * 0.9,
    alignSelf: 'center',
    ...SHADOWS.medium,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZE / 2,
    marginBottom: SIZE / 2,
  },
  profilePic: {
    width: SIZE * 3,
    aspectRatio: 1,
    borderRadius: 100,
  },
  textOrganiserName: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
    marginLeft: SIZE / 2,
  },
  event: {
    marginTop: SIZE / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverImage: {
    width: SIZE * 7,
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
  },
  eventInformation: {
    width: SIZE * 13,
    paddingLeft: SIZE,
  },
  date: {
    color: COLORS.gray,
    fontSize: SIZES.xs,
  },
  name: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
  },
  address: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xxs,
  },
});
