import { PixelRatio } from 'react-native';

import { store } from '../store';
import { logoutUserSlice } from '../store/user';
import { WIDTH_DEVICE } from './theme';

export const logout = () => {
  store.dispatch(logoutUserSlice());
};

export const Normalize = (size) => {
  const scale = WIDTH_DEVICE / 320;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
