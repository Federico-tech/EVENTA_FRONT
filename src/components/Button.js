import Ionicons from '@expo/vector-icons/Ionicons';
import * as Google from 'expo-auth-session/providers/google';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

import { GoogleLogo } from '../assets';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, SHADOWS, SIZE } from '../utils/theme';

export const Button = ({
  text,
  onPress,
  loading,
  containerStyle,
  primary,
  wrapperStyle,
  textStyle,
  secondary,
  gradient,
  disabled,
  disabledStyle,
  pressed,
  children,
  black,
  indicatorColor,
}) => {
  const Component = !loading && gradient ? LinearGradient : View;
  return (
    <TouchableOpacity onPress={onPress} style={[wrapperStyle]} disabled={!onPress || disabled}>
      <View style={[gradient && loading && styles.secondary, containerStyle]}>
        <Component
          colors={[COLORS.gradient1, COLORS.gradient2]}
          // start={{ x: 0, y: 1 }}
          // end={{ x: 0, y: 0 }}
          style={[
            loading && styles.secondary,
            primary && styles.container,
            secondary && styles.secondary,
            disabledStyle && styles.disabled,
            gradient && styles.containerGradient,
            pressed && styles.pressed,
            black && styles.black,
            containerStyle,
          ]}>
          {loading ? (
            <ActivityIndicator color={primary ? 'white' : indicatorColor} />
          ) : (
            <>
              {!!text && (
                <Text
                  style={[
                    textStyle,
                    primary && styles.textPrimary,
                    gradient && styles.textGradient,
                    secondary && styles.textSecondary,
                    pressed && styles.textPressed,
                  ]}>
                  {text}
                </Text>
              )}
              {children}
            </>
          )}
        </Component>
      </View>
    </TouchableOpacity>
  );
};

export const SocialLoginButton = ({ google, apple }) => {
  const android = '200952064298-15mkh2ccaqbh2eo1neuuval7hcb3t5r2.apps.googleusercontent.com';
  const newId = '200952064298-ru40i6fs245s2dghc8cqjlmiihfmn5ce.apps.googleusercontent.com';
  const iosId = '200952064298-63jj5io9ocr50nndpl1o96pmf53os1sv.apps.googleusercontent.com';
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: android,
    iosClientId: iosId,
    webClientId: android,
    // expoClientId: '@riccardocarizzoni/EVENTA_FRONT_EXPO',
    clientId: newId,
    // redirectUri: 'https://auth.expo.io/@riccardocarizzoni/EVENTA_FRONT_EXPO',
  });

  useEffect(() => {
    console.debug({ response });
    if (response?.type === 'success') {
      const token = response.authentication.accessToken;
      console.debug({ token });
      token && getUserInfo(token);
    }
  }, [response]);

  const getUserInfo = async (token) => {
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await response.json();
      console.debug({ userInfo: user });
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <TouchableOpacity onPress={() => promptAsync()}>
      <Text>GOOGLE</Text>
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
    height: SIZE * 2.5,
    width: SIZE * 13,
    borderRadius: SIZES.xxs,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: COLORS.backGray,
    height: SIZE * 2.5,
    borderRadius: SIZES.xxs,
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE * 13,
  },
  black: {
    backgroundColor: 'black',
    width: SIZE * 8,
    height: SIZE * 2.5,
    borderRadius: SIZES.xxs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: COLORS.darkGray,
  },
  textGradient: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.sm,
    color: COLORS.white,
  },
  onboardText: {
    color: 'white',
    fontFamily: FONTS.extraBold,
    fontSize: SIZES.lg,
  },
  textPrimary: {
    color: 'white',
    fontFamily: FONTS.bold,
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
  pressed: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    height: SIZE * 2.5,
    borderRadius: SIZES.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPressed: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
  },
});
