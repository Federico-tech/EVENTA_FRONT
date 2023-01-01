import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS, HEIGHT_DEVICE } from '../utils/theme';

export const Line = ({ lineStyle }) => {
  return <View style={[styles.line, lineStyle]} />;
};

const styles = StyleSheet.create({
  line: {
    height: HEIGHT_DEVICE / 1500,
    backgroundColor: COLORS.lightGray,
  },
});
