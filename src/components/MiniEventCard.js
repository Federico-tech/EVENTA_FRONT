import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { setSelectedEvent } from '../store/event';
import { setUserSelected } from '../store/user';
import { formatDate, EVENT_DATE_FORMAT } from '../utils/dates';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const MiniEventCard = ({ data, closeSheet = () => {}, onPress, scan }) => {
  const { organiser, coverImage, date, name } = data;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(setUserSelected(data.organiser));
    dispatch(setSelectedEvent(data));
    navigation.navigate('EventDetails', { data });
    closeSheet();
  };

  return (
    <TouchableOpacity onPress={onPress ? onPress : handlePress}>
      <View style={styles.wrapper}>
        {/* <View style={styles.top}>
          <TouchableOpacity onPress={handleProfilePress}>
            <Row row alignCenter>
              <LoadingImage source={organiser?.profilePic} style={styles.profilePic} profile width={SIZE * 3} iconSIZE={SIZE * 1.5} />
              <Text style={styles.textOrganiserName}>{organiser?.username}</Text>
            </Row>
          </TouchableOpacity>
          <Row row alignCenter>
            {scan && (
              <Row row alignCenter>
                <MaterialCommunityIcons name="qrcode-scan" size={SIZE * 1.7} />
                <Text style={styles.textPart} mr={SIZE} ml={SIZE / 2}>
                  {formatShortNumber(scans)}
                </Text>
              </Row>
            )}
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ParticipantsScreen)}>
              <Row row alignCenter>
                <MaterialIcons name="person" size={SIZE * 2} />
                <Text style={styles.textPart}>{formatShortNumber(participants)}</Text>
              </Row>
            </TouchableOpacity>
          </Row>
        </View>
        <Line lineStyle={{ backgroundColor: COLORS.lightGray }} /> */}
        <Row row alignCenter spaceBetween>
          <View style={styles.event}>
            <LoadingImage source={coverImage} style={styles.coverImage} resizeMode="cover" indicator event width={SIZE * 8} />
            <View style={styles.eventInformation}>
              <Text style={styles.date}>{formatDate(date, EVENT_DATE_FORMAT)}</Text>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.address}>by @{organiser.username}</Text>
            </View>
          </View>
          {/* <Row>
         <AntDesign name="heart" style={{ marginRight: SIZE / 2}} size={SIZE * 1.7} color="red" />
        </Row> */}
        </Row>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZE,
    marginTop: SIZE,
    borderRadius: SIZES.md,
    borderColor: COLORS.lightGray,
    borderWidth: 0,
    padding: SIZE / 1.5,
    width: WIDTH_DEVICE * 0.9,
    alignSelf: 'center',
    ...SHADOWS.medium,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
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
