import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Button, Container, ProfileHeader, Row, ReadMoreButton } from '../../../components';
import { ROUTES } from '../../../navigation/Navigation';
import { selectUser } from '../../../store/user';
import { useTranslation } from 'react-i18next';

import { SIZE, WIDTH_DEVICE, FONTS, SIZES, COLORS } from '../../../utils/theme';

export const OrganiserProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const { t } = useTranslation()
  return (
    <Container>
      <ProfileHeader myProfile />
      <Row row spaceBetween style={styles.followerRow}>
        <Row alignCenter style={styles.boxFollow}>
          <Text style={styles.number}>525</Text>
          <Text style={styles.follow}>followers</Text>
        </Row>
        <Row alignCenter style={styles.boxFollow}>
          <Text style={styles.number}>25</Text>
          <Text style={styles.follow}>Events</Text>
        </Row>
      </Row>
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
        <Row alignCenter>
          <Text style={styles.userName}>{user.username}</Text>
          <FontAwesome5 name="map-marker-alt" size={SIZE * 2} style={{ marginTop: SIZE / 2 }} />
          <Text style={styles.address}>{user.address}</Text>
          {!user.bio ? <Text style={styles.noDesc}>{t('description')} </Text> : <ReadMoreButton text={user.bio} style={styles.desc} />}
        </Row>
        <Button
          secondary
          containerStyle={styles.button}
          text={t('edit profile')}
          onPress={() => navigation.navigate(ROUTES.EditOrganiserScreen)}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  followerRow: {
    position: 'absolute',
    width: WIDTH_DEVICE,
    height: SIZE * 3,
    marginTop: SIZE * 15,
    paddingHorizontal: SIZE * 3,
  },
  boxFollow: {
    width: SIZE * 6,
    height: SIZE * 3.5,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: SIZES.xxs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  follow: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
    marginTop: SIZE * 0.1,
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
    width: SIZE * 15,
    textAlign: 'center',
    marginTop: SIZE / 2,
    color: COLORS.gray,
  },
  button: {
    marginHorizontal: WIDTH_DEVICE / 20,
    width: WIDTH_DEVICE / 1.1,
    alignSelf: 'center',
    marginTop: SIZE,
  },
});
