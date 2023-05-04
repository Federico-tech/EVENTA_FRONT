import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Text, EventBottomSheet, LoadingImage, OrganiserBottomSheet, Row } from '../../../components';
import { getRefreshedEvent } from '../../../services/events';
import { refreshSelectedUser } from '../../../services/users';
import { setSelectedEvent } from '../../../store/event';
import { selectMapFilter, setMapFilter } from '../../../store/filter';
import { selectCurrentUser, setUserSelected } from '../../../store/user';
import { ROLES } from '../../../utils/conts';
import { useInfiniteScroll } from '../../../utils/hooks';
import mapStyle from '../../../utils/mapStyle.json';
import { COLORS, FONTS, SIZE, SIZES } from '../../../utils/theme';

export const MapScreen = ({ navigation, route }) => {
  const [snap, setSnap] = useState(false);
  const mapRef = useRef(null);
  const { event, key } = route.params || {};
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
    if (event && mapRef.current) {
      const region = {
        latitude: event?.position?.coordinates[1],
        longitude: event?.position?.coordinates[0],
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
      setRegion(region);
      mapRef.current.animateToRegion(region, 500);
      dispatch(setMapFilter('events'));
    }
  }, [event, mapRef.current, key]);

  const bottomSheetModalRef = useRef(null);
  const eventSnapPoints = useMemo(() => ['35%', '92%'], []);
  const organiserSnapPoints = useMemo(() => ['50%', '92%'], []);

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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        provider={PROVIDER_GOOGLE}
       
          onMapReady={() => {
            if (event && mapRef.current) {
              const region = {
                latitude: event?.position?.coordinates[1],
                longitude: event?.position?.coordinates[0],
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };
              setRegion(region);
              mapRef.current.animateToRegion(region, 500);
              dispatch(setMapFilter('events'));
            }
          }}
        rotateEnabled={false}
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
        ref={mapRef}
        region={region}
        showsMyLocationButton
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
                <View style={{ alignItems: 'center', height: SIZE * 6 }}>
                  <View style={styles.marker}>
                    <LoadingImage source={user.profilePic} imageStyle={styles.profileImage} profile width={SIZE * 5} iconSIZE={SIZE * 2} />
                  </View>
                  {/* <View style={{ backgroundColor: COLORS.white, borderRadius: 100, marginTop: SIZE * 1.5, borderColor: COLORS.primary, borderWidth: 1.5}}>
                    <Text style={styles.markerText}>{user.username}</Text>
                  </View>
                  */}
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
                    <LoadingImage source={event.coverImage} imageStyle={styles.profileImage} width={SIZE * 5} iconSIZE={0} />
                  </View>
                </View>
              </Marker>
            ))}
      </MapView>

      <View style={{ position: 'absolute', zIndex: 2, flexDirection: 'row', alignSelf: 'center' }}>
        <SafeAreaView>
          <Row row spaceEvenly mt={SIZE} width="100%" style={{ alignSelf: 'center' }}>
            <Button
              secondary
              loading={refreshing && filter === 'events'}
              containerStyle={[filter === 'events' && { backgroundColor: 'black', borderRadius: SIZES.xxs }, { width: SIZE * 13 }]}
              onPress={() => updateFilters('events')}>
              <Text medium color={filter === 'events' ? COLORS.white : 'black'}>
                Events
              </Text>
            </Button>
            <Button
              secondary
              loading={refreshing && filter === 'organisers'}
              containerStyle={[filter === 'organisers' && { backgroundColor: 'black', borderRadius: SIZES.xxs }, { width: SIZE * 13 }]}
              onPress={() => updateFilters('organisers')}>
              <Text medium color={filter === 'organisers' ? COLORS.white : 'black'}>
                Organisers
              </Text>
            </Button>
          </Row>
        </SafeAreaView>
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
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: SIZE / 5,
    borderColor: COLORS.white,
    transform: [{ rotateZ: '315deg' }],
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE * 5,
    height: SIZE * 5,
    borderTopLeftRadius: SIZE * 15,
    borderTopRightRadius: SIZE * 15,
    borderBottomLeftRadius: SIZE * 15,
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
    fontFamily: FONTS.medium,
    fontSize: SIZES.xxs,
    padding: SIZE / 2,
    paddingVertical: SIZE / 2.5,
  },
});
