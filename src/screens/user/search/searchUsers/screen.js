import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { Container } from '../../../../components';
import { AccountRow } from '../../../../components/AccountRow';
import { ROLES } from '../../../../utils/conts';
import { useInfiniteScroll } from '../../../../utils/hooks';

export const SearchUserScreen = () => {
  const role = ROLES.USER;
  const { data, refreshing, getRefreshedData } = useInfiniteScroll({
    entity: 'users',
    filters: {
      role,
    }
  });

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => <AccountRow data={item} user/>}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
      />
    </Container>
  );
};
