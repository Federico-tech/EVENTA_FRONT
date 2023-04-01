import _ from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { Container, Header, ListEmptyComponent, MiniEventCard } from '../../../../components';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE } from '../../../../utils/theme';

export const LikeScreen = () => {
  const { t } = useTranslation();

  const { data, loadMore, getMoreData, refreshing, getRefreshedData } = useInfiniteScroll({
    entity: 'likes/events',
    limits: 10,
  });

  return (
    <Container>
      <Header title={t('likes')} />
      <FlatList
        data={data}
        renderItem={({ item }) => <MiniEventCard data={item} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={<ListEmptyComponent text="There are no events you liked" />}
      />
    </Container>
  );
};
