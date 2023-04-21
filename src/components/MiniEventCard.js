import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { setSelectedEvent } from '../store/event';
import { setUserSelected } from '../store/user';
import { formatDate, EVENT_DATE_FORMAT } from '../utils/dates';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { Line } from './Line';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';

export const MiniEventCard = ({ data, closeSheet = () => {}, onPress }) => {
  const { organiser, coverImage, date, name, participants } = data;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(setUserSelected(data.organiser));
    dispatch(setSelectedEvent(data));
    navigation.navigate('EventDetails', { data });
    closeSheet();
  };

  const handleProfilePress = () => {
    navigation.navigate(ROUTES.AccountOrganiserScreen);
    dispatch(setUserSelected(data.organiser));
    closeSheet();
  };

  return (
    <TouchableOpacity onPress={onPress ? onPress : handlePress}>
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <TouchableOpacity onPress={handleProfilePress}>
            <Row row alignCenter>
              <LoadingImage source={organiser?.profilePic} style={styles.profilePic} profile width={SIZE * 3} iconSIZE={SIZE * 1.5} />
              <Text style={styles.textOrganiserName}>{organiser?.username}</Text>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ParticipantsScreen)}>
            <Row row alignCenter>
              <MaterialIcons name="person" size={SIZE * 2} />
              <Text style={styles.textPart}>{participants}</Text>
            </Row>
          </TouchableOpacity>
        </View>
        <Line lineStyle={{ backgroundColor: COLORS.lightGray }} />
        <View style={styles.event}>
          <LoadingImage source={coverImage} style={styles.coverImage} resizeMode="cover" indicator event width={SIZE * 7} />
          <View style={styles.eventInformation}>
            <Text style={styles.date}>{formatDate(date, EVENT_DATE_FORMAT)}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
              {data?.address?.city}
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
    borderRadius: SIZES.md,
    borderColor: COLORS.lightGray,
    borderWidth: 0,
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
    textTransform: 'uppercase',
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
