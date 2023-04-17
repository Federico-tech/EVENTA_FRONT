import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

import { Button, Container, IconButton, Line, LoadingImage, OrganiserInf, ReadMoreButton, Row, TextButton } from '../../../../components';
import { UserRow } from '../../../../components/AccountRow';
import { DiscountModal } from '../../../../components/DiscountModal';
import { ROUTES } from '../../../../navigation/Navigation';
import { getRefreshedEvent } from '../../../../services/events';
import { getEventParticipants, partecipate, unpartecipate } from '../../../../services/participants';
import { refreshSelectedUser } from '../../../../services/users';
import { selectSelectedEvent, selectSelectedEventId } from '../../../../store/event';
import { selectCurrentUserId, selectCurrentUserRole, selectSelectedUser } from '../../../../store/user';
import { EVENT_DATE_FORMAT, formatDate, TIME_FORMAT } from '../../../../utils/dates';
import mapStyle from '../../../../utils/mapStyle.json';
import { COLORS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, FONTS, SIZE } from '../../../../utils/theme';
import { EventDetailsBottomSheet } from './eventDetailsBottomSheet';

const EventDetailsParticipants = ({ isParticipating }) => {
  const event = useSelector(selectSelectedEvent);
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getRefreshedEvent(event);
      const res = await getEventParticipants(event?._id, { limit: 3 });
      setParticipants(res);
      setLoading(false);
      console.log('Part', res);
    };
    fetchData();
  }, [isParticipating]);

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{ marginTop: SIZE }} />
      ) : (
        participants?.slice(0, 3).map((participant) => <UserRow key={participant.user._id} data={participant.user} />)
      )}
      {participants?.length >= 3 && (
        <TextButton text="View More" style={styles.viewMore} onPress={() => navigation.navigate(ROUTES.ParticipantsScreen)} />
      )}
    </>
  );
};

const EventDetailsMap = ({ event, navigation }) => {

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MapNavigator', { screen: ROUTES.MapScreen, params: { event } })}>
    <View style={{ marginBottom: SIZE, marginTop: SIZE, borderRadius: SIZES.xxs }}>
      <MapView
        style={{ height: SIZE * 12, zIndex: 1, borderRadius: SIZES.xxs }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: event.position.coordinates[1],
          longitude: event.position.coordinates[0],
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        pointerEvents="auto"
        scrollEnabled={false}
        customMapStyle={mapStyle}>
        <Marker
          coordinate={{
            latitude: event.position.coordinates[1],
            longitude: event.position.coordinates[0],
          }}
          pinColor="red"
        />
      </MapView>
    </View>
  </TouchableOpacity>
  )
}

export const EventDetails = ({ route }) => {
  const { onGoBack } = route?.params || {};
  const [isOnPressParticipateLoading, setIsOnPressParticipateLoading] = useState(false);
  const [numberOfParticipants, setNumberOfParticipants] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const event = useSelector(selectSelectedEvent);
  const eventId = useSelector(selectSelectedEventId);
  const role = useSelector(selectCurrentUserRole);
  const eventOrganiserId = event.organiserId;
  const userId = useSelector(selectCurrentUserId);
  const organiser = event.organiser;
  const refreshedOrganiser = useSelector(selectSelectedUser);
  const bottomSheetModalRef = useRef(null);
  const [isParticipating, setIsParticipating] = useState();
  const [definitiveOrganiser, setDefinitiveOrganiser] = useState(refreshedOrganiser);

  const handlePresentModal = () => bottomSheetModalRef.current?.present();
  const toggleModal = () => setModalVisible(!isModalVisible);
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
    if (organiser._id === refreshedOrganiser._id) {
      setDefinitiveOrganiser(refreshedOrganiser);
    }
  }, [refreshedOrganiser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getRefreshedEvent(event).then((result) => {
          setIsParticipating(result.data.event.isParticipating);
        });
        await refreshSelectedUser(organiser);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [eventId]);

  const onPressPartecipate = async () => {
    setNumberOfParticipants(event.participants);
    setIsParticipating(true);
    setIsOnPressParticipateLoading(true);
    await partecipate();
    setIsOnPressParticipateLoading(false);
  };

  const onPressUnpartecipate = async () => {
    setNumberOfParticipants(event.participants);
    setIsParticipating(false);
    setIsOnPressParticipateLoading(true);
    await unpartecipate();
    setIsOnPressParticipateLoading(false);
  };

  const onPressNaviagtePosts = () => {
    navigation.navigate(ROUTES.PostsNavigator, { screen: ROUTES.PostsFeedScreen, params: { event } });
  };

  const onPressGoBack = () => {
    navigation.goBack();
    onGoBack?.(event);
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: SIZE * 4 }}>
          <View style={styles.eventBlurImage}>
            <LoadingImage source={event.coverImage} viewStyle={styles.eventBlurImage} blurRadius={10} event width={SIZE * 30} />
          </View>
          <Image source={{ uri: event.coverImage }} style={styles.eventImage} resizeMode="contain" />
          <IconButton name="chevron-back-outline" onPress={onPressGoBack} size={SIZE * 2} iconStyle={styles.arrowStyle} color="white" />
          <IconButton name="md-ellipsis-horizontal-sharp" size={SIZE * 2} iconStyle={styles.dots} color="white" onPress={handlePresentModal} />
          <View style={{ paddingHorizontal: WIDTH_DEVICE / 20, zIndex: 1, backgroundColor: COLORS.white }}>
            <OrganiserInf organiser={definitiveOrganiser} isLoading={isLoading} />
            <View style={{ marginHorizontal: 0 }}>
              <Line lineStyle={{ marginBottom: 0 }} />
            </View>
            <View>
              <Row row alignCenter spaceBetween style={{ marginTop: SIZE }}>
                <Text style={styles.eventTitle}>{event.name}</Text>
                {eventOrganiserId === userId && (
                  <MaterialCommunityIcons name="qrcode-scan" size={SIZE * 2} onPress={() => navigation.navigate(ROUTES.ScannerScreen)} />
                )}
              </Row>
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
              <TextButton text="view moments" onPress={onPressNaviagtePosts} />
              <EventDetailsMap navigation={navigation} event={event}/>
              <Text style={styles.whoGoing}>Who's going?</Text>
            </View>
            <Row>
              <EventDetailsParticipants numberOfParticipants={numberOfParticipants} isParticipating={isParticipating} />
            </Row>
          </View>
        </View>
      </ScrollView>
      <Row row alignCenter style={styles.partButton} spaceBetween>
        {role === 'user' &&
          (isParticipating ? (
            <>
              <Button
                secondary
                containerStyle={{ width: SIZE * 24 }}
                text="Im going"
                onPress={onPressUnpartecipate}
                loading={isLoading}
                disabled={isOnPressParticipateLoading}
              />
              <MaterialCommunityIcons name="brightness-percent" size={SIZE * 2} color={COLORS.primary} onPress={toggleModal} />
            </>
          ) : (
            <>
              <Button
                gradient
                containerStyle={{ width: SIZE * 24 }}
                text="Im going"
                onPress={onPressPartecipate}
                loading={isLoading}
                disabled={isOnPressParticipateLoading}
              />
              <MaterialCommunityIcons name="brightness-percent" size={SIZE * 2} color={COLORS.primary} onPress={toggleModal} />
            </>
          ))}
      </Row>
      <BottomSheetModal
        enablePanDownToClose
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={organiser._id === userId ? ['17%'] : ['13%']}
        backdropComponent={renderBackdrop}>
        <EventDetailsBottomSheet closeSheet={handleClosePress} userId={userId} organiserId={organiser._id} eventId={event._id} />
      </BottomSheetModal>
      <DiscountModal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} event={event} />
    </Container>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: WIDTH_DEVICE,
    height: SIZE * 20,
    marginTop: SIZE * 3,
  },
  eventBlurImage: {
    height: SIZE * 23,
    width: WIDTH_DEVICE / 1,
    alignItems: 'center',
    zIndex: -1,
  },
  eventImage: {
    height: SIZE * 20,
    position: 'absolute',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: SIZE * 3,
  },
  eventTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: SIZES.xl,
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
    marginBottom: SIZE * 18,
    bottom: 0,
    position: 'absolute',
  },
  dots: {
    marginHorizontal: WIDTH_DEVICE / 40,
    marginBottom: SIZE * 18,
    alignSelf: 'flex-end',
    bottom: 0,
    position: 'absolute',
    paddingRight: SIZE,
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
  blur: {
    height: SIZE * 20,
    width: SIZE * 20,
  },

  mapButton: {
    position: 'absolute',
    width: SIZE * 2.5,
    height: SIZE * 2.5,
    backgroundColor: COLORS.white,
    zIndex: 2,
    borderRadius: SIZES.xxs,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: SIZE * 9,
    marginLeft: SIZE * 23.9,
  },
});
