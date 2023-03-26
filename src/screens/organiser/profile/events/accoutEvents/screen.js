import _ from 'lodash';
import React from 'react';
import { View, ActivityIndicator, SectionList } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, MiniEventCard } from '../../../../../components';
import { OrganiserAccountTopNavigator } from '../../../../../navigation/TopTabNavigator';
import { selectSelectedUserId } from '../../../../../store/user';
import { useInfiniteScroll } from '../../../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../../../utils/theme';

export const EventsAccountScreen = () => {
  const organiserId = useSelector(selectSelectedUserId);

  const { data, refreshing, getRefreshedData, getMoreData, loadMore } = useInfiniteScroll({
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
        nestedScrollEnabled
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
      />
    </Container>
  );
};
