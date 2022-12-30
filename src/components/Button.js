import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, SHADOWS } from '../utils/constants/Theme';

export const Button = ({ text, onPress, loading, containerStyle, primary, wrapperStyle, textStyle, secondary, gradient, disabled, children }) => {
  const Component = gradient ? LinearGradient : View;
  return (
    <TouchableOpacity onPress={onPress} style={[wrapperStyle]} disabled={!onPress || disabled}>
      <Component
        colors={[COLORS.gradient1, COLORS.gradient2]}
        // start={{ x: 0, y: 1 }}
        // end={{ x: 0, y: 0 }}
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

export const SocialLoginButton = ({ google, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.socialLoginButtonContainer}>
        {google ? (
          <>
            <Image source={require('../assets/images/btn/social/GoogleLogo.png')} resizeMode="contain" style={styles.appleLogo} />
            <Text style={styles.textSocialLogin}> Google </Text>
          </>
        ) : (
          <>
            <Ionicons name="ios-logo-apple" size={22} />
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
    marginLeft: WIDTH_DEVICE / 60,
  },
  icon: {
    alignSelf: 'flex-start',
    position: 'absolute',
  },
});
