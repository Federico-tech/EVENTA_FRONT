import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { Button, Container, IconButton, Line, OrganiserInf, ReadMoreButton, Row, TextButton } from '../../../../components';
import { UserRow } from '../../../../components/AccountRow';
import { ROUTES } from '../../../../navigation/Navigation';
import { getRefreshedEvent } from '../../../../services/events';
import { checkPartecipating, getEventParticipants, partecipate, unpartecipate } from '../../../../services/participants';
import { selectSelectedEvent, selectSelectedEventId } from '../../../../store/event';
import { formatDate, formatTime } from '../../../../utils/dates';
import { COLORS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, FONTS, SIZE } from '../../../../utils/theme';

export const EventDetails = ({ route }) => {
  const [isPartecipating, setIsPartecipating] = useState();
  const [participants, setParticipants] = useState();

  const navigation = useNavigation();
  // const { data: event } = route.params
  // console.log('Event', event)
  const event = useSelector(selectSelectedEvent);
  const eventId = useSelector(selectSelectedEventId);

  useEffect(() => {
    getRefreshedEvent(event);
  }, []);

  useEffect(() => {
    checkPartecipating().then((result) => {
      setIsPartecipating(result);
    });
  }, []);

  useEffect(() => {
    getEventParticipants(eventId).then((result) => {
      setParticipants(result);
    });
  }, [event]);

  const onPressPartecipate = () => {
    partecipate();
    setIsPartecipating(true);
  };

  const onPressUnpartecipate = () => {
    unpartecipate();
    setIsPartecipating(false);
  };

  const source = { uri: event.coverImage };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.imageContainer}>
              <Image source={source} style={styles.eventImage} resizeMode="contain" />
              <IconButton
                name="chevron-back-outline"
                onPress={() => navigation.goBack()}
                size={SIZE * 2}
                iconStyle={styles.arrowStyle}
                color="white"
              />
            </View>
            <OrganiserInf data={event} />
            <Line />
            <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
              <Text style={styles.eventTitle}>{event.name}</Text>
              <ReadMoreButton text={event.description} style={styles.description} />
              <View style={styles.date}>
                <FontAwesome name="calendar-o" size={18} />
                <View style={{ marginHorizontal: WIDTH_DEVICE / 30 }}>
                  <Text style={styles.dateText}>{formatDate(event.date)}</Text>
                  <Text style={styles.timeText}>{formatTime(event.date)}</Text>
                </View>
              </View>
              <View style={styles.place}>
                <Foundation name="marker" size={22} />
                <Text style={styles.adressText}>{event.address}</Text>
              </View>
              <View style={styles.person}>
                <Ionicons name="people-outline" size={24} />
                <Text style={styles.peopleText}>
                  {event.participants}
                  <Text style={styles.description}> of your friends are going</Text>
                </Text>
              </View>
              <Text style={styles.whoGoing}>Who's going?</Text>
            </View>
            <Row>
              {participants?.length >= 1 && <UserRow data={participants?.[0]?.user} />}
              {participants?.length >= 2 && <UserRow data={participants?.[1]?.user} />}
              {participants?.length === 3 && <UserRow data={participants?.[2]?.user} />}
            </Row>
            <TextButton text="View More" style={styles.viewMore} onPress={() => navigation.navigate(ROUTES.ParticipantsScreen)} />
          </View>
        </ScrollView>
        {isPartecipating ? (
          <Button secondary containerStyle={styles.partButton} text="Im going" onPress={onPressUnpartecipate} />
        ) : (
          <Button gradient containerStyle={styles.partButton} text="Im going" onPress={onPressPartecipate} />
        )}
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: WIDTH_DEVICE,
    height: SIZE * 20,
  },
  eventImage: {
    height: SIZE * 20,
    width: WIDTH_DEVICE / 1,
    alignItems: 'center',
    position: 'absolute',
  },
  eventTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: SIZES.xl,
    marginTop: SIZE,
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
    marginHorizontal: WIDTH_DEVICE / 40,
    marginTop: HEIGHT_DEVICE / 100,
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
