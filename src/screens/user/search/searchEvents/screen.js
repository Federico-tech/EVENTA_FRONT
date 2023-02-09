import React, { useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, MiniEventCard } from '../../../../components';
import { selectSearchFilter } from '../../../../store/filter';
import { useInfiniteScroll } from '../../../../utils/hooks';

export const SearchEventScreen = () => {
  const name = useSelector(selectSearchFilter);
  
  useEffect(() => {
    getRefreshedData()
  }, [name])

  const {data, refreshing, getRefreshedData } = useInfiniteScroll({
    entity: 'events',
    filters: {
    },
  });
  

  return (
    <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <MiniEventCard data={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
      />
    </Container>
  );
};
