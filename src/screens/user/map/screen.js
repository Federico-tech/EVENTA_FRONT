import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { useSelector } from 'react-redux';
import { getEvents } from '../../../services/events';
import { selectEvents } from '../../../store/event';

export const MapScreen = () => {

  useEffect(() => {
    getEvents()
  }, [])

  const events = useSelector(selectEvents)
  console.log(events)

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ width: '100%', height: '100%' }} />
    </View>
  )
};
