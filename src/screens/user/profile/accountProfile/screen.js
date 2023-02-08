import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

import { Button, Container, ProfileHeader, Row } from '../../../../components';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const AccountProfileScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { data } = route.params;
  return (
    <Container>
      <ProfileHeader data={data} />
      <Row alignCenter>
        <Text style={styles.userName}>{data.name}</Text>
        <View>{!data.bio ? <Text style={styles.noDesc}>{t('description')} </Text> : <Text style={styles.desc}>{data.bio}</Text>}</View>
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
        <Button secondary containerStyle={styles.button} text={t('following')}/>
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
    marginTop: SIZE,
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
    height: SIZE * 2.5,
    borderRadius: SIZES.xxs,
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
