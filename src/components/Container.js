import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, WIDTH_DEVICE } from '../utils/theme';

export const Container = ({ children, safeAreaView, styleContainer }) => {
  return <View style={[styles.container, styleContainer]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
});
