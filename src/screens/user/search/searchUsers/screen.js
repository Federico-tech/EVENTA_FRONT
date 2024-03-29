import _ from 'lodash';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, ListEmptyComponent } from '../../../../components';
import { UserRow } from '../../../../components/AccountRow';
import { selectSearchFilter } from '../../../../store/filter';
import { ROLES } from '../../../../utils/conts';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../../utils/theme';

export const SearchUserScreen = () => {
  const name = useSelector(selectSearchFilter);
  const role = ROLES.USER;
  const { data, refreshing, getRefreshedData, loadMore, getMoreData } = useInfiniteScroll({
    entity: 'users',
    limit: 7,
    filters: {
      role,
      q: name,
    },
  });

  useEffect(() => {
    getRefreshedData();
  }, [name]);

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => <UserRow data={item} />}
        keyExtractor={(item) => item._id}
        style={{ marginHorizontal: WIDTH_DEVICE / 20 }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text={`No results found for '${name}'`} />}
      />
    </Container>
  );
};
