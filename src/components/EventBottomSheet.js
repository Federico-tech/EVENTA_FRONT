import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { getRefreshedEvent } from '../services/events';
import { follow, unFollow } from '../services/follow';
import { refreshSelectedUser } from '../services/users';
import { selectSelectedEvent, selectSelectedEventId, setSelectedEvent } from '../store/event';
import { selectCurrentUserRole, selectSelectedUser, setUserSelected } from '../store/user';
import { EVENT_DATE_FORMAT, formatDate } from '../utils/dates';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { Button } from './Button';
import { Line } from './Line';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const EventBottomSheet = ({ scroll, closeSheet }) => {
  const [loading, setLoading] = useState(false);
  const [isFollowingPressLoading, setIsFollowingPressLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState();

  const event = useSelector(selectSelectedEvent);
  const eventId = useSelector(selectSelectedEventId);
  const organiser = useSelector(selectSelectedUser);
  const role = useSelector(selectCurrentUserRole);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getRefreshedEvent(event);
      await refreshSelectedUser(organiser);
      setLoading(false);
    };
    fetchData();
  }, [eventId]);

  useEffect(() => {
    setLoading(true);
    refreshSelectedUser(event.organiser);
    setIsFollowing(organiser.isFollowing);
    setLoading(false);
  }, [event]);

  const onPressFollow = async () => {
    Haptics.selectionAsync();
    setIsFollowing(true);
    setIsFollowingPressLoading(true);
    await follow();
    setIsFollowingPressLoading(false);
  };
  const onPressUnfollow = async () => {
    setIsFollowing(false);
    setIsFollowingPressLoading(true);
    await unFollow();
    setIsFollowingPressLoading(false);
  };

  const handleOrganiserProfileNavigation = () => {
    navigation.navigate(ROUTES.AccountOrganiserScreen);
    closeSheet();
  };

  const onPressEvent = () => {
    navigation.navigate(ROUTES.EventDetails, { participants: undefined });
    dispatch(setUserSelected(event.organiser));
    dispatch(setSelectedEvent(event));
    closeSheet();
  };

  return (
    <ScrollView scrollEnabled={scroll}>
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
        <Row row alignCenter style={{ marginBottom: SIZE * 1.5, marginTop: SIZE / 2 }} spaceBetween>
          <TouchableOpacity onPress={handleOrganiserProfileNavigation}>
            <Row row alignCenter>
              <LoadingImage source={event.organiser.profilePic} profile width={SIZE * 4} iconSIZE={SIZE * 3} />
              <Row style={{ marginLeft: SIZE }}>
                <Text medium fs={SIZES.md}>
                  {event.organiser.username}
                </Text>
                <View style={{ width: SIZE * 13 }}>
                  <Text style={styles.addressText}>{organiser.name}</Text>
                </View>
              </Row>
            </Row>
          </TouchableOpacity>
          <View>
            {role === 'user' &&
              (isFollowing ? (
                <Button
                  secondary
                  text="Following"
                  onPress={onPressUnfollow}
                  containerStyle={{ width: SIZE * 9 }}
                  loading={loading}
                  disabled={isFollowingPressLoading || loading}
                />
              ) : (
                <Button
                  gradient
                  text="Follow"
                  onPress={onPressFollow}
                  containerStyle={{ width: SIZE * 9 }}
                  loading={loading}
                  disabled={isFollowingPressLoading || loading}
                />
              ))}
          </View>
        </Row>
        <Line />
        <TouchableOpacity onPress={onPressEvent}>
          <View style={styles.event}>
            <LoadingImage source={event.coverImage} style={styles.coverImage} resizeMode="cover" indicator event width={SIZE * 8} />
            <View style={styles.eventInformation}>
              <Text style={styles.date}>{formatDate(event.date, EVENT_DATE_FORMAT)}</Text>
              <Text style={styles.name}>{event.name}</Text>
              <Text style={styles.address}>by @{organiser.username}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  username: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
  },

  imageContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: WIDTH_DEVICE,
    height: SIZE * 20,
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
    marginTop: SIZE * 1.5,
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
  addressText: {
    color: COLORS.gray,
    fontSize: SIZES.xxs,
  },
});
