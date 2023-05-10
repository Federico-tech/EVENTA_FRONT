import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { like, unLike } from '../services/likes';
import { setSelectedEvent } from '../store/event';
import { setUserSelected } from '../store/user';
import { formatDate, EVENT_DATE_FORMAT } from '../utils/dates';
import { formatShortNumber } from '../utils/numbers';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const MiniEventCard = ({ data, closeSheet = () => {}, onPress, scan }) => {
  const [likes, setLikes] = useState();
  const [isLiked, setIsLiked] = useState();
  const [isLikePressLoading, setIsLikePressLoading] = useState(false);
  const { organiser, coverImage, date, name } = data;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = () => {
    closeSheet()
    dispatch(setUserSelected(data.organiser));
    dispatch(setSelectedEvent(data));
    navigation.navigate('EventDetails', { data });
  };

  useEffect(() => {
    setLikes(data.likes);
    setIsLiked(data.hasLiked);
  }, [data]);

  const onPresslike = async () => {
    setLikes(likes + 1);
    setIsLiked(true);
    setIsLikePressLoading(true);
    await like(data._id);
    setIsLikePressLoading(false);
  };

  const onPressUnlike = async () => {
    setLikes(likes - 1);
    setIsLiked(false);
    setIsLikePressLoading(true);
    await unLike(data._id);
    setIsLikePressLoading(false);
  };

  return (
    <TouchableOpacity onPress={onPress ? onPress : handlePress} activeOpacity={0.8}>
      <View style={styles.wrapper}>
        <Row row alignCenter spaceBetween>
          <View style={styles.event}>
            <LoadingImage source={coverImage} style={styles.coverImage} resizeMode="cover" indicator event width={SIZE * 8} />
            <View style={styles.eventInformation}>
              <Text style={styles.date}>{formatDate(date, EVENT_DATE_FORMAT)}</Text>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.address}>by @{organiser?.username}</Text>
            </View>
          </View>
          <View style={styles.likeContainer}>
            <Text style={{ marginRight: SIZE / 3, fontFamily: FONTS.medium }} fs={SIZES.sm}>{formatShortNumber(likes)}</Text>
            {isLiked ? (
              <TouchableOpacity onPress={onPressUnlike} disabled={isLikePressLoading}>
                <AntDesign name="heart" iconStyle={styles.icon} size={SIZE * 1.7} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onPresslike} disabled={isLikePressLoading}>
                <AntDesign name="hearto" iconStyle={styles.icon} size={SIZE * 1.7} />
              </TouchableOpacity>
            )}
          </View>
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
  likeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
