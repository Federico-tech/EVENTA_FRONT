import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { LogoText } from '../assets';
import { selectUser } from '../store/user';
import { WIDTH_DEVICE, HEIGHT_DEVICE, SIZES, FONTS } from '../utils/theme';

export const HomeHeader = ({ data }) => {
  const userinfo = useSelector(selectUser);

  return (
    <View>
      <LinearGradient start={{ x: 1.2, y: 0 }} end={{ x: 0, y: 0 }} colors={['#32DAE4', '#00A1FF']} style={styles.container}>
        <View style={{ flex: 1, marginTop: HEIGHT_DEVICE / 24 }}>
          <View style={styles.header}>
            <View style={styles.TextContainer}>
              <Image style={styles.imageProfile} resizeMode="contain" source={require('../assets/images/ProfileImage1.png')} />
              <View style={styles.text}>
                <Text style={styles.welcome}> Welcome Back </Text>
                <Text style={styles.federico}> Ciao </Text>
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
    height: HEIGHT_DEVICE / 8.5,
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WIDTH_DEVICE / 24,
  },

  logo: {
    width: WIDTH_DEVICE / 4,
    height: HEIGHT_DEVICE / 20,
  },

  imageProfile: {
    width: WIDTH_DEVICE / 9,
    height: HEIGHT_DEVICE / 9,
  },

  TextContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginLeft: WIDTH_DEVICE / 40,
  },

  welcome: {
    color: 'white',
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
  },

  federico: {
    color: 'white',
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
  },
});
