import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Row, Text, MapBottomSheet, EventBottomSheet } from '../../../components';
import { getRefreshedEvent } from '../../../services/events';
import { refreshSelectedUser } from '../../../services/users';
import { setSelectedEvent } from '../../../store/event';
import { selectCurrentUser, setUserSelected } from '../../../store/user';
import { ROLES } from '../../../utils/conts';
import { useInfiniteScroll } from '../../../utils/hooks';
import mapStyle from '../../../utils/mapStyle.json';
import { COLORS, SIZE } from '../../../utils/theme';

export const MapScreen = () => {
  const [filter, setFilter] = useState('events');
  const [snap, setSnap] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const entity = filter === 'organisers' ? 'users' : 'events';
  const { data, getData } = useInfiniteScroll({
    entity,
    filters: {
      role: ROLES.ORGANISER,
    },
  });
  useEffect(() => {
    getData();
  }, [filter]);

  const bottomSheetModalRef = useRef(null);
  const eventSnapPoints = useMemo(() => ['60%', '95%'], []);
  const organiserSnapPoints = useMemo(() => ['50%', '95%'], []);

  const handlePresentModalOrganiser = ({ user }) => {
    bottomSheetModalRef.current?.present();
    refreshSelectedUser(user);
    dispatch(setUserSelected(user));
  };

  const handlePresentModalEvents = ({ event }) => {
    bottomSheetModalRef.current?.present();
    getRefreshedEvent(event);
    dispatch(setSelectedEvent(event));
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

  const handleAnimate = useCallback(
    (index) => {
      if (index === 1) {
        setSnap(true);
      } else {
        setSnap(false);
      }
    },
    [snap]
  );

  const eventsByCoordinate = Object.values(
    data.reduce((acc, event) => {
      const coordinate = `${event.position.coordinates[1]}_${event.position.coordinates[0]}`;
      const currentClosest = acc[coordinate];

      if (
        !currentClosest ||
        new Date(event.date) < new Date(currentClosest.date) ||
        (new Date(event.date) === new Date(currentClosest.date) && event._id < currentClosest._id)
      ) {
        acc[coordinate] = event;
      }

      return acc;
    }, {})
  );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: user.position.coordinates[1],
          longitude: user.position.coordinates[0],
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
        customMapStyle={mapStyle}>
        <Marker
          coordinate={{
            latitude: user.position.coordinates[1],
            longitude: user.position.coordinates[0],
          }}>
          <View style={styles.myPos} />
        </Marker>
        {filter === 'organisers'
          ? data.map((user) => (
              <Marker
                key={user._id}
                coordinate={{
                  latitude: user.position.coordinates[1],
                  longitude: user.position.coordinates[0],
                }}
                onPress={() => handlePresentModalOrganiser({ user })}>
                <View style={{ alignItems: 'center', height: SIZE * 8 }}>
                  <View style={styles.marker}>
                    <Image source={{ uri: user.profilePic }} style={styles.profileImage} />
                  </View>
                  <Row alignCenter justifyCenter style={{ marginTop: SIZE }}>
                    <Text medium>{user.name}</Text>
                  </Row>
                </View>
              </Marker>
            ))
          : eventsByCoordinate.map((event) => (
              <Marker
                key={event._id}
                coordinate={{
                  latitude: event.position.coordinates[1],
                  longitude: event.position.coordinates[0],
                }}
                tracksViewChanges
                onPress={() => handlePresentModalEvents({ event })}>
                <View style={{ alignItems: 'center', height: SIZE * 8 }}>
                  <View style={styles.marker}>
                    <Image source={{ uri: event.coverImage }} style={styles.profileImage} />
                  </View>
                  <Row alignCenter justifyCenter style={{ marginTop: SIZE }}>
                    <Text medium>{event.name}</Text>
                  </Row>
                </View>
              </Marker>
            ))}
      </MapView>
      <View style={{ position: 'absolute', marginTop: SIZE * 4, zIndex: 2, flexDirection: 'row', alignSelf: 'center' }}>
        <Button
          secondary
          containerStyle={[filter === 'events' && { backgroundColor: 'black' }, { marginRight: SIZE }]}
          onPress={() => setFilter('events')}>
          <Text medium color={filter === 'events' ? COLORS.white : 'black'}>
            Events
          </Text>
        </Button>
        <Button
          secondary
          containerStyle={[filter === 'organisers' && { backgroundColor: 'black' }, { marginRight: SIZE, width: SIZE * 9 }]}
          onPress={() => setFilter('organisers')}>
          <Text medium color={filter === 'organisers' ? COLORS.white : 'black'}>
            Organisers
          </Text>
        </Button>
      </View>
      <View>
        <BottomSheetModal
          enablePanDownToClose
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={filter === 'organisers' ? organiserSnapPoints : eventSnapPoints}
          backdropComponent={renderBackdrop}
          onChange={handleAnimate}>
          {filter === 'organisers' ? <MapBottomSheet scroll={snap} closeSheet={handleClosePress} /> : <EventBottomSheet scroll={snap} />}
        </BottomSheetModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: SIZE * 4.5,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: SIZE / 5,
    borderColor: COLORS.white,
    transform: [{ rotateZ: '315deg' }],
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE * 4.5,
    height: SIZE * 4.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: COLORS.white,
    transform: [{ rotateZ: '45deg' }],
  },
  filterButtonLeft: {
    marginTop: SIZE * 3,
    width: SIZE * 20,
    alignSelf: 'center',
  },
  myPos: {
    width: SIZE * 1.5,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
  },
});
