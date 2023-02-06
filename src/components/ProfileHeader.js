import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { selectUser } from '../store/user';
import { COLORS, FONTS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';
import { IconButton } from './Button';

export const ProfileHeader = ({ myProfile, data }) => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  return (
    <View style={{ height: SIZE * 15 }}>
      <LinearGradient start={{ x: 1.2, y: 0 }} end={{ x: 0, y: 0 }} colors={['#32DAE4', '#00A1FF']} style={styles.wrapper}>
        <View style={styles.container}>
          {!myProfile && <IconButton name="chevron-back" color="white" size={SIZE * 2} onPress={() => navigation.goBack()} />}
          <Text style={styles.usernameText}>{myProfile ? user.username : data.username}</Text>
          {myProfile ? (
            <IconButton name="settings" color="white" size={SIZE * 2} onPress={() => navigation.navigate('SettingScreen')} />
          ) : (
            <IconButton name="ios-ellipsis-vertical" color="white" size={18} />
          )}
        </View>
      </LinearGradient>
      <View style={styles.profileImage}>
        {!user.profilePic || (!myProfile && !data.profilePic) ? (
          <Ionicons name="person" size={60} color={COLORS.gray} />
        ) : (
          <Image source={{ uri: myProfile ? user.profilePic : data.profilePic }} style={styles.image} resizeMode="contain" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: SIZE * 9.5,
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
