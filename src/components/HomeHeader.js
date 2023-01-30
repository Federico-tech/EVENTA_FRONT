import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { LogoText } from '../assets';
import { selectUser } from '../store/user';
import { WIDTH_DEVICE, HEIGHT_DEVICE, SIZES, FONTS, SIZE, COLORS } from '../utils/theme';

export const HomeHeader = ({ data }) => {
  const userinfo = useSelector(selectUser);
  const { t } = useTranslation();

  return (
    <View>
      <LinearGradient start={{ x: 1.2, y: 0 }} end={{ x: 0, y: 0 }} colors={['#32DAE4', '#00A1FF']} style={styles.container}>
        <View style={{ flex: 1, marginTop: HEIGHT_DEVICE / 24 }}>
          <View style={styles.header}>
            <View style={styles.TextContainer}>
              {!userinfo.profilePic ? (
                <View style={styles.imageView}>
                  <FontAwesome5 name="user-alt" size={SIZE * 3} color={COLORS.white} style={{ marginBottom: SIZE / 4 }} />
                </View>
              ) : (
                <Image style={styles.imageProfile} resizeMode="contain" source={{ uri: userinfo.profilePic }} />
              )}
              <View style={styles.text}>
                <Text style={styles.welcome}>{t('welcome')}</Text>
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
    height: SIZE * 9,
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
    width: SIZE * 4.5,
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
    fontSize: SIZES.lg,
  },
  imageView: {
    width: SIZE * 4.5,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
