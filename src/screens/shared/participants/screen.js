import _ from 'lodash';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, Header, SearchBar, Text } from '../../../components';
import { UserRow } from '../../../components/AccountRow';
import { selectSelectedEventId } from '../../../store/event';
import { selectSearchFilter } from '../../../store/filter';
import { useInfiniteScroll } from '../../../utils/hooks';
import { SIZE } from '../../../utils/theme';

export const ParticipantsScreen = () => {
  const eventId = useSelector(selectSelectedEventId);

  const name = useSelector(selectSearchFilter);

  const { data, refreshing, getRefreshedData, loadMore, getMoreData } = useInfiniteScroll({
    entity: 'participants/search',
    filters: {
      eventId,
      name,
    },
  });

  useEffect(() => {
    getRefreshedData();
  }, [name]);


  return (
    <Container>
      <Header title="Participants" />
      <FlatList
        data={data}
        renderItem={({ item }) => <UserRow data={item.user} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListHeaderComponent={<SearchBar style={{ marginTop: SIZE }} />}
      />
    </Container>
  );
};
