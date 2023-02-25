import _ from 'lodash';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';

import { Container, Header, SearchBar } from '../../../components';
import { UserRow } from '../../../components/AccountRow';
import { useInfiniteScroll } from '../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../utils/theme';

export const FollowersScreen = ({ route }) => {
  const { user } = route.params;

  const { data, refreshing, getRefreshedData, loadMore, getMoreData } = useInfiniteScroll({
    entity: 'follow',
    filters: {
      followedId: user?._id,
    },
    limit: 20,
  });

  return (
    <Container>
      <Header title="Followers" />
      <FlatList
        data={data}
        style={{ width: WIDTH_DEVICE }}
        renderItem={({ item }) => <UserRow data={item.follower} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListHeaderComponent={<SearchBar style={{ marginTop: SIZE }} />}
      />
    </Container>
  );
};
