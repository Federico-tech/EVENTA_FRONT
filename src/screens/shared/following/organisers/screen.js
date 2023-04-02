import _ from 'lodash';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, ListEmptyComponent } from '../../../../components';
import { OrganiserRow } from '../../../../components/AccountRow';
import { selectSearchFilter } from '../../../../store/filter';
import { ROLES } from '../../../../utils/conts';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE } from '../../../../utils/theme';

export const FollowingOrganisersScreen = ({ route }) => {
  const { followingParams } = route.params;
  const filter = useSelector(selectSearchFilter);

  const { data, refreshing, getRefreshedData, loadMore, getMoreData, getData } = useInfiniteScroll({
    entity: `users/${followingParams._id}/followed`,
    filters: {
      search: filter,
      role: ROLES.ORGANISER,
    },
    limit: 20,
  });

  useEffect(() => {
    getRefreshedData();
  }, [filter]);

  useEffect(() => {
    getData();
  }, [followingParams]);

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => <OrganiserRow data={item?.followed} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="This account has no following" />}
      />
    </Container>
  );
};
