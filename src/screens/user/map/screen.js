import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../../store/user';
import { ROLES } from '../../../utils/conts';
import { useInfiniteScroll } from '../../../utils/hooks';
import { COLORS, SIZE } from '../../../utils/theme';
import { Row, Text } from '../../../components';

export const MapScreen = () => {
  const { data } = useInfiniteScroll({
    entity: 'users',
    filters: {
      role: ROLES.ORGANISER,
    },
  });
  const user = useSelector(selectCurrentUser);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: user.position.coordinates[1],
          longitude: user.position.coordinates[0],
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        >
        {data.map((user) => (
          <Marker
            key={user._id}
            coordinate={{
              latitude: user.position.coordinates[1],
              longitude: user.position.coordinates[0],
            }}
          >
          <View style={{alignItems: 'center'}}>
            <Image source={{ uri: user.profilePic}} style={styles.profileImage} />
            <Row alignCenter justifyCenter >
              <Text semiBoldSm>{user.name}</Text>
            </Row>
          </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: SIZE * 5,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: SIZE / 4,
    borderColor: COLORS.white
  }
})