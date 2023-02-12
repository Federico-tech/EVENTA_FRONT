import React from 'react';
import { Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user';

export const MapScreen = () => {
  const { position } = useSelector(selectCurrentUser)
  console.log('position', position)
  const [latitude, longitude] = position.coordinates
  console.log([latitude, longitude])

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ width: '100%', height: '100%' }}>
        <Marker coordinate={{latitude: latitude, longitude: longitude}}/>
      </MapView>
    </View>
  )
};
