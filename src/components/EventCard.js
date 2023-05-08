import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

import { mainAxios } from '../core/axios';
import { ROUTES } from '../navigation/Navigation';
import { like, unLike } from '../services/likes';
import { setSelectedEvent } from '../store/event';
import { setUserSelected } from '../store/user';
import { EVENT_DATE_FORMATR_NOYEAR, formatDate } from '../utils/dates';
import { formatShortNumber } from '../utils/numbers';
import { COLORS, FONTS, SHADOWS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const useGetParticipants = (eventId) => {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const fetchData = useCallback(() => {
    const params = {
      eventId,
      limit: 3,
    };
    mainAxios
      .get('participants', { params })
      .then(({ data }) => {
        setData(data?.data || []);
        setTotalData(data?.totalData || 0);
      })
      .catch((e) => console.debug({ errorGetParticipants: e }));
  }, [eventId]);

  useEffect(fetchData, [fetchData]);

  return {
    data,
    totalData,
    fetchData,
  };
};

export const EventCard = ({ eventData }) => {
  // const [eventData, setEventData] = useState(initialEventData);
  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState();
  const [isLikePressLoading, setIsLikePressLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleParticipantsPress = () => {
    dispatch(setSelectedEvent(eventData));
    navigation.navigate(ROUTES.ParticipantsScreen);
  };

  const { data, fetchData: getParticipants, totalData } = useGetParticipants(eventData._id);

  const handleOnPress = () => {
    dispatch(setUserSelected(eventData.organiser));
    dispatch(setSelectedEvent(eventData));
    navigation.navigate('EventDetails', {
      eventData,
      participants: totalData,
      onGoBack: () => {
        getParticipants();
      },
    });
  };

  useEffect(() => {
    setLikes(eventData.likes);
    setIsLiked(eventData.hasLiked);
  }, [eventData]);

  const onPresslike = async () => {
    Haptics.selectionAsync();
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

  const onPressOrganiser = () => {
    dispatch(setUserSelected(eventData.organiser));
    navigation.navigate(ROUTES.AccountUserScreen);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={handleOnPress} activeOpacity={0.8}>
        <LoadingImage source={eventData.coverImage} style={styles.eventImage} resizeMode="cover" indicator event width="100%" />
      </TouchableOpacity>
      <View style={{ marginHorizontal: SIZE * 2 }}>
        <View style={styles.descContainer}>
          <View style={styles.informationContainer}>
            <TouchableOpacity onPress={onPressOrganiser}>
              <LoadingImage source={eventData.organiser?.profilePic} profile width={SIZE * 3.7} iconSIZE={SIZE * 2} />
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <TouchableOpacity onPress={handleOnPress}>
                <Text style={styles.textTitle}>{eventData.name}</Text>
                <View>
                  <Text style={styles.textAdress} numberOfLines={1} ellipsizeMode="tail">
                    by @{eventData.organiser?.username}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.likeContainer}>
            <Text style={{ marginRight: SIZE / 3, fontFamily: FONTS.medium, fontSize: SIZES.sm }}>{formatShortNumber(likes)}</Text>
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
          <Row row alignCenter>
            <Row row style={[{ alignItems: 'center', marginLeft: SIZE, marginRight: SIZE / 3 }, totalData === 0 && { marginLeft: 0 }]}>
              {data?.slice(0, 3).map((data) => (
                <LoadingImage key={data?.user._id} source={data?.user.profilePic} imageStyle={styles.partImage} profile iconSIZE={SIZE * 1.3} />
              ))}
            </Row>
            <Text style={[styles.textAdress, { color: 'black', fontFamily: FONTS.semiBold }]}>
              {totalData > 3 ? `+${formatShortNumber(totalData)}` : formatShortNumber(totalData)}{' '}
            </Text>
            <Text style={[styles.textAdress, { color: 'black' }]}>
              {totalData === 0 ? 'participants' : totalData === 1 ? 'participant' : 'participants'}
            </Text>
          </Row>
          <Row row alignCenter>
            <Feather name="calendar" size={18} color={COLORS.gray} />
            <Text style={styles.textAdress}> {formatDate(eventData.date, EVENT_DATE_FORMATR_NOYEAR)}</Text>
            <View style={styles.dot} />
            <Text style={styles.textAdress}>{eventData?.address?.city}</Text>
          </Row>
        </Row>
      </View>
    </View>
  );
};

export const MostPopularEventCard = ({ eventData }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(setUserSelected(eventData.organiser));
    dispatch(setSelectedEvent(eventData));
    navigation.navigate('EventDetails', {
      eventData,
    });
  };

  const { data } = useGetParticipants(eventData?._id);

  console.log('data', data);

  return (
    <>
      <TouchableOpacity onPress={handleOnPress} activeOpacity={0.7}>
        <Row style={{ height: SIZE * 17, width: WIDTH_DEVICE }}>
          <View>
            <LoadingImage
              event
              width={WIDTH_DEVICE}
              imageStyle={{ aspectRatio: 1.6, borderRadius: 0 }}
              source={eventData?.coverImage}
              viewStyle={{ aspectRatio: 1.6 }}
              indicator
            />
            <LinearGradient style={styles.imageGradient} colors={['rgba(0, 0, 0, 0.3)', 'transparent', 'transparent', 'rgba(0, 0, 0, 0.3)']} />
          </View>
          <Row style={styles.info}>
            <Row>
              <Text color={COLORS.white} ff={FONTS.semiBold} fs={SIZES.sm}>
                Most popular
              </Text>
            </Row>
            <Row row alignCenter width={WIDTH_DEVICE} ml={SIZE} style={{ justifyContent: 'flex-end', marginRight: SIZE }}>
              <Row row mr={SIZE * 2}>
                {data?.map((data) => (
                  <LoadingImage
                    key={data.user._id}
                    source={data?.user.profilePic}
                    imageStyle={[styles.partImage, { width: SIZE * 3.2, borderWidth: 1.5 }]}
                    profile
                    iconSIZE={SIZE * 1.3}
                  />
                ))}
                <Row width={SIZE} />
              </Row>
            </Row>
          </Row>
        </Row>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: SIZE * 35.8,
    backgroundColor: COLORS.white,
    width: WIDTH_DEVICE * 0.9,
    marginHorizontal: WIDTH_DEVICE / 20,
    ...SHADOWS.medium,
    marginBottom: SIZE,
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
    height: 0.5,
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
  mostPopularEventParticipants: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  info: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    margin: SIZE,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageGradient: {
    width: '100%',
    height: '100%',
    zIndex: 3,
    position: 'absolute',
  },
});
