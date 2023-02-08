import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { Container } from '../../../../components';
import { AccountRow } from '../../../../components/AccountRow';
import { ROLES } from '../../../../utils/conts';
import { useInfiniteScroll } from '../../../../utils/hooks';

export const SearchOrganiserScreen = () => {
  const role = ROLES.ORGANISER;
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
        renderItem={({ item }) => <AccountRow data={item} organiser />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
      />
    </Container>
  );
};
