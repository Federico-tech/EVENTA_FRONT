import _ from 'lodash';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, Header, ListEmptyComponent, MiniEventCard, SearchBar } from '../../../../components';
import { selectSearchFilter } from '../../../../store/filter';
import { selectCurrentUserId } from '../../../../store/user';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../../utils/theme';

export const PopularEventsScreen = () => {
  const searchFilter = useSelector(selectSearchFilter);
  const currentUserId = useSelector(selectCurrentUserId);

  const { data, getMoreData, loadMore, refreshing, getRefreshedData } = useInfiniteScroll({
    entity: 'events',
    filters: {
      q: searchFilter,
      organiserId: currentUserId,
    },
  });

  useEffect(() => {
    getRefreshedData();
  }, [searchFilter]);

  return (
    <Container>
      <Header back title="Popular events" />
      <FlatList
        data={data}
        renderItem={({ item }) => <MiniEventCard data={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListHeaderComponent={<SearchBar style={{ marginHorizontal: WIDTH_DEVICE / 20 }} />}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="No upcoming events" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
      />
    </Container>
  );
};
