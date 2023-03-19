import { useScrollToTop } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
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
    entity: 'events',
    limit: 6,
  });

  return (
    <Container>
      <HomeHeader />
      <FlatList
        ref={ref}
        data={data}
        renderItem={({ item }) => <EventCard eventData={item} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListHeaderComponent={<HomeTop />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
      />
    </Container>
  );
};
