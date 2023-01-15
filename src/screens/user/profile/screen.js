import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { ProfileHeader, Container, Row, Button } from '../../../components';
import { selectUser } from '../../../store/user';
import { logout } from '../../../utils';
import { COLORS, FONTS, SIZES, WIDTH_DEVICE, HEIGHT_DEVICE, SIZE } from '../../../utils/theme';

export const ProfileScreen = () => {
  const user = useSelector(selectUser);
  return (
    <Container>
      <ProfileHeader myProfile />
      <Row alignCenter>
        <Text style={styles.userName}>{user.name}</Text>
        {!user.bio ? <Text style={styles.noDesc}> Description </Text> : <Text style={styles.desc}>{user.bio}</Text>}
      </Row>
      <Row row spaceAround style={styles.followRow}>
        <Row alignCenter style={styles.boxFollow}>
          <Text style={styles.number}>525</Text>
          <Text style={styles.follow}>Followers</Text>
        </Row>
        <Row alignCenter style={styles.boxFollow}>
          <Text style={styles.number}>125</Text>
          <Text style={styles.follow}>Following</Text>
        </Row>
        <Row alignCenter style={styles.boxFollow}>
          <Text style={styles.number}>12</Text>
          <Text style={styles.follow}>Events</Text>
        </Row>
      </Row>
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
        <Button gradient containerStyle={styles.button} text="Edit Profile" />
        <Text style={styles.recent}>Recent Events</Text>
      </View>
      <TouchableOpacity style={{ marginTop: 150 }} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    alignItems: 'center',
  },
  userName: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.lg,
    marginTop: HEIGHT_DEVICE / 60,
  },
  noDesc: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.lightGray,
    marginTop: HEIGHT_DEVICE / 150,
  },
  desc: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
    marginTop: HEIGHT_DEVICE / 150,
    textAlign: 'center',
    flexWrap: 'wrap',
    width: WIDTH_DEVICE / 2,
  },
  followRow: {
    marginTop: HEIGHT_DEVICE / 80,
    paddingHorizontal: SIZE * 4,
  },
  follow: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: HEIGHT_DEVICE / 300,
  },
  number: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.lg,
  },
  button: {
    marginHorizontal: WIDTH_DEVICE / 20,
    width: WIDTH_DEVICE / 1.1,
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 50,
  },
  recent: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
    marginTop: HEIGHT_DEVICE / 70,
  },
  boxFollow: {
    width: WIDTH_DEVICE / 6,
  },
});
