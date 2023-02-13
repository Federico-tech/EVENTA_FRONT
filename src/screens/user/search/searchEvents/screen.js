import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, MiniEventCard } from '../../../../components';
import { selectSearchFilter } from '../../../../store/filter';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE } from '../../../../utils/theme';

export const SearchEventScreen = () => {
  const name = useSelector(selectSearchFilter);

  const { data, refreshing, getRefreshedData, loadMore } = useInfiniteScroll({
    entity: 'events',
    limit: 7,
    filters: {
      q: name,
    },
  });

  useEffect(() => {
    getRefreshedData();
  }, [name]);

  return (
    <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
      {name && (
        <FlatList
          data={data}
          renderItem={({ item }) => <MiniEventCard data={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
          ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        />
      )}
    </Container>
  );
};
