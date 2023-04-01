import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { IconButton } from './Button';

export const ProfileHeader = ({ myProfile, user }) => {
  const navigation = useNavigation();
  return (
    <View>
      <LinearGradient start={{ x: 1.2, y: 0 }} end={{ x: 0, y: 0 }} colors={['#32DAE4', '#00A1FF']} style={styles.wrapper}>
        <View style={styles.container}>
          {!myProfile && <IconButton name="chevron-back" color="white" size={SIZE * 2} onPress={() => navigation.goBack()} />}
          <Text style={styles.usernameText}>{user.username}</Text>
          {myProfile ? (
            <IconButton name="settings-sharp" color="white" size={SIZE * 1.5} onPress={() => navigation.navigate('SettingScreen')} />
          ) : (
            <IconButton name="ios-ellipsis-vertical" color="white" size={18} />
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: SIZE * 7,
    zIndex: -1,
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
    fontSize: SIZES.lg,
  },
  name: {
    paddingLeft: SIZE * 10,
    paddingTop: SIZE,
  },
});
