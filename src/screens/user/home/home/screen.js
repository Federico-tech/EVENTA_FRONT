import { useScrollToTop } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { Container, EventCard, HomeHeader, HomeTop, ListEmptyComponent } from '../../../../components/index';
import { updateUserCoordinates } from '../../../../utils';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE } from '../../../../utils/theme';

export const HomeScreen = () => {
  const listRef = React.useRef(null);
  const homeRef = React.useRef(null);

  useScrollToTop(listRef);

  useEffect(() => {
    updateUserCoordinates();
  }, []);

  const { data, refreshing, getRefreshedData, getMoreData, loadMore } = useInfiniteScroll({
    entity: 'events/home',
    debug: true,
    limit: 6,
  });

  const onRefresh = async () => {
    await Promise.all([getRefreshedData(), homeRef?.current?.onRefresh()]).catch((e) => console.debug({ homeError: e }));
  };

  return (
    <Container>
      <HomeHeader />
      <FlatList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <EventCard eventData={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        ListHeaderComponent={<HomeTop ref={homeRef} mapData={data} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="No upcoming events" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Container>
  );
};
