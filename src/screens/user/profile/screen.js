import { useNavigation } from '@react-navigation/native';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { ProfileHeader, Container, Row, Button } from '../../../components';
import { ROUTES } from '../../../navigation/Navigation';
import { selectUser } from '../../../store/user';
import { useTranslation } from 'react-i18next';
import { COLORS, FONTS, SIZES, WIDTH_DEVICE, SIZE } from '../../../utils/theme';

export const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const { t } = useTranslation()
  return (
    <Container>
      <ProfileHeader myProfile />
      <Row alignCenter>
        <Text style={styles.userName}>{user.name}</Text>
        {!user.bio ? <Text style={styles.noDesc}>{t('description')} </Text> : <Text style={styles.desc}>{user.bio}</Text>}
      </Row>
      <Row row spaceAround style={styles.followRow}>
        <Row alignCenter style={styles.boxFollow}>
          <Text style={styles.number}>525</Text>
          <Text style={styles.follow}>Followers</Text>
        </Row>
        <Row alignCenter style={styles.boxFollow}>
          <Text style={styles.number}>125</Text>
          <Text style={styles.follow}>{t('following')}</Text>
        </Row>
        <Row alignCenter style={styles.boxFollow}>
          <Text style={styles.number}>12</Text>
          <Text style={styles.follow}>{t('event')}</Text>
        </Row>
      </Row>
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
        <Button secondary containerStyle={styles.button} text={t('edit profile')} onPress={() => navigation.navigate(ROUTES.EditUserScreen)} />
        <Text style={styles.recent}>{t('recent events')}</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    alignItems: 'center',
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
    fontSize: SIZES.xs,
    marginTop: SIZE * 0.5,
    textAlign: 'center',
    flexWrap: 'wrap',
    width: WIDTH_DEVICE / 2,
  },
  followRow: {
    marginTop: SIZE * 0.5,
    paddingHorizontal: SIZE * 4,
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
  button: {
    marginHorizontal: WIDTH_DEVICE / 20,
    width: WIDTH_DEVICE / 1.1,
    alignSelf: 'center',
    marginTop: SIZE,
  },
  recent: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
    marginTop: SIZE,
  },
  boxFollow: {
    width: SIZE * 5,
  },
});
