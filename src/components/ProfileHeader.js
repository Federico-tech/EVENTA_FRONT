import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { selectUser } from '../store/user';
import { COLORS, FONTS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';
import { IconButton } from './Button';

export const ProfileHeader = ({ myProfile }) => {
  const user = useSelector(selectUser);
  console.log('User', user)
  const navigation = useNavigation();
  return (
    <View style={{ height: SIZE * 15 }}>
      <LinearGradient start={{ x: 1.2, y: 0 }} end={{ x: 0, y: 0 }} colors={['#32DAE4', '#00A1FF']} style={styles.wrapper}>
        <View style={styles.container}>
          {!myProfile && <IconButton name="chevron-back" color="white" size={22} />}
          <Text style={styles.usernameText}>{user.username}</Text>
          {myProfile ? (
            <IconButton name="settings" color="white" size={20} onPress={() => navigation.navigate('SettingScreen')} />
          ) : (
            <IconButton name="ios-ellipsis-vertical" color="white" size={18} />
          )}
        </View>
      </LinearGradient>
      <View style={styles.profileImage}>
        {!user.profilePic ? (
          <Ionicons name="person" size={60} color={COLORS.gray} />
        ) : (
          <Image source={{ uri: user.profilePic }} style={styles.image} resizeMode="contain" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: SIZE * 10,
  },
  image: {
    borderRadius: 100,
    width: SIZE * 8,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 4,
    alignItem: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
  },
  usernameText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.xl,
  },
  profileImage: {
    width: SIZE * 8,
    aspectRatio: 1,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: SIZE * 7,
  },
});
