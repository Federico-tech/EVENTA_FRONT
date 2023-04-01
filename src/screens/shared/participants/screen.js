/* eslint-disable no-unused-vars */
import _ from 'lodash';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, Header, ListEmptyComponent, SearchBar, Text } from '../../../components';
import { UserRow } from '../../../components/AccountRow';
import { selectSelectedEventId } from '../../../store/event';
import { selectSearchFilter } from '../../../store/filter';
import { useInfiniteScroll } from '../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../utils/theme';

export const ParticipantsScreen = () => {
  const eventId = useSelector(selectSelectedEventId);

  const name = useSelector(selectSearchFilter);

  const { data, refreshing, getRefreshedData, loadMore, getMoreData } = useInfiniteScroll({
    entity: `events/${eventId}/participants`,
    filters: {
      search: name,
    },
  });

  useEffect(() => {
    getRefreshedData();
  }, [name]);

  return (
    <Container>
      <Header title="Participants" back />
      <FlatList
        data={data}
        renderItem={({ item }) => <UserRow data={item.user} />}
        style={{ marginHorizontal: WIDTH_DEVICE / 20 }}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListHeaderComponent={<SearchBar style={{ marginTop: SIZE }} />}
        ListEmptyComponent={<ListEmptyComponent text="This event has no participants" />}
      />
    </Container>
  );
};
