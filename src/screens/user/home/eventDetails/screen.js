import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

import { Button, Container, IconButton, Line, LoadingImage, OrganiserInf, ReadMoreButton, Row, Text, TextButton } from '../../../../components';
import { UserColumn } from '../../../../components/AccountRow';
import { DiscountModal } from '../../../../components/DiscountModal';
import { MiniPostCard } from '../../../../components/MiniPostCard';
import { ROUTES } from '../../../../navigation/Navigation';
import { getRefreshedEvent } from '../../../../services/events';
import { getEventParticipants, partecipate, unpartecipate } from '../../../../services/participants';
import { refreshSelectedUser } from '../../../../services/users';
import { selectSelectedEvent, selectSelectedEventId } from '../../../../store/event';
import { selectCurrentUserId, selectCurrentUserRole, selectSelectedUser } from '../../../../store/user';
import { EVENT_DATE_FORMAT, formatDate, TIME_FORMAT } from '../../../../utils/dates';
import { useInfiniteScroll } from '../../../../utils/hooks';
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
      const res = await getEventParticipants(event?._id, { queryParams: { limit: 10 } });
      setParticipants(res);
      setLoading(false);
    };
    fetchData();
  }, [isParticipating]);

  return (
    <>
      {loading ? (
        <View style={{ height: SIZE * 6, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator style={{ marginTop: SIZE / 2 }} />
        </View>
      ) : (
        <Row row alignCenter>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            {participants?.slice(0, 3).map((participant) => (
              <UserColumn key={participant.user._id} data={participant.user} />
            ))}
            {participants?.length >= 9 && (
              <TextButton text="View More" style={styles.viewMore} onPress={() => navigation.navigate(ROUTES.ParticipantsScreen)} />
            )}
          </ScrollView>
        </Row>
      )}
    </>
  );
};

const EventDetailsMap = ({ event, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MapNavigator', { screen: ROUTES.MapScreen, params: { event, key: Math.random() * 100 } })}>
      <View style={{ marginBottom: SIZE, marginTop: SIZE * 2, borderRadius: SIZES.xxs }}>
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
  );
};

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

  const { data } = useInfiniteScroll({
    entity: `events/${eventId}/posts`,
    limit: 6,
  });

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
        onPress={handleClosePress}
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

  const onPressGoBack = () => {
    navigation.goBack();
    onGoBack?.(event);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      onGoBack?.(event);
    });
    return unsubscribe;
  }, [navigation, onPressGoBack]);

  const onPressNavigatePosts = () => {
    navigation.navigate(ROUTES.PostsFeedScreen, { event });
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: SIZE }}>
          <View>
            <LoadingImage source={event.coverImage} width="100%" event />
            <LinearGradient style={styles.imageGradient} colors={['rgba(0, 0, 0, 0.5)', 'transparent', 'transparent', 'rgba(0, 0, 0, 0.5)']} />
          </View>
          <IconButton name="chevron-back-outline" onPress={onPressGoBack} size={SIZE * 2} iconStyle={styles.arrowStyle} color="white" />
          <IconButton name="md-ellipsis-horizontal-sharp" size={SIZE * 2} iconStyle={styles.dots} color="white" onPress={handlePresentModal} />
          <View
            style={{
              paddingHorizontal: WIDTH_DEVICE / 20,
              zIndex: 2,
              backgroundColor: COLORS.white,
              marginTop: -SIZE * 1.5,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <OrganiserInf organiser={definitiveOrganiser} isLoading={isLoading} />

            <View style={{ marginHorizontal: 0 }}>
              <Line lineStyle={{ marginBottom: 0 }} />
            </View>
          </View>
          <Row style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
            <Row row alignCenter spaceBetween style={{ marginTop: SIZE }}>
              <Text style={styles.eventTitle}>{event.name}</Text>
              {eventOrganiserId === userId && (
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ScannerScreen)}>
                  <MaterialCommunityIcons name="qrcode-scan" size={SIZE * 2} />
                </TouchableOpacity>
              )}
            </Row>
            <ReadMoreButton subString={45} text={event.description} style={styles.description} />
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
                <Text style={styles.description}> people are participating</Text>
              </Text>
            </View>
          </Row>
        </View>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          {data.length !== 0 && (
            <>
              <Row row alignCenter spaceBetween mb={SIZE}>
                <Text ff={FONTS.semiBold} fs={SIZES.sm}>
                  Moments
                </Text>
                <TouchableOpacity onPress={onPressNavigatePosts}>
                  <Row row alignCenter>
                    <TextButton text="View all" textStyle={{ width: SIZE * 4, fontSize: SIZES.xs, color: 'black', fontFamily: FONTS.medium }} />
                  </Row>
                </TouchableOpacity>
              </Row>
              <FlatList
                data={data}
                renderItem={({ item }) => <MiniPostCard postData={item} />}
                keyExtractor={(item) => item._id}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: SIZE * 4.5 }} />}
              />
            </>
          )}
          <EventDetailsMap event={event} navigation={navigation} />
        </View>
      </ScrollView>
      <View style={{ height: 0.5, backgroundColor: COLORS.lightGray }} />
      <Row style={{ paddingHorizontal: WIDTH_DEVICE / 20 }}>
        <Row column spaceBetween mt={SIZE}>
          <EventDetailsParticipants numberOfParticipants={numberOfParticipants} isParticipating={isParticipating} />
          <Row row spaceBetween alignCenter mt={SIZE / 2} mb={SIZE}>
            {role === 'user' &&
              (isParticipating ? (
                <>
                  <Button
                    secondary
                    containerStyle={event.discount !== 0 ? { width: SIZE * 24 } : { width: SIZE * 27 }}
                    text="Unparticipate"
                    onPress={onPressUnpartecipate}
                    loading={isLoading}
                    disabled={isOnPressParticipateLoading}
                  />
                  {event.discount !== 0 && (
                    <Row ml={SIZE}>
                      <TouchableOpacity onPress={toggleModal}>
                        <MaterialCommunityIcons name="brightness-percent" size={SIZE * 2} color={COLORS.primary} />
                      </TouchableOpacity>
                    </Row>
                  )}
                </>
              ) : (
                <>
                  <Button
                    gradient
                    containerStyle={event.discount !== 0 ? { width: SIZE * 24 } : { width: SIZE * 27 }}
                    text="Partecipa"
                    onPress={onPressPartecipate}
                    loading={isLoading}
                    disabled={isOnPressParticipateLoading}
                  />
                  {event.discount !== 0 && <MaterialCommunityIcons name="brightness-percent" size={SIZE * 2} color={COLORS.gray} />}
                </>
              ))}
          </Row>
        </Row>
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
    height: SIZE * 22,
    width: WIDTH_DEVICE / 1,
    alignItems: 'center',
    zIndex: -1,
  },
  eventImage: {
    height: SIZE * 23,
    width: WIDTH_DEVICE,
    position: 'absolute',
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
    marginTop: SIZE / 2,
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
    fontFamily: FONTS.regular,
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
    marginBottom: SIZE * 24,
    bottom: 0,
    position: 'absolute',
  },
  dots: {
    marginHorizontal: WIDTH_DEVICE / 40,
    marginBottom: SIZE * 24,
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
    height: SIZE * 5,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backfaceVisibility: 'red',
  },
  whoGoing: {
    marginTop: SIZE,
    fontFamily: FONTS.semiBold,
  },
  viewMore: {
    color: COLORS.primary,
    fontSize: SIZES.sm,
    fontFamily: FONTS.medium,
    marginTop: SIZE * 2.5,
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

  horizontalScrollView: {
    height: SIZE * 6,
  },
  imageGradient: {
    width: '100%',
    height: '100%',
    zIndex: 3,
    position: 'absolute',
  },
});
