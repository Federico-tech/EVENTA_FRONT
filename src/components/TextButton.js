import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { COLORS, FONTS, HEIGHT_DEVICE, SIZES } from '../utils/theme';

export const TextButton = ({ onPress, text, textStyle, loading, ...rest }) => {
  return loading ? (
    <ActivityIndicator color="black" style={{ marginTop: HEIGHT_DEVICE / 30 }} />
  ) : (
    <TouchableOpacity onPress={onPress} disable={!onPress}>
      <Text style={[styles.text, textStyle]} {...rest}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.primary,
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
  },
});
