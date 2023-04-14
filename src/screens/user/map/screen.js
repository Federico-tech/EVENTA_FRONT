import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Text, EventBottomSheet, LoadingImage, OrganiserBottomSheet } from '../../../components';
import { getRefreshedEvent } from '../../../services/events';
import { refreshSelectedUser } from '../../../services/users';
import { setSelectedEvent } from '../../../store/event';
import { selectMapFilter, setMapFilter } from '../../../store/filter';
import { selectCurrentUser, setUserSelected } from '../../../store/user';
import { ROLES } from '../../../utils/conts';
import { useInfiniteScroll } from '../../../utils/hooks';
import mapStyle from '../../../utils/mapStyle.json';
import { COLORS, FONTS, SIZE, SIZES } from '../../../utils/theme';

export const MapScreen = ({ route }) => {
  const [snap, setSnap] = useState(false);
  const { event } = route.params || {};
  const isFocused = useIsFocused();
  const [region, setRegion] = useState(undefined);

  const dispatch = useDispatch();
  const filter = useSelector(selectMapFilter);
  const user = useSelector(selectCurrentUser);
  const entity = filter === 'organisers' ? 'users' : 'events';
  const { data, getData, setData, refreshing } = useInfiniteScroll({
    entity,
    filters: {
      role: ROLES.ORGANISER,
    },
  });

  useEffect(() => {
    getData();
  }, [filter]);

  const updateFilters = (f) => {
    setData([]);
    dispatch(setMapFilter(f));
  };

  useEffect(() => {
    if (event) {
      setRegion({
        latitude: event?.position?.coordinates[1],
        longitude: event?.position?.coordinates[0],
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      dispatch(setMapFilter('events'));
    }
  }, [isFocused]);

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
    dispatch(setUserSelected(event.organiser));
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

  const eventsByCoordinate = useMemo(() => {
    if (filter === 'organisers') {
      return [];
    }
    return Object.values(
      data.reduce((acc, event) => {
        const coordinate = `${event.position.coordinates[1].toFixed(4)}_${event.position.coordinates[0].toFixed(4)}`;
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
  }, [data, filter]);

  console.debug({ eventsByCoordinate });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={
          event
            ? region
            : {
                latitude: user.position.coordinates[1],
                longitude: user.position.coordinates[0],
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
              }
        }
        showsUserLocation
        showsMyLocationButton
        showsCompass
        region={region}
        customMapStyle={mapStyle}>
        {filter === 'organisers'
          ? data.map((user) => (
              <Marker
                key={user._id}
                coordinate={{
                  latitude: user.position.coordinates[1],
                  longitude: user.position.coordinates[0],
                }}
                onPress={() => handlePresentModalOrganiser({ user })}>
                <View style={{ alignItems: 'center', height: SIZE * 7 }}>
                  <View style={styles.marker}>
                    <LoadingImage source={user.profilePic} imageStyle={styles.profileImage} profile width={SIZE * 4.5} iconSIZE={SIZE * 2.5} />
                  </View>
                  <Text style={styles.markerText}>{user.username}</Text>
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
                <View style={{ alignItems: 'center', height: SIZE * 6 }}>
                  <View style={styles.marker}>
                    <LoadingImage source={event.coverImage} imageStyle={styles.profileImage} profile width={SIZE * 4.5} />
                  </View>
                </View>
              </Marker>
            ))}
      </MapView>
      <View style={{ position: 'absolute', marginTop: SIZE * 4, zIndex: 2, flexDirection: 'row', alignSelf: 'center' }}>
        <Button
          secondary
          loading={refreshing && filter === 'events'}
          containerStyle={[filter === 'events' && { backgroundColor: 'black', borderRadius: SIZES.xxs }, { marginRight: SIZE, width: SIZE * 9 }]}
          onPress={() => updateFilters('events')}>
          <Text medium color={filter === 'events' ? COLORS.white : 'black'}>
            Events
          </Text>
        </Button>
        <Button
          secondary
          loading={refreshing && filter === 'organisers'}
          containerStyle={[filter === 'organisers' && { backgroundColor: 'black', borderRadius: SIZES.xxs }, { marginRight: SIZE, width: SIZE * 9 }]}
          onPress={() => updateFilters('organisers')}>
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
          {filter === 'organisers' ? (
            <OrganiserBottomSheet scroll={snap} closeSheet={handleClosePress} />
          ) : (
            <EventBottomSheet scroll={snap} closeSheet={handleClosePress} />
          )}
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
    width: SIZE * 1.7,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 3.5,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primary,
  },
  markerText: {
    marginTop: SIZE,
    fontFamily: FONTS.medium,
    fontSize: SIZES.xxs,
    textShadowColor: 'red',
    textShadowOffset: {
      width: 20,
      height: 20,
    },
    textShadowRadius: 21,
  },
});
