import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

import { GoogleLogo } from '../assets';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, SHADOWS, SIZE } from '../utils/theme';

export const Button = ({ text, onPress, loading, containerStyle, primary, wrapperStyle, textStyle, secondary, gradient, disabled, children }) => {
  const Component = gradient ? LinearGradient : View;
  return (
    <TouchableOpacity onPress={onPress} style={[wrapperStyle]} disabled={!onPress || disabled}>
      <Component
        colors={[COLORS.gradient1, COLORS.gradient2]}
        // start={{ x: 0, y: 1 }}
        // end={{ x: 0, y: 0 }}
        style={[
          primary && styles.container,
          secondary && styles.secondary,
          disabled && styles.disabled,
          gradient && styles.containerGradient,
          containerStyle,
        ]}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            {!!text && (
              <Text style={[textStyle, primary && styles.textPrimary, gradient && styles.textGradient, secondary && styles.textSecondary]}>
                {text}
              </Text>
            )}
            {children}
          </>
        )}
      </Component>
    </TouchableOpacity>
  );
};

export const SocialLoginButton = ({ google, apple, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.socialLoginButtonContainer}>
        {google && (
          <>
            <Image source={GoogleLogo} resizeMode="contain" style={styles.appleLogo} />
            <Text style={styles.textSocialLogin}> Google </Text>
          </>
        )}

        {apple && (
          <>
            <Ionicons name="ios-logo-apple" size={SIZE * 2.5} />
            <Text style={styles.textSocialLogin}> AppleID </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const IconButton = ({ onPress, name, iconStyle, size, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={name} size={size} style={[styles.icon, iconStyle]} color={color} />
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
    height: SIZE * 3,
    width: SIZE * 10,
    borderRadius: SIZES.xs,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: COLORS.backGray,
    height: SIZE * 2.5,
    borderRadius: SIZES.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: COLORS.darkGray,
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
  textSecondary: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.sm,
  },
  socialLoginButtonContainer: {
    backgroundColor: 'white',
    width: WIDTH_DEVICE / 2.3,
    height: HEIGHT_DEVICE / 15,
    borderRadius: SIZES.xxs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    ...SHADOWS.medium,
  },

  textSocialLogin: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginLeft: WIDTH_DEVICE / 80,
  },
  icon: {
    // alignSelf: 'flex-start',
    // position: 'absolute',
  },
});
