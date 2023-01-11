import React from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';

export const MapScreen = () => {
  return (
    <View style={{flex: 1}}>
      <MapView style={{width: '100%',  height: '100%'}}/>
    </View>
  );
};
