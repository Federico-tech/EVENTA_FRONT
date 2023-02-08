import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { ROUTES } from '../navigation/Navigation';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { Row } from './Row';

export const AccountRow = ({ data, user, organiser }) => {
  const { profilePic, username, name, address } = data;
  const navigation = useNavigation();
  const handleOnPress = () => navigation.navigate(ROUTES.AccountProfileScreen, { data });
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={[user && styles.userWrapper, organiser && styles.organiserWrapper]}>
        <Row row alignCenter>
          {!profilePic ? (
          <View style={styles.imageView}>
            <FontAwesome5 name="user-alt" size={SIZE * 3.5} color={COLORS.white} style={{ marginBottom: SIZE / 4 }} />
          </View>
          ) : (
            <Image source={{ uri: profilePic }} style={[user && styles.profileImage, organiser && styles.organiserImage]} />
          )}
          <Row style={{ paddingLeft: SIZE }}>
            <Text style={[user && styles.usernameText, organiser && styles.organiserText]}>{username}</Text>
            {user && <Text style={styles.nameText}>{name}</Text>}
            {organiser && 
              <View style={{width: SIZE * 15}}>
                <Text style={styles.addressText}>{address}</Text>
              </View>
            }
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
    marginTop: SIZE / 5
  },
  imageView: {
    width: SIZE * 3.5,
    aspectRatio: 1,
    borderRadius: 100
  }
});
