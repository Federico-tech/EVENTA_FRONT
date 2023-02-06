import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { Container } from '../../../../components';
import { AccountRow } from '../../../../components/AccountRow';
import { useInfiniteScroll } from '../../../../utils/hooks';

export const SearchUserScreen = () => {
  const { data, refreshing, getRefreshedData } = useInfiniteScroll({
    entity: 'users',
  });

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => <AccountRow data={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
      />
    </Container>
  );
};
