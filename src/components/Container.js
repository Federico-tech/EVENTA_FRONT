import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS } from '../utils/theme';

export const Container = ({ children, styleContainer }) => {
  return <View style={[styles.container, styleContainer]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
