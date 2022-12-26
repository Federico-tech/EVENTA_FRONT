import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../utils/constants/Theme';

export const Button = ({ text, onPress, loading, containerStyle, primary, wrapperStyle, textStyle, secondary, gradient, disabled, children }) => {
  const Component = gradient ? LinearGradient : View;
  return (
    <TouchableOpacity onPress={onPress} style={[wrapperStyle]} disabled={!onPress || disabled}>
      <Component
        colors={[COLORS.gradient1, COLORS.gradient2]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={[primary && styles.container, secondary && styles.secondary, disabled && styles.disabled, gradient && styles.containerGradient, containerStyle]}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            {!!text && <Text style={[textStyle, primary && styles.textPrimary, gradient && styles.textGradient]}>{text}</Text>}
            {children}
          </>
        )}
      </Component>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    height: HEIGHT_DEVICE / 15,
    borderRadius: SIZES.xxs,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HEIGHT_DEVICE / 50,
  },
  containerGradient: {
    backgroundColor: undefined,
    height: HEIGHT_DEVICE / 27,
    width: WIDTH_DEVICE / 3.8,
    borderRadius: SIZES.xs,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: COLORS.darkGray,
  },
  disabled: {
    opacity: 0.8,
  },
  textGradient: {
    fontFamily: FONTS.semiBold,
    color: 'white',
    fontSize: SIZES.lg,
  },
  onboardText: {
    color: 'white',
    fontFamily: FONTS.extraBold,
    fontSize: SIZES.lg,
  },
  textPrimary: {
    color: 'white',
    fontFamily: FONTS.extraBold,
    fontSize: SIZES.lg,
  },
});
