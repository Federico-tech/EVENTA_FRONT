import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { FONTS, SIZES } from '../utils/theme';
export const Text = ({
  color,
  style,
  onTextLayout,
  bold,
  children,
  semiBoldSm,
  semiBoldMd,
  medium,
  regularSm,
  numberOfLines,
  regularXs,
  fs,
  ff,
  width,
  mt,
  mb,
  mr,
  ml,
  ...rest
}) => {
  return (
    <RNText
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      onTextLayout={onTextLayout}
      style={[
        { color },
        { fontFamily: ff },
        { fontSize: fs },
        { marginTop: mt },
        { marginBottom: mb },
        { marginLeft: ml },
        { marginRight: mr },
        { width },
        bold && styles.bold,
        semiBoldSm && styles.semiBoldSm,
        semiBoldMd && styles.semiBoldMd,
        medium && styles.medium,
        regularSm && styles.regularSm,
        regularXs && styles.regularXs,
        style,
      ]}
      {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontFamily: FONTS.extraBold,
    fontSize: SIZES.lg,
  },
  semiBoldSm: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
  },
  semiBoldMd: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
  },
  medium: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
  },
  regularSm: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
  },
  regularXs: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
  },
});
