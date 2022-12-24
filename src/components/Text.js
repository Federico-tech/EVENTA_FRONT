import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { COLORS } from '../utils/constants/Theme';
export const Text = ({ color = COLORS.white, style, bold, size = 14, children, ...rest }) => {
  return (
    <RNText
      style={[styles.text, { color }, { fontSize: size }, bold && styles.bold, style]}
      {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {},
  bold: {
    fontWeight: 'bold',
  },
});
