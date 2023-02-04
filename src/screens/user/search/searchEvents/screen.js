import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, MiniEventCard } from '../../../../components';
import { getEvents } from '../../../../services/events';
import { selectEvents } from '../../../../store/event';
import { selectSearchFilter } from '../../../../store/filter';

export const SearchEventScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const searchFilt = useSelector(selectSearchFilter)
  console.log(searchFilt)
  
  const onRefresh = async () => {
    setRefreshing(true);
    await getEvents();
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const { data } = useSelector(selectEvents);

  return (
    <Container style={{alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={data}
        renderItem={({ item }) => <MiniEventCard data={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Container>
  );
};
