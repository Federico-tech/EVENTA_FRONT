import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS } from '../utils/theme';

export const Line = ({ lineStyle, shadow }) => {
  return (
    <View style={shadow && styles.shadow}>
      <View style={[styles.line, lineStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 0.5,
    backgroundColor: COLORS.lightGray,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 0.5,
  },
});
