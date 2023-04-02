import _ from 'lodash';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, ListEmptyComponent, MiniEventCard } from '../../../../components';
import { selectSelectedUserId } from '../../../../store/user';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { WIDTH_DEVICE } from '../../../../utils/theme';

export const PastEventsScreen = () => {
  const organiserId = useSelector(selectSelectedUserId);

  const { data, refreshing, getRefreshedData, getMoreData } = useInfiniteScroll({
    entity: 'events',
    limit: 7,
    filters: {
      organiserId,
    },
  });

  return (
    <Container>
      <FlatList
        data={data}
        style={{ width: WIDTH_DEVICE }}
        renderItem={({ item }) => <MiniEventCard data={item} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="There are no past event" />}
      />
    </Container>
  );
};
