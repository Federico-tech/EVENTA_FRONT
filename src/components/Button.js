import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

import { COLORS, HEIGHT_DEVICE, SIZES } from '../utils/constants/Theme';
import { Text } from './Text';

export const Button = ({
  text,
  onPress,
  loading,
  containerStyle,
  wrapperStyle,
  textStyle,
  secondary,
  gradient,
  disabled,
  children,
}) => {
  const Component = gradient ? LinearGradient : View;
  return (
    <TouchableOpacity onPress={onPress} style={[wrapperStyle]} disabled={!onPress || disabled}>
      <Component
        colors={[COLORS.gradient1, COLORS.gradient2]}
        style={[
          styles.container,
          secondary && styles.secondary,
          disabled && styles.disabled,
          gradient && styles.containerGradient,
          containerStyle,
        ]}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            {!!text && <Text style={[textStyle]}>{text}</Text>}
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
  },
  secondary: {
    backgroundColor: COLORS.darkGray,
  },
  disabled: {
    opacity: 0.8,
  },
  gradient: {
    height: HEIGHT_DEVICE / 15,
    borderRadius: SIZES.xxs,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
