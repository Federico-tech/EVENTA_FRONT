import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { selectUser } from '../store/user';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { IconButton } from './Button';

export const ProfileHeader = ({ name, myProfile }) => {
  const user = useSelector(selectUser);
  const navigation = useNavigation()
  return (
    <View style={{ height: HEIGHT_DEVICE / 4.7 }}>
      <LinearGradient start={{ x: 1.2, y: 0 }} end={{ x: 0, y: 0 }} colors={['#32DAE4', '#00A1FF']} style={styles.wrapper}>
        <View style={styles.container}>
          {!myProfile && <IconButton name="chevron-back" color="white" size={22} />}
          <Text style={styles.usernameText}>{user.username}</Text>
          {myProfile ? <IconButton name="settings" color="white" size={20} onPress={() => navigation.navigate('SettingScreen')}/> : <IconButton name="ios-ellipsis-vertical" color="white" size={18} />}
        </View>
      </LinearGradient>
      <View style={styles.profileImage}>
        <Ionicons name="person" size={60} color={COLORS.gray} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: HEIGHT_DEVICE / 7,
  },
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: HEIGHT_DEVICE / 18,
    alignItem: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
  },
  usernameText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
  },
  profileImage: {
    width: WIDTH_DEVICE / 3.7,
    aspectRatio: 1,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: HEIGHT_DEVICE / 10.5,
  },
});
