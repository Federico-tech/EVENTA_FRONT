import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Button, Container, IconButton, Line, OrganiserInf, ReadMoreButton, Row, TextButton } from '../../../../components';
import { UserRow } from '../../../../components/AccountRow';
import { ROUTES } from '../../../../navigation/Navigation';
import { getRefreshedEvent } from '../../../../services/events';
import { getEventParticipants, partecipate, unpartecipate } from '../../../../services/participants';
import { refreshSelectedUser } from '../../../../services/users';
import { selectSelectedEvent, selectSelectedEventId } from '../../../../store/event';
import { selectCurrentUserId, selectCurrentUserRole, selectSelectedUser } from '../../../../store/user';
import { EVENT_DATE_FORMAT, formatDate, TIME_FORMAT } from '../../../../utils/dates';
import { COLORS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, FONTS, SIZE } from '../../../../utils/theme';

export const EventDetails = ({ route }) => {
  const [participants, setParticipants] = useState();
  const [numberPart, setNumberPart] = useState();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const event = useSelector(selectSelectedEvent);
  const eventId = useSelector(selectSelectedEventId);
  const role = useSelector(selectCurrentUserRole);
  const eventOrganiserId = event.organiserId;
  const userId = useSelector(selectCurrentUserId);
  const organiser = event.organiser;
  const refOrganiser = useSelector(selectSelectedUser);

  const [defOrganiser, setDefOrganiser] = useState(refOrganiser);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['13%'];

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleClosePress = () => bottomSheetModalRef.current.close();

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  );

  useEffect(() => {
    if (organiser._id === refOrganiser._id) {
      setDefOrganiser(refOrganiser);
    }
  }, [refOrganiser]);

  useEffect(() => {
    getRefreshedEvent(event);
    refreshSelectedUser(organiser);
  }, [numberPart, event.participants]);

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
  }, [event.participants]);

  const onPressPartecipate = () => {
    partecipate();
    setNumberPart(event.participants);
  };

  const onPressUnpartecipate = () => {
    unpartecipate();
    setNumberPart(event.participants);
  };

  const onPressEditEvent = () => {
    navigation.navigate(ROUTES.EditEventScreen);
    handleClosePress();
  };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: SIZE * 4 }}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: event.coverImage }} style={styles.eventImage} resizeMode="contain" />
              <IconButton
                name="chevron-back-outline"
                onPress={() => navigation.goBack()}
                size={SIZE * 2}
                iconStyle={styles.arrowStyle}
                color="white"
              />
              {eventOrganiserId === userId && (
                <IconButton name="md-ellipsis-horizontal-sharp" size={SIZE * 2} iconStyle={styles.dots} color="white" onPress={handlePresentModal} />
              )}
            </View>
            <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
              <OrganiserInf organiser={defOrganiser} />
              <View style={{ marginHorizontal: 0 }}>
                <Line lineStyle={{ marginBottom: 0 }} />
              </View>
              <View>
                <Text style={styles.eventTitle}>{event.name}</Text>
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
                  <Text style={styles.adressText}>{event?.address?.fullAddress}</Text>
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
                {loading ? (
                  <ActivityIndicator style={{ marginTop: SIZE }} />
                ) : (
                  participants?.slice(0, 3).map((participant) => <UserRow key={participant.user._id} data={participant.user} />)
                )}
              </Row>
              {participants?.length >= 3 && (
                <TextButton text="View More" style={styles.viewMore} onPress={() => navigation.navigate(ROUTES.ParticipantsScreen)} />
              )}
            </View>
          </View>
        </ScrollView>
        {role === 'user' &&
          (event.isParticipating ? (
            <Button secondary containerStyle={styles.partButton} text="Im going" onPress={onPressUnpartecipate} />
          ) : (
            <Button gradient containerStyle={styles.partButton} text="Im going" onPress={onPressPartecipate} />
          ))}
      </SafeAreaView>
      <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          <TouchableOpacity onPress={onPressEditEvent}>
            <Row row alignCenter style={{ marginTop: SIZE }}>
              <AntDesign name="edit" size={SIZE * 2} />
              <Text regularSm style={{ marginLeft: SIZE }}>
                Edit this event
              </Text>
            </Row>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
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
