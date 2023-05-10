import React from 'react';
import { SafeAreaView, Platform } from 'react-native';

import { SIZE } from '../utils/theme';

export const SafeArea = ({ children, style }) => {
  return <SafeAreaView style={[style, Platform.OS === 'android' && { paddingTop: SIZE * 3 }]}>{children}</SafeAreaView>;
};
