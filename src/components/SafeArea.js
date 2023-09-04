import React from 'react';
import { Platform, SafeAreaView as SafeAreaViewRN } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';

export const SafeArea = ({ children, style }) => {
  const Component = Platform.OS === 'android' ? SafeAreaViewContext : SafeAreaViewRN;
  return <Component style={style}>{children}</Component>;
};
