import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Container } from '../../../../components';
import { UserRow } from '../../../../components/AccountRow';
import { selectSearchFilter } from '../../../../store/filter';
import { ROLES } from '../../../../utils/conts';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE } from '../../../../utils/theme';

export const SearchUserScreen = () => {
  const name = useSelector(selectSearchFilter);
  const role = ROLES.USER;
  const { data, refreshing, getRefreshedData, loadMore } = useInfiniteScroll({
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
      {name && (
        <FlatList
          data={data}
          renderItem={({ item }) => <UserRow data={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
          ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        />
      )}
    </Container>
  );
};
