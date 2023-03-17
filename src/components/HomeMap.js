import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { selectCurrentUser } from '../store/user';
import { ROLES } from '../utils/conts';
import { useInfiniteScroll } from '../utils/hooks';
import mapStyle from '../utils/mapStyle.json';
import { COLORS, SIZE, SIZES } from '../utils/theme';
import { Line } from './Line';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const HomeMap = () => {
  const user = useSelector(selectCurrentUser);
  const navigation = useNavigation();
  const { data } = useInfiniteScroll({
    entity: 'events',
    filters: {
      role: ROLES.ORGANISER,
    },
  });

  const eventsByCoordinate = useMemo(() => {
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
  }, [data]);

  console.debug({ eventsByCoordinate });

  return (
    <View style={{ marginBottom: SIZE, marginTop: SIZE, borderRadius: SIZES.xxs }}>
      <MapView
        style={{ height: SIZE * 20, zIndex: 1, borderRadius: SIZES.xxs }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: user.position.coordinates[1],
          longitude: user.position.coordinates[0],
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        minZoomLevel={9}
        customMapStyle={mapStyle}>
        <Marker
          coordinate={{
            latitude: user.position.coordinates[1],
            longitude: user.position.coordinates[0],
          }}>
          <View style={styles.myPos} />
        </Marker>
        {eventsByCoordinate.map((event) => (
          <Marker
            key={event._id}
            coordinate={{
              latitude: event.position.coordinates[1],
              longitude: event.position.coordinates[0],
            }}>
            <View style={{ alignItems: 'center', height: SIZE * 8 }}>
              <View style={styles.marker}>
                <LoadingImage source={event.coverImage} style={styles.profileImage} profile />
              </View>
              <Row alignCenter justifyCenter style={{ marginTop: SIZE }}>
                <Text medium>{event.name}</Text>
              </Row>
            </View>
          </Marker>
        ))}
        {/* <TouchableOpacity onPress={() => navigation.jumpTo(ROUTES.MapScreen)}> */}
      {/* <View style={styles.mapButton}>
            <Row>
              <FontAwesome5 name="location-arrow" size={SIZE * 1.2} />
            </Row>
            <View style={{ height: 1, width: SIZE * 2.7, backgroundColor: 'black'}} />
            <Row>
              <MaterialIcons name="zoom-out-map" size={SIZE * 1.4} />
            </Row>
          </View> */}
        {/* </TouchableOpacity> */}
      </MapView>
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
  zoomOutIcon: {
    alignSelf: 'flex-end',
    marginTop: SIZE * 17,
    position: 'absolute',
    paddingRight: SIZE,
  },
  mapButton: {
    height: SIZE * 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: SIZE * 5,
    marginTop: SIZE * 20
  },
});