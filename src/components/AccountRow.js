import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { ROUTES } from '../navigation/Navigation';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { Row } from './Row';

export const AccountRow = ({ data }) => {
  const { profilePic, username, name } = data;
  const navigation = useNavigation();
  const handleOnPress = () => navigation.navigate(ROUTES.AccountProfileScreen, { data });
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.wrapper}>
        <Row row alignCenter>
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
          <Row style={{ paddingLeft: SIZE / 2 }}>
            <Text style={styles.usernameText}>{username}</Text>
            <Text style={styles.nameText}>{name}</Text>
          </Row>
        </Row>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: SIZE,
    height: SIZE * 3.5,
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  profileImage: {
    width: SIZE * 3.5,
    aspectRatio: 1,
    borderRadius: 100,
  },
  usernameText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.sm,
  },
  nameText: {
    color: COLORS.gray,
  },
});
