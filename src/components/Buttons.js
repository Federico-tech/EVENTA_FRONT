import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { HEIGHT_DEVICE, WIDTH_DEVICE, SIZES, COLORS, SHADOWS } from '../utils/constants/Theme';
import Ionicons from '@expo/vector-icons/Ionicons';

export const PLaceButton = () => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#00A1FF', '#00D1FF']} style={styles.placeButton}>
          <View style={styles.placeButtonText}>
            <Text style={styles.text}> Lovere </Text>
            <Ionicons name="chevron-down" size={23} color="white" />
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export const FollowButton = () => {
  return(
    <TouchableOpacity>
      <View style={styles.container}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#00A1FF', '#00D1FF']} style={styles.FollowButton}>
            <Text style={styles.textFollow}> Follow </Text>
          </LinearGradient>
        </View>
    </TouchableOpacity>
  )
}

export const OnboardingButton = ({ title, onPress }) => {
  return(
    <TouchableOpacity >
      <View style={styles.loginButtonContainer}>
        <Text style={styles.loginText}> {title} </Text>
      </View>
    </TouchableOpacity>
  )
}

export const AppleSocialLoginButton = () => {
  return(
    <TouchableOpacity>
      <View style={styles.socialLoginButtonContainer}>
        <Image source={require('../assets/images/btn/social/AppleLogo.png')} resizeMode='contain' style={styles.appleLogo}/>
        <Text style={styles.textSocialLogin}> AppleID </Text>
      </View>
    </TouchableOpacity>
  )
}

export const GoogleSocialLoginButton = () => {
  return(
    <TouchableOpacity>
      <View style={styles.socialLoginButtonContainer}>
        <Image source={require('../assets/images/btn/social/GoogleLogo.png')} resizeMode='contain' style={styles.appleLogo}/>
        <Text style={styles.textSocialLogin}> Google </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  placeButton: {
    width: WIDTH_DEVICE / 4,
    height: HEIGHT_DEVICE / 25,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: SIZES.xs,
  },

  container: {
    alignItems: 'center',
  },

  text: {
    fontFamily: 'InterSemiBold',
    color: 'white',
    fontSize: SIZES.lg,
  },

  textFollow: {
    fontFamily: 'InterSemiBold',
    color: 'white',
    fontSize: SIZES.lg,
  },

  placeButtonText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  FollowButton: {
    width: WIDTH_DEVICE / 4,
    height: HEIGHT_DEVICE / 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.xxs,
  },

  loginButtonContainer: {
    backgroundColor: COLORS.primary,
    height: HEIGHT_DEVICE / 15,
    borderRadius: SIZES.xxs,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HEIGHT_DEVICE / 50
  },

  loginText: {
    color: 'white',
    fontSize: SIZES.xl,
  },

  socialLoginButtonContainer: {
    backgroundColor: 'white',
    width: WIDTH_DEVICE / 2.3,
    height: HEIGHT_DEVICE / 15,
    borderRadius: SIZES.xxs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    ...SHADOWS.medium
  },

  textSocialLogin: {
    fontFamily: 'InterRegular',
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginLeft: WIDTH_DEVICE / 60
  }
});
