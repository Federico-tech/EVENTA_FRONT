import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { setUserSelected } from '../store/user';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { Row } from './Row';

export const UserRow = ({ data }) => {
  const { profilePic, username, name } = data;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleOnPress = () => {
    dispatch(setUserSelected(data));
    navigation.navigate(ROUTES.AccountUserScreen, { data });
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.userWrapper}>
        <Row row alignCenter>
          {!profilePic ? (
            <View style={styles.imageView}>
              <FontAwesome5 name="user-alt" size={SIZE * 2.5} color={COLORS.white} style={{ marginBottom: SIZE / 4 }} />
            </View>
          ) : (
            <Image source={{ uri: profilePic }} style={styles.profileImage} />
          )}
          <Row style={{ paddingLeft: SIZE }}>
            <Text style={styles.usernameText}>{username}</Text>
            <Text style={styles.nameText}>{name}</Text>
          </Row>
        </Row>
      </View>
    </TouchableOpacity>
  );
};

export const OrganiserRow = ({ data }) => {
  const { profilePic, username, address } = data;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleOnPress = () => {
    dispatch(setUserSelected(data));
    navigation.navigate(ROUTES.AccountOrganiserScreen, { data });
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.organiserWrapper}>
        <Row row alignCenter>
          {!profilePic ? (
            <View style={styles.imageView}>
              <FontAwesome5 name="user-alt" size={SIZE * 2.5} color={COLORS.white} style={{ marginBottom: SIZE / 4 }} />
            </View>
          ) : (
            <Image source={{ uri: profilePic }} style={styles.organiserImage} />
          )}
          <Row style={{ paddingLeft: SIZE }}>
            <Text style={styles.organiserText}>{username}</Text>
            <View style={{ width: SIZE * 15 }}>
              <Text style={styles.addressText}>{address}</Text>
            </View>
          </Row>
        </Row>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userWrapper: {
    marginTop: SIZE,
    height: SIZE * 3.5,
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  organiserWrapper: {
    marginTop: SIZE,
    height: SIZE * 5,
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
  organiserImage: {
    width: SIZE * 5,
    aspectRatio: 1,
    borderRadius: 100,
  },
  organiserText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
  },
  addressText: {
    color: COLORS.gray,
    fontSize: SIZES.xxs,
    marginTop: SIZE / 5,
  },
  imageView: {
    width: SIZE * 3.5,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
