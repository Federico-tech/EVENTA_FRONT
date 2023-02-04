import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Container, EventCard, HomeHeader, HomeTop } from '../../../../components/index';
import { updateUserCoordinates } from '../../../../utils';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const HomeScreen = () => {
  //useEffect(() => {
  //  updateUserCoordinates();
  //}, []);
  const { data, getData } = useInfiniteScroll({
    entity: 'events',
  });

  console.debug({ HomeScreen: data });

  return (
    <Container>
      <HomeHeader />
      <FlatList
        data={data}
        renderItem={({ item }) => <EventCard data={item} />}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={<HomeTop />}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  map: {
    height: SIZE * 17,
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE,
    borderRadius: SIZES.xxs,
  },
});
