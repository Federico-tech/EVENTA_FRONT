import React from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { useSelector } from 'react-redux';

import { Container, HomeHeader, MiniEventCard } from '../../../components';
import { selectCurrentUserId } from '../../../store/user';
import { useInfiniteScroll } from '../../../utils/hooks';
import { FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';
import { Analytics } from './analytics';

export const OrganiserHome = () => {
  const organiserId = useSelector(selectCurrentUserId);

  const { data, refreshing, getRefreshedData } = useInfiniteScroll({
    entity: 'events',
    filters: {
      organiserId,
    },
  });
  console.log(refreshing);

  return (
    <Container>
      <HomeHeader />
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20, marginBottom: SIZE * 10 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <MiniEventCard data={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Analytics />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
          style={styles.container}
        />
      </View>
      <FlashMessage position="top" />
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.semiBold,
    marginTop: SIZE,
    fontSize: SIZES.lg,
  },
});
