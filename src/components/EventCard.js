import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { like, unLike } from '../services/likes';
import { setSelectedEvent } from '../store/event';
import { setUserSelected } from '../store/user';
import { EVENT_DATE_FORMATR_NOYEAR, formatDate } from '../utils/dates';
import { useInfiniteScroll } from '../utils/hooks';
import { COLORS, FONTS, SHADOWS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';

export const EventCard = ({ eventData }) => {
  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState();
  const [isLikePressLoading, setIsLikePressLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(setUserSelected(eventData.organiser));
    dispatch(setSelectedEvent(eventData));
    navigation.navigate('EventDetails', { eventData });
  };

  const handleParticipantsPress = () => {
    dispatch(setSelectedEvent(eventData));
    navigation.navigate(ROUTES.ParticipantsScreen);
  };

  const { data, totalData } = useInfiniteScroll({
    entity: `participants`,
    filters: {
      eventId: eventData._id,
    },
    limit: 3,
  });

  useEffect(() => {
    setLikes(eventData.likes);
    setIsLiked(eventData.hasLiked);
  }, [eventData]);

  const onPresslike = async () => {
    setLikes(likes + 1);
    setIsLiked(true);
    setIsLikePressLoading(true);
    await like(eventData._id);
    setIsLikePressLoading(false);
  };

  const onPressUnlike = async () => {
    setLikes(likes - 1);
    setIsLiked(false);
    setIsLikePressLoading(true);
    await unLike(eventData._id);
    setIsLikePressLoading(false);
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.cardContainer}>
        <LoadingImage source={eventData.coverImage} style={styles.eventImage} resizeMode="cover" indicator event width="100%" />
        <View style={{ marginHorizontal: SIZE * 2 }}>
          <View style={styles.descContainer}>
            <View style={styles.informationContainer}>
              <LoadingImage source={eventData.organiser?.profilePic} profile width={SIZE * 4} />
              <View style={styles.textContainer}>
                <Text style={styles.textTitle}>{eventData.name}</Text>
                <View>
                  <Text style={styles.textAdress} numberOfLines={1} ellipsizeMode="tail">
                    by @{eventData.organiser?.name}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.likeContainer}>
              <Text style={{ marginRight: SIZE / 3, fontFamily: FONTS.medium }}>{likes}</Text>
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
          </View>
          <View style={styles.line} />
          <Row row alignCenter spaceBetween style={{ height: SIZE * 2 }}>
            <TouchableOpacity onPress={handleParticipantsPress}>
              <Row row alignCenter>
                <Row row style={[{ alignItems: 'center', marginLeft: SIZE, marginRight: SIZE / 3 }, totalData === 0 && { marginLeft: 0 }]}>
                  {data?.slice(0, 3).map((data) => (
                    <Image key={data?.user._id} source={{ uri: data?.user.profilePic }} style={styles.partImage} />
                  ))}
                </Row>
                <Text style={[styles.textAdress, { color: 'black', fontFamily: FONTS.semiBold }]}>
                  {totalData > 3 ? `+${totalData}` : totalData}{' '}
                </Text>
                <Text style={[styles.textAdress, { color: 'black' }]}>
                  {totalData === 0 ? 'participants' : totalData === 1 ? 'participant' : 'participants'}
                </Text>
              </Row>
            </TouchableOpacity>
            <Row row alignCenter>
              <Feather name="calendar" size={18} color={COLORS.gray} />
              <Text style={styles.textAdress}> {formatDate(eventData.date, EVENT_DATE_FORMATR_NOYEAR)}</Text>
              <View style={styles.dot} />
              <Text style={styles.textAdress}>{eventData?.address?.city}</Text>
            </Row>
          </Row>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: SIZE * 35.8,
    backgroundColor: COLORS.white,
    width: WIDTH_DEVICE * 0.9,
    marginHorizontal: WIDTH_DEVICE / 20,
    ...SHADOWS.medium,
    marginBottom: SIZE * 1.5,
    alignSelf: 'center',
    borderRadius: SIZES.xxs,
    borderWidth: 0,
    borderColor: COLORS.lightGray,
    alignItems: 'center',
  },
  eventImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
  },

  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZE / 1.5,
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
    textTransform: 'uppercase',
  },
  textAdress: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xxs,
    color: COLORS.gray,
  },
  likeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  eventImageView: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
    backgroundColor: COLORS.lightGray,
  },
  line: {
    height: 0.8,
    width: SIZE * 25,
    backgroundColor: COLORS.lightGray,
    alignSelf: 'center',
    marginVertical: SIZE / 1.5,
  },
  partImage: {
    width: SIZE * 2.2,
    aspectRatio: 1,
    borderRadius: 100,
    marginLeft: -SIZE,
    borderWidth: 2.5,
    borderColor: COLORS.white,
  },
  dot: {
    backgroundColor: COLORS.gray,
    width: SIZE / 3,
    aspectRatio: 1,
    marginHorizontal: SIZE / 3,
    borderRadius: 100,
  },
});
