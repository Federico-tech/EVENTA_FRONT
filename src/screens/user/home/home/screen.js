import { useScrollToTop } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, View, StatusBar } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { Container, EventCard, HomeHeader, HomeTop } from '../../../../components/index';
import { updateUserCoordinates } from '../../../../utils';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE } from '../../../../utils/theme';

export const HomeScreen = () => {
  const ref = React.useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    updateUserCoordinates();
  }, []);

  const { data, refreshing, getRefreshedData, getMoreData, loadMore } = useInfiniteScroll({
    entity: 'events/home',
    debug: true,
    limit: 6,
  });

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <HomeHeader />
      <FlatList
        ref={ref}
        data={data}
        renderItem={({ item }) => <EventCard eventData={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        ListHeaderComponent={<HomeTop refreshing={refreshing} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
      />
    </Container>
  );
};
