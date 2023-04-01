import _ from 'lodash';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, Header, ListEmptyComponent, MiniEventCard, SearchBar } from '../../../../components';
import { selectSearchFilter } from '../../../../store/filter';
import { selectSelectedUserId } from '../../../../store/user';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../../utils/theme';

export const SearchOrganiserEventsScreen = () => {
  const name = useSelector(selectSearchFilter);
  const organiserId = useSelector(selectSelectedUserId);
  const { data, refreshing, getRefreshedData, loadMore, getMoreData } = useInfiniteScroll({
    entity: 'events',
    limit: 7,
    filters: {
      q: name,
      organiserId,
    },
  });

  useEffect(() => {
    getRefreshedData();
  }, [name]);

  return (
    <Container>
      <Header title="Events" back />
      <FlatList
        data={data}
        renderItem={({ item }) => <MiniEventCard data={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListHeaderComponent={<SearchBar style={{ marginTop: SIZE, marginHorizontal: WIDTH_DEVICE / 20 }} />}
        ListEmptyComponent={<ListEmptyComponent text={`This organizer hasn't created any events yet`} />}
      />
    </Container>
  );
};
