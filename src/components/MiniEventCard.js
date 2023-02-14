import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { getRefreshedEvent } from '../services/events';
import { setUserSelected } from '../store/user';
import { formatDate } from '../utils/dates';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { Line } from './Line';
import { Row } from './Row';

export const MiniEventCard = ({ data }) => {
  const { organiser, coverImage, date, name, address, participants } = data;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(setUserSelected(data.organiser));
    getRefreshedEvent(data);
    navigation.navigate('EventDetails', { data });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <Row row alignCenter>
            <Image source={{ uri: organiser.profilePic }} style={styles.profilePic} />
            <Text style={styles.textOrganiserName}>{organiser.username}</Text>
          </Row>
          <Row row alignCenter style={{}}>
            <MaterialIcons name="person" size={SIZE * 2} />
            <Text style={styles.textPart}>{participants}</Text>
          </Row>
        </View>
        <Line lineStyle={{ backgroundColor: COLORS.lightGray }} />
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
    borderColor: COLORS.lightGray,
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
    justifyContent: 'space-between',
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
  textPart: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.sm,
  },
});
