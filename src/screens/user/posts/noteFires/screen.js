import _ from 'lodash';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, Header, ListEmptyComponent, SearchBar } from '../../../../components';
import { UserRow } from '../../../../components/AccountRow';
import { selectSearchFilter } from '../../../../store/filter';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../../utils/theme';

export const NoteFiresScreen = ({ route }) => {
  const { data: note } = route.params;
  const filter = useSelector(selectSearchFilter);

  const { data, getMoreData, refreshing, getRefreshedData, loadMore, getData } = useInfiniteScroll({
    entity: `fires`,
    limit: 20,
    filters: {
      noteId: note._id,
      search: filter,
    },
  });

  useEffect(() => {
    getData();
  }, [filter]);

  return (
    <Container>
      <Header title="Fires" back />
      <FlatList
        data={data}
        renderItem={({ item }) => <UserRow data={item?.user} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        style={{ marginHorizontal: WIDTH_DEVICE / 20 }}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListHeaderComponent={<SearchBar />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="This note has no fires" />}
      />
    </Container>
  );
};
