import { PixelRatio } from 'react-native';
import * as Location from 'expo-location';

import { store } from '../store';
import { logoutUserSlice } from '../store/user';
import { WIDTH_DEVICE } from './theme';
import { userUpdate } from '../services/users';

export const logout = () => {
  store.dispatch(logoutUserSlice());
};

export const Normalize = (size) => {
  const scale = WIDTH_DEVICE / 320;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


export const updateUserCoordinates = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync({});
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      console.log('Coordinates', location.coords);
      const position = {
        type: 'Point',
        coordinates: [location.coords.longitude, location.coords.latitude],
      };
      console.log({position})
      await userUpdate({ position });
    }
  } catch (e) {
    console.log({e})
  }
}