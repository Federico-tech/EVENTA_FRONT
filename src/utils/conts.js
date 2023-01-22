import { Platform } from 'react-native';

export const ROLES = {
  USER: 'user',
  ORGANISER: 'organiser',
};

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
