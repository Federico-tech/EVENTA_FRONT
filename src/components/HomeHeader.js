import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { LogoText } from '../assets';
import { ROUTES } from '../navigation/Navigation';
import { selectCurrentUser } from '../store/user';
import { WIDTH_DEVICE, HEIGHT_DEVICE, SIZES, FONTS, SIZE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';

export const HomeHeader = ({ data, organiser }) => {
  const userinfo = useSelector(selectCurrentUser);
  const navigation = useNavigation();

  return (
    <View>
      <LinearGradient start={{ x: 1.2, y: 0 }} end={{ x: 0, y: 0 }} colors={['#32DAE4', '#00A1FF']} style={styles.container}>
        <View style={{ flex: 1, marginTop: HEIGHT_DEVICE / 24 }}>
          <View style={styles.header}>
            <View style={styles.TextContainer}>
              <TouchableOpacity onPress={() => navigation.jumpTo(organiser ? ROUTES.OrganiserProfileScreen : ROUTES.ProfileScreenNavigator)}>
                <LoadingImage source={userinfo.profilePic} width={SIZE * 4} profile iconSIZE={SIZE * 2.5} />
              </TouchableOpacity>
              <View style={styles.text}>
                <Text style={styles.welcome}>Welcome back,</Text>
                <Text style={styles.federico}>{userinfo.username}</Text>
              </View>
            </View>
            <Image resizeMode="contain" style={styles.logo} source={LogoText} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZE * 8.5,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  logo: {
    width: WIDTH_DEVICE / 4,
    height: HEIGHT_DEVICE / 20,
  },
  imageProfile: {
    width: SIZE * 4,
    aspectRatio: 1,
    borderRadius: 100,
  },
  TextContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: SIZE,
  },
  welcome: {
    color: 'white',
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
  },
  federico: {
    color: 'white',
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
  },
  imageView: {
    width: SIZE * 4,
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
