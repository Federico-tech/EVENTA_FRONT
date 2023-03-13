import _ from 'lodash';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, Header, SearchBar } from '../../../components';
import { UserRow } from '../../../components/AccountRow';
import { selectSearchFilter } from '../../../store/filter';
import { useInfiniteScroll } from '../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../utils/theme';

export const FollowersScreen = ({ route }) => {
  const { user } = route.params;
  const filter = useSelector(selectSearchFilter);

  const { data, refreshing, getRefreshedData, loadMore, getMoreData } = useInfiniteScroll({
    entity: `users/${user._id}/followers`,
    filters: {
      search: filter,
    },
    limit: 20,
  });

  useEffect(() => {
    getRefreshedData();
  }, [filter]);

  return (
    <Container>
      <Header title="Followers" />
      <FlatList
        data={data}
        renderItem={({ item }) => <UserRow data={item?.follower} />}
        style={{ marginHorizontal: WIDTH_DEVICE / 20 }}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListHeaderComponent={<SearchBar style={{ marginTop: SIZE }} />}
      />
    </Container>
  );
};
