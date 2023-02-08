import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Button, Container, ProfileHeader, Row } from '../../../components';
import { ROUTES } from '../../../navigation/Navigation';
import { OrganiserTopNavigator } from '../../../navigation/TopTabNavigator';
import { selectUser } from '../../../store/user';
import { SIZE, WIDTH_DEVICE, FONTS, SIZES, COLORS } from '../../../utils/theme';

export const OrganiserProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <Container>
      <ProfileHeader myProfile />
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
        <Row alignCenter>
          <Text style={styles.userName}>{user.username}</Text>
          <Row row alignCenter>
            <FontAwesome5 name="map-marker-alt" size={SIZE * 1.5} style={{ marginTop: SIZE / 2 }} />
            <Text style={styles.address}>{user.address}</Text>
          </Row>
        </Row>
        <Row row spaceBetween style={{ marginTop: SIZE }}>
          <Row alignCenter style={styles.boxFollow}>
            <Text style={styles.number}>525</Text>
            <Text style={styles.follow}>Followers</Text>
          </Row>
          <Row alignCenter style={styles.boxFollow}>
            <Text style={styles.number}>14</Text>
            <Text style={styles.follow}>Events</Text>
          </Row>
          <Button secondary containerStyle={styles.button} text={t('edit profile')} onPress={() => navigation.navigate(ROUTES.EditOrganiserScreen)} />
        </Row>
      </View>
      <OrganiserTopNavigator />
    </Container>
  );
};

const styles = StyleSheet.create({
  followerRow: {
    width: WIDTH_DEVICE,
    alignSelf: 'center',
    marginTop: SIZE,
  },
  boxFollow: {
    width: SIZE * 5,
  },
  follow: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
  },
  number: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
  },
  userName: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
    marginTop: SIZE / 2,
  },
  noDesc: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.lightGray,
    marginTop: SIZE * 0.5,
  },
  desc: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
    marginTop: SIZE * 0.5,
    textAlign: 'center',
    flexWrap: 'wrap',
    width: SIZE * 25,
  },
  address: {
    marginTop: SIZE / 2,
    color: COLORS.gray,
    marginLeft: SIZE,
    fontSize: SIZES.xs,
  },
  button: {
    width: SIZE * 14,
  },
});
