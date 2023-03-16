import _ from 'lodash';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container } from '../../../../components';
import { UserRow } from '../../../../components/AccountRow';
import { selectSearchFilter } from '../../../../store/filter';
import { selectSelectedUser } from '../../../../store/user';
import { ROLES } from '../../../../utils/conts';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../../utils/theme';

export const FollowingOrganisersScreen = ({ route }) => {
  const user = useSelector(selectSelectedUser);
  const filter = useSelector(selectSearchFilter);

  const { data, refreshing, getRefreshedData, loadMore, getMoreData, getData } = useInfiniteScroll({
    entity: `users/${user._id}/followed`,
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
  }, [user]);

  return (
    <Container>
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
      />
    </Container>
  );
};
