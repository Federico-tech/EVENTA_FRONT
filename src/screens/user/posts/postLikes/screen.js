import React from 'react';
import _ from 'lodash'
import { Container, Header, ListEmptyComponent, SearchBar } from '../../../../components';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { UserRow } from '../../../../components/AccountRow';
import { ActivityIndicator, View } from 'react-native';
import { SIZE, WIDTH_DEVICE } from '../../../../utils/theme';

export const PostLikesScreen = ({ route }) => {
  const { postData } = route.params

  const { data, getMoreData, refreshing, getRefreshedData, loadMore } = useInfiniteScroll({
    entity: `likes`,
    limit: 20,
    filters: {
      objectId: postData._id
    }
  })
  
  return (
    <Container>
      <Header title="Likes" back />
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
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="This post has no likes" />}
      />
    </Container>
  );
};
