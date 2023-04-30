import Ionicons from '@expo/vector-icons/Ionicons';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

import { GoogleLogo } from '../assets';
import { noAuthAxios } from '../core/axios';
import { store } from '../store';
import { setUserInfo } from '../store/user';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, SHADOWS, SIZE } from '../utils/theme';
import { Row } from './Row';

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
  const Component = !loading && gradient ? View : View;
  return (
    <TouchableOpacity onPress={onPress} style={[wrapperStyle]} disabled={!onPress || disabled}>
      <View style={[gradient && loading && styles.secondary, containerStyle]}>
        <View
          // colors={[COLORS.gradient1, COLORS.gradient2]}
          // start={{ x: 0, y: 1 }}
          // end={{ x: 0, y: 0 }}
          style={[
            primary && styles.container,
            secondary && styles.secondary,
            disabledStyle && styles.disabled,
            gradient && styles.containerGradient,
            pressed && styles.pressed,
            black && styles.black,
            loading && styles.secondary,
            containerStyle,
          ]}>
          {loading ? (
            <ActivityIndicator color={primary ? 'white' : indicatorColor} />
          ) : (
            <>
              {!!text && (
                <Text
                  style={[
                    primary && styles.textPrimary,
                    gradient && styles.textGradient,
                    secondary && styles.textSecondary,
                    pressed && styles.textPressed,
                    textStyle,
                  ]}>
                  {text}
                </Text>
              )}
              {children}
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SocialLoginButton = ({ google, apple }) => {
  const [loading, setLoading] = useState('');
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

  const loginWithGoogleToken = async (token) => {
    try {
      const { data } = await noAuthAxios.post('auth/google', { token });
      setLoading('');
      store.dispatch(setUserInfo(data));
    } catch (e) {
      console.error({ loginWithGoogleTokenError: e });
      setLoading('');
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const token = response.authentication.accessToken;
      loginWithGoogleToken(token);
    }
  }, [response]);

  const onPressApple = async () => {
    try {
      setLoading('apple');
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });
      console.debug({ credential });
      const { data } = await noAuthAxios.post('auth/apple', { ...credential });
      console.debug({ data });
      store.dispatch(setUserInfo(data));
      setLoading('');
    } catch (e) {
      setLoading('');
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  const onPressGoogle = async () => {
    try {
      setLoading('google');
      await promptAsync();
    } catch (e) {
      console.error({ loginGoogleError: e });
      setLoading('');
    }
  };

  return (
    <Row row alignCenter spaceBetween mt={SIZE}>
      <TouchableOpacity onPress={onPressGoogle}>
        <View style={styles.socialLoginButtonContainer}>
          <Image source={GoogleLogo} resizeMode="contain" style={styles.appleLogo} />
          <Text style={styles.textSocialLogin}> Google </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
        cornerRadius={SIZES.xxs}
        style={styles.button}
        onPress={onPressApple}>
        <View style={styles.socialLoginButtonContainer}>
          <Ionicons name="ios-logo-apple" size={SIZE * 2.5} />
          <Text style={styles.textSocialLogin}> AppleID </Text>
        </View>
      </TouchableOpacity>
    </Row>
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
    backgroundColor: '#00B2FF',
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
