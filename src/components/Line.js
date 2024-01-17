import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS } from '../utils/theme';

export const Line = ({ lineStyle }) => {
  return (
    <View style={styles.shadow}>
      <View style={[styles.line, lineStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 0.5,
    backgroundColor: COLORS.darkGray,
  },
});
