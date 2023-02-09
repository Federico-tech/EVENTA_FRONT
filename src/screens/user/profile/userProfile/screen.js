import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

import { ProfileHeader, Container, Row, Button, MiniEventCard, Line } from '../../../../components';
import { ROUTES } from '../../../../navigation/Navigation';
import { selectUser } from '../../../../store/user';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, FONTS, SIZES, WIDTH_DEVICE, SIZE } from '../../../../utils/theme';

export const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data, refreshing, getRefreshedData} = useInfiniteScroll({
    entity: 'events'
  })

  return (
    <Container>
      <ProfileHeader myProfile/>
      <Text style={styles.recent}>Recent Events</Text>
        <FlatList
            data={data}
            renderItem={({ item }) => <MiniEventCard data={item} />}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
            style={styles.container}
          />
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
  },
  noDesc: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.lightGray,
    marginTop: SIZE,
  },
  desc: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
    width: SIZE * 15,
    marginTop: SIZE * 3,
    marginLeft: WIDTH_DEVICE / 20
  },
  followRow: {
    marginTop: SIZE,
    paddingHorizontal: WIDTH_DEVICE / 20,
    justifyContent: 'space-between',
    alignItems: 'center '
  },
  follow: {
    fontFamily: FONTS.regular,
    fontSize: SIZE * 0.9,
    alignSelf: 'flex-end',
    marginLeft: SIZE * 0.2,
    color: COLORS.darkGray
  },
  number: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
  },
  button: {
    alignSelf: 'flex-end',
    width: SIZE * 13,
    marginTop: SIZE,
  },
  recent: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
    marginTop: SIZE,
    marginLeft: WIDTH_DEVICE / 20,
    marginBottom: SIZE / 2
  },
  boxFollow: {
    marginRight: SIZE
  },
  info: {
    marginLeft: SIZE * 11,
    marginTop: SIZE / 2
  },
});
