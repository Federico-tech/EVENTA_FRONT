import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

import { Row } from '../../../../components';
import { LoadingImage } from '../../../../components/LoadingImage';
import { ROUTES } from '../../../../navigation/Navigation';
import { selectCurrentUser } from '../../../../store/user';
import mapStyle from '../../../../utils/mapStyle.json';
import { COLORS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const HomeMap = ({ mapData }) => {
  const user = useSelector(selectCurrentUser);
  const navigation = useNavigation();

  const eventsByCoordinate = useMemo(() => {
    return Object.values(
      mapData.reduce((acc, event) => {
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
  }, [mapData]);

  const mapRef = React.createRef();

  const handleZoomIn = () => {
    mapRef.current.getMapBoundaries().then((bounds) => {
      const { northEast, southWest } = bounds;
      console.log({ mapRef: mapRef.current.props.initialRegion });
      const latitudeDelta = (northEast.latitude - southWest.latitude) / 1.5;
      const longitudeDelta = (northEast.longitude - southWest.longitude) / 1.5;
      const newRegion = {
        latitude: mapRef.current.props.initialRegion.latitude,
        longitude: mapRef.current.props.initialRegion.longitude,
        latitudeDelta,
        longitudeDelta,
      };
      mapRef.current.animateToRegion(newRegion, 300);
    });
  };

  const handleZoomOut = () => {
    mapRef.current.getMapBoundaries().then((bounds) => {
      const { northEast, southWest } = bounds;
      console.log({ mapRef: mapRef.current.props.initialRegion });
      const latitudeDelta = (northEast.latitude - southWest.latitude) * 1.5;
      const longitudeDelta = (northEast.longitude - southWest.longitude) * 1.5;
      const newRegion = {
        latitude: mapRef.current.props.initialRegion.latitude,
        longitude: mapRef.current.props.initialRegion.longitude,
        latitudeDelta,
        longitudeDelta,
      };
      mapRef.current.animateToRegion(newRegion, 300);
    });
  };

  console.debug({ eventsByCoordinate });

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.jumpTo(ROUTES.MapNavigator)} activeOpacity={0.7}>
        <MapView
          style={{ height: HEIGHT_DEVICE / 3.45, width: WIDTH_DEVICE }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: user.position.coordinates[1],
            longitude: user.position.coordinates[0],
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          ref={mapRef}
          customMapStyle={mapStyle}
          pointerEvents="none"
          scrollEnabled={false}
          showsUserLocation>
          {eventsByCoordinate.map((event) => (
            <Marker
              key={event._id}
              coordinate={{
                latitude: event.position.coordinates[1],
                longitude: event.position.coordinates[0],
              }}>
              <View style={{ alignItems: 'center', height: SIZE * 6 }}>
                <View style={styles.marker}>
                  <LoadingImage source={event.coverImage} imageStyle={styles.profileImage} profile width={SIZE * 4.5} iconSIZE={SIZE * 2.5} />
                </View>
              </View>
            </Marker>
          ))}
        </MapView>
        <View style={styles.mapButton}>
          <TouchableOpacity onPress={handleZoomIn}>
            <Row style={{ width: SIZE * 2.5, height: SIZE * 1.8 }} alignCenter justifyCenter>
              <Entypo name="plus" size={SIZE * 1.6} />
            </Row>
          </TouchableOpacity>
          <View style={{ height: 1, width: SIZE * 2.5, backgroundColor: 'black' }} />
          <TouchableOpacity onPress={handleZoomOut}>
            <Row style={{ width: SIZE * 2.5, height: SIZE * 1.8 }} alignCenter justifyCenter>
              <Entypo name="minus" size={SIZE * 1.6} />
            </Row>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
  zoomOutIcon: {
    alignSelf: 'flex-end',
    marginTop: SIZE * 17,
    position: 'absolute',
    paddingRight: SIZE,
  },
  mapButton: {
    position: 'absolute',
    width: SIZE * 2.5,
    backgroundColor: COLORS.white,
    zIndex: 2,
    height: SIZE * 5,
    borderRadius: SIZES.xxs,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: SIZE * 12.5,
    marginLeft: SIZE * 26,
  },
});
