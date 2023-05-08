import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

import {
  Button,
  Container,
  IconButton,
  Line,
  ListEmptyComponent,
  LoadingImage,
  OrganiserInf,
  ReadMoreButton,
  Row,
  SkeletonAccountRow,
  Text,
  TextButton,
} from '../../../../components';
import { UserRow } from '../../../../components/AccountRow';
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
import { formatShortNumber } from '../../../../utils/numbers';
import { COLORS, SIZES, WIDTH_DEVICE, FONTS, SIZE } from '../../../../utils/theme';
import { EventDetailsBottomSheet } from './eventDetailsBottomSheet';

const EventDetailsParticipants = ({ isParticipating, routeParticipants }) => {
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

  const length = routeParticipants === 0 ? 1 : routeParticipants <= 3 ? routeParticipants : routeParticipants > 3 && 3;
  console.log('lenght', length);

  return (
    <>
      {loading ? (
        <>
          {Array.from({ length }, (_, i) => (
            <SkeletonAccountRow key={`skeleton-${i}`} />
          ))}
        </>
      ) : isParticipating ? (
        <>
          {participants?.slice(0, 3).map((participant) => (
            <UserRow key={participant.user._id} data={participant.user} bottomSheet />
          ))}
          {participants?.length >= 3 && (
            <TextButton text="View More" style={styles.viewMore} onPress={() => navigation.navigate(ROUTES.ParticipantsScreen)} />
          )}
        </>
      ) : (
        <Row width={SIZE * 20} style={{ alignSelf: 'center' }} mt={SIZE}>
          <Text color={COLORS.gray} style={{ textAlign: 'center' }}>
            Participate to this event to see who is participating
          </Text>
        </Row>
      )}
    </>
  );
};

const EventDetailsMap = ({ event, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MapNavigator', { screen: ROUTES.MapScreen, params: { event, key: Math.random() * 100 } })}
      activeOpacity={0.7}>
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
  );
};

const EventInformations = ({ event }) => {
  return (
    <Row style={{ marginHorizontal: WIDTH_DEVICE / 20 }} column mb={SIZE / 2}>
      <Text ff={FONTS.semiBold} fs={SIZES.lg} mt={SIZE} mb={SIZE}>
        {event.name}
      </Text>
      <ReadMoreButton subString={80} text={event.description} style={styles.description} />
      <Row row alignCenter mt={SIZE * 1.5}>
        <View style={[styles.iconContainer]}>
          <AntDesign name="clockcircleo" size={SIZE * 2} />
        </View>
        <Row column>
          <Text fs={SIZES.sm}>{formatDate(event.date, EVENT_DATE_FORMAT)}</Text>
          <Text color={COLORS.gray} fs={SIZES.sm}>
            {formatDate(event.date, TIME_FORMAT)}
          </Text>
        </Row>
      </Row>
      <Row row alignCenter mt={SIZE} mb={SIZE}>
        <View style={styles.iconContainer}>
          <Foundation name="marker" size={SIZE * 2} />
        </View>
        <Row width={SIZE * 18}>
          <Text fs={SIZES.sm}>{event?.address?.fullAddress}</Text>
        </Row>
      </Row>
    </Row>
  );
};

const EventSocialInformations = ({ event, posts, participants }) => {
  console.log({ event });
  return (
    <Row row mt={SIZE * 1.5} mb={SIZE}>
      <Row row alignCenter>
        <Row style={styles.iconContainer}>
          <AntDesign name="heart" color="red" size={SIZE * 1.5} />
        </Row>
        <Row width={SIZE * 5}>
          <Text fs={SIZES.sm}>Likes</Text>
          <Text color={COLORS.gray} fs={SIZES.sm}>
            {formatShortNumber(event.likes)}
          </Text>
        </Row>
      </Row>
      <Row row alignCenter>
        <Row style={styles.iconContainer}>
          <MaterialCommunityIcons name="post" color={COLORS.primary} size={SIZE * 1.6} />
        </Row>
        <Row width={SIZE * 5}>
          <Text fs={SIZES.sm}>Posts</Text>
          <Text color={COLORS.gray} fs={SIZES.sm}>
            {formatShortNumber(posts)}
          </Text>
        </Row>
      </Row>
      <Row row alignCenter>
        <Row style={styles.iconContainer}>
          <Ionicons name="people" color="orange" size={SIZE * 1.7} />
        </Row>
        <Row width={SIZE * 5}>
          <Text fs={SIZES.sm}>People</Text>
          <Text color={COLORS.gray} fs={SIZES.sm}>
            {!participants ? 0 : formatShortNumber(participants)}
          </Text>
        </Row>
      </Row>
    </Row>
  );
};

export const EventDetails = ({ route }) => {
  const { onGoBack } = route?.params || {};
  const { participants } = route?.params;
  const [isOnPressParticipateLoading, setIsOnPressParticipateLoading] = useState(false);
  const [numberOfParticipants, setNumberOfParticipants] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const event = useSelector(selectSelectedEvent);
  const eventId = useSelector(selectSelectedEventId);
  const role = useSelector(selectCurrentUserRole);
  const userId = useSelector(selectCurrentUserId);
  const organiser = event.organiser;
  const refreshedOrganiser = useSelector(selectSelectedUser);
  const bottomSheetModalRef = useRef(null);
  const [isParticipating, setIsParticipating] = useState();
  const [definitiveOrganiser, setDefinitiveOrganiser] = useState(refreshedOrganiser);

  const handlePresentModal = () => bottomSheetModalRef.current?.present();
  const toggleModal = () => setModalVisible(!isModalVisible);
  const handleClosePress = () => bottomSheetModalRef.current.close();

  const { data, totalData } = useInfiniteScroll({
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
          setNumberOfParticipants(result.data.event.participants);
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
    Haptics.selectionAsync();
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

  const onPressNavigateParticipants = () => {
    navigation.navigate(ROUTES.ParticipantsScreen);
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={{ marginBottom: SIZE }}>
            <View style={{ marginTop: -SIZE * 6 }}>
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
                marginTop: -SIZE * 3,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <OrganiserInf organiser={definitiveOrganiser} isLoading={isLoading} scans={event.scans} />

              <View style={{ marginHorizontal: 0 }}>
                <Line lineStyle={{ marginBottom: 0 }} />
              </View>
            </View>
            <EventInformations event={event} />
            <Row style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
              <View style={{ marginHorizontal: 0 }}>
                <Line lineStyle={{ marginBottom: 0 }} />
              </View>
              <EventSocialInformations event={event} posts={totalData} participants={numberOfParticipants} />
              {data.length !== 0 && (
                <>
                  <Row row alignCenter spaceBetween mb={SIZE} mt={SIZE / 2}>
                    <Text ff={FONTS.semiBold} fs={SIZES.sm}>
                      Moments
                    </Text>
                    <TouchableOpacity onPress={onPressNavigatePosts}>
                      <Row row alignCenter>
                        <AntDesign name="caretright" size={SIZE / 1.1} />
                        <TextButton
                          text="View all"
                          textStyle={{
                            width: SIZE * 4,
                            fontSize: SIZES.xs,
                            color: 'black',
                            fontFamily: FONTS.medium,
                            alignSelf: 'flex-end',
                            marginLeft: SIZE / 4,
                          }}
                        />
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
                    ListEmptyComponent={<ListEmptyComponent text="There are no moments for this event" />}
                  />
                </>
              )}
              <Row row alignCenter spaceBetween mt={SIZE * 1.5}>
                <Text ff={FONTS.semiBold} fs={SIZES.sm}>
                  Who's going
                </Text>
                {isParticipating && (
                  <Row row alignCenter>
                    <AntDesign name="caretright" size={SIZE / 1.1} />
                    <TextButton
                      text="View all"
                      textStyle={{
                        width: SIZE * 4,
                        fontSize: SIZES.xs,
                        color: 'black',
                        fontFamily: FONTS.medium,
                        alignSelf: 'flex-end',
                        marginLeft: SIZE / 4,
                      }}
                      onPress={onPressNavigateParticipants}
                    />
                  </Row>
                )}
              </Row>
              <EventDetailsParticipants isParticipating={isParticipating} routeParticipants={participants} />
            </Row>
          </View>
        </SafeAreaView>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          <Text ff={FONTS.semiBold} fs={SIZES.sm} mt={SIZE / 2}>
            Location
          </Text>
          <EventDetailsMap event={event} navigation={navigation} />
        </View>
      </ScrollView>
      {role === 'user' && (
        <Row style={{ paddingHorizontal: WIDTH_DEVICE / 20 }}>
          <Row column spaceBetween>
            <Row row spaceBetween alignCenter mt={SIZE} mb={SIZE * 2.7}>
              {isParticipating ? (
                <>
                  <Button
                    secondary
                    containerStyle={
                      event.discount !== 0
                        ? { width: SIZE * 23, borderRadius: 15, height: SIZE * 3 }
                        : { width: SIZE * 27, borderRadius: 15, height: SIZE * 3 }
                    }
                    text="Unparticipate"
                    onPress={onPressUnpartecipate}
                    loading={isLoading}
                    disabled={isOnPressParticipateLoading}
                  />
                  {event.discount !== 0 && (
                    <Row ml={SIZE}>
                      <TouchableOpacity onPress={toggleModal}>
                        <View style={styles.discountContainer}>
                          <Entypo name="ticket" size={SIZE * 2} color={COLORS.primary} />
                        </View>
                      </TouchableOpacity>
                    </Row>
                  )}
                </>
              ) : (
                <>
                  <Button
                    gradient
                    containerStyle={
                      event.discount !== 0
                        ? { width: SIZE * 23, borderRadius: 15, height: SIZE * 3 }
                        : { width: SIZE * 27, borderRadius: 15, height: SIZE * 3 }
                    }
                    text="Partecipa"
                    onPress={onPressPartecipate}
                    loading={isLoading}
                    disabled={isOnPressParticipateLoading}
                  />
                  {event.discount !== 0 && (
                    <View style={styles.discountContainer}>
                      <MaterialCommunityIcons name="ticket-percent" size={SIZE * 2} color={COLORS.gray} />
                    </View>
                  )}
                </>
              )}
            </Row>
          </Row>
        </Row>
      )}

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
    height: SIZE * 22,
    width: WIDTH_DEVICE,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: SIZE * 3,
  },
  arrowStyle: {
    marginLeft: WIDTH_DEVICE / 40,
    marginBottom: SIZE * 21.5,
    bottom: 0,
    position: 'absolute',
    padding: SIZE / 4,
  },
  dots: {
    marginHorizontal: WIDTH_DEVICE / 40,
    marginBottom: SIZE * 21.5,
    alignSelf: 'flex-end',
    bottom: 0,
    position: 'absolute',
    paddingRight: SIZE,
    padding: SIZE / 4,
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

  horizontalScrollView: {
    height: SIZE * 6,
  },
  imageGradient: {
    width: '100%',
    height: '100%',
    zIndex: 3,
    position: 'absolute',
  },
  iconContainer: {
    borderRadius: SIZES.xxs,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZE,
    width: SIZE * 3.5,
    aspectRatio: 1,
    backgroundColor: COLORS.backGray,
  },
  description: {
    color: COLORS.darkGray,
    fontSize: SIZES.sm,
  },
  discountContainer: {
    width: SIZE * 3,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.backGray,
  },
  viewMore: {
    alignSelf: 'center',
    marginTop: SIZE,
    fontSize: SIZES.sm,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
});
