import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS, FONTS, SIZES } from '../utils/constants/Theme';

export const TextButton = ({ onPress, text, textStyle, ...rest }) => {
  return (
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
