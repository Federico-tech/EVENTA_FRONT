import { FontAwesome, Foundation, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import { getRefreshedEvent } from '../services/events';
import { checkPartecipating, getEventParticipants } from '../services/participants';
import { selectSelectedEvent, selectSelectedEventId } from '../store/event';
import { selectCurrentUserId, selectCurrentUserRole } from '../store/user';
import { EVENT_DATE_FORMAT, formatDate, TIME_FORMAT } from '../utils/dates';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { UserRow } from './AccountRow';
import { FollowButton } from './FollowButton';
import { Line } from './Line';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';
import { ReadMoreButton } from './TextButton';

export const EventBottomSheet = () => {
  const [participants, setParticipants] = useState();
  const [numberPart, setNumberPart] = useState();
  const [loading, setLoading] = useState(false);

  const event = useSelector(selectSelectedEvent);
  const eventId = useSelector(selectSelectedEventId);
  const role = useSelector(selectCurrentUserRole);
  const eventOrganiserId = event.organiserId;
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    getRefreshedEvent(event);
  }, [numberPart]);

  useEffect(() => {
    setNumberPart(event.participants);
  }, [event, numberPart]);

  useEffect(() => {
    setLoading(true);
    getEventParticipants(eventId, { limit: 3 })
      .then((result) => {
        setParticipants(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [numberPart]);

  return (
    <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
      <Row row alignCenter style={{ marginBottom: SIZE }}>
        <LoadingImage source={event.organiser.profilePic} style={styles.image} />
        <Row style={{ marginLeft: SIZE }}>
          <Text medium>{event.organiser.username}</Text>
          <Text color={COLORS.gray}>{event.organiser.name}</Text>
        </Row>
        <View style={{ marginLeft: SIZE * 3 }}>
          <FollowButton />
        </View>
      </Row>
      <Line />
      <Row row alignCenter style={{ marginTop: SIZE }}>
        <LoadingImage source={event.coverImage} style={styles.eventImage} />
        <Row style={{ marginLeft: SIZE, width: SIZE * 15 }}>
          <Text color={COLORS.gray} style={{ fontSize: SIZES.xs }}>
            {formatDate(event.date, EVENT_DATE_FORMAT)}
          </Text>
          <Text medium>{event.name}</Text>
          <Text color={COLORS.gray} style={{ fontSize: SIZES.xs }} numberOfLines={1} ellipsizeMode="tail">
            {event.address}
          </Text>
        </Row>
      </Row>
      <View>
        <ReadMoreButton text={event.description} style={styles.description} />
        <View style={styles.date}>
          <FontAwesome name="calendar-o" size={18} />
          <View style={{ marginHorizontal: WIDTH_DEVICE / 30 }}>
            <Text style={styles.dateText}>{formatDate(event.date, EVENT_DATE_FORMAT)}</Text>
            <Text style={styles.timeText}>{formatDate(event.date, TIME_FORMAT)}</Text>
          </View>
        </View>
        <View style={styles.place}>
          <Foundation name="marker" size={22} />
          <Text style={styles.adressText}>{event.address}</Text>
        </View>
        <View style={styles.person}>
          <Ionicons name="people-outline" size={24} />
          <Text style={styles.peopleText}>
            {numberPart}
            <Text style={styles.description}> of your friends are going</Text>
          </Text>
        </View>
        <Text style={styles.whoGoing}>Who's going?</Text>
        <Row>
          {loading ? (
            <ActivityIndicator style={{ marginTop: SIZE }} />
          ) : (
            participants?.slice(0, 3).map((participant) => <UserRow key={participant.user._id} data={participant.user} />)
          )}
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SIZE * 5,
    aspectRatio: 1,
    borderRadius: 100,
  },
  username: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
  },
  eventImage: {
    width: SIZE * 10,
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
  },
  imageContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: WIDTH_DEVICE,
    height: SIZE * 20,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
    marginTop: SIZE,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZE,
  },
  dateText: {
    fontFamily: 'InterMedium',
    fontSize: SIZES.xs,
  },
  timeText: {
    fontFamily: 'InterRegular',
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
  adressText: {
    marginLeft: SIZE,
    fontFamily: 'InterMedium',
    fontSize: SIZES.xs,
  },
  place: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZE,
    marginLeft: SIZE / 6,
  },
  peopleText: {
    marginLeft: WIDTH_DEVICE / 50,
    fontFamily: 'InterMedium',
    fontSize: SIZES.xs,
  },
  person: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HEIGHT_DEVICE / 70,
  },
  arrowStyle: {
    marginLeft: WIDTH_DEVICE / 40,
    marginTop: SIZE / 2,
  },
  dots: {
    marginTop: SIZE / 2,
    marginLeft: SIZE * 24.5,
  },
  other: {
    fontFamily: 'InterRegular',
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
  partButton: {
    width: WIDTH_DEVICE * 0.9,
    marginHorizontal: WIDTH_DEVICE / 20,
    marginBottom: SIZE,
    position: 'absolute',
    bottom: 0,
  },
  whoGoing: {
    marginTop: SIZE,
    fontFamily: FONTS.semiBold,
  },
  viewMore: {
    color: COLORS.primary,
    fontSize: SIZES.sm,
    fontFamily: FONTS.medium,
    alignSelf: 'center',
    marginTop: SIZE / 2,
    marginBottom: SIZE / 2,
  },
});
