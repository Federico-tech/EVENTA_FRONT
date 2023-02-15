import _ from 'lodash';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, Header } from '../../../components';
import { UserRow } from '../../../components/AccountRow';
import { selectSelectedEventId } from '../../../store/event';
import { useInfiniteScroll } from '../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../utils/theme';

export const ParticipantsScreen = () => {
  const eventId = useSelector(selectSelectedEventId);

  const { data, refreshing, getRefreshedData, loadMore, getMoreData } = useInfiniteScroll({
    entity: 'participants',
    limit: 20,
    filters: {
      eventId,
    },
  });

  console.log(data);

  return (
    <Container>
      <Header title="Participants" />
      <FlatList
        data={data}
        style={{ width: WIDTH_DEVICE }}
        renderItem={({ item }) => <UserRow data={item.user} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
      />
    </Container>
  );
};
