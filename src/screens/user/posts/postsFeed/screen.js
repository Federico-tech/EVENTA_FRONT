import { useIsFocused, useNavigation, useScrollToTop } from '@react-navigation/native';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';

import { Container, Header, ListEmptyComponent, PostCard, Text } from '../../../../components';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE, WIDTH_DEVICE } from '../../../../utils/theme';

export const PostsFeedScreen = ({ route }) => {
  const [entity, setEntity] = useState('posts/home');
  const navigation = useNavigation();
  const { event } = route?.params || {};
  const [eventFilter, setEventFilter] = useState(event?.name);

  const ref = React.useRef(null);
  const notesRef = React.useRef(null);
  useScrollToTop(ref);

  const isFocused = useIsFocused();

  const { data, getMoreData, getRefreshedData, loadMore, refreshing, getData } = useInfiniteScroll({
    entity,
    limit: 6,
    debug: true,
  });

  console.debug({ post: data });

  useEffect(() => {
    if (event) {
      setEventFilter(event?.name);
      setEntity(event ? `events/${event._id}/posts` : 'posts/home');
    }
  }, [isFocused]);

  useCallback(() => {
    if (entity) {
      getData();
    }
  }, [entity, eventFilter, isFocused]);

  const deleteEventFilter = async () => {
    setEventFilter('');
    await getData();
    setEntity('posts/home');
  };

  const onRefresh = async () => {
    await Promise.all([getRefreshedData(), notesRef?.current?.onRefresh()]).catch((e) => console.debug({ homeError: e }));
  };

  return (
    <Container>
      <Header title="Moments" plus back />
      <FlatList
        ref={ref}
        data={data}
        renderItem={({ item }) => <PostCard postData={item} getData={getData} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={<Text>{eventFilter}</Text>}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="There are no new moments for you" />}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 4,
    marginBottom: SIZE,
  },
});
