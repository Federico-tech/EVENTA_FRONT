import _ from 'lodash';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, MiniEventCard, Text } from '../../../../components';
import { selectSearchFilter } from '../../../../store/filter';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, SIZE } from '../../../../utils/theme';

export const SearchEventScreen = () => {
  const name = useSelector(selectSearchFilter);

  const { data, refreshing, getRefreshedData, loadMore, getMoreData } = useInfiniteScroll({
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
        <FlatList
          data={data}
          renderItem={({ item }) => <MiniEventCard data={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={_.throttle(getMoreData, 400)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
          ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        />
      {name && data.length === 0 && (
        <Text color={COLORS.darkGray} medium style={styles.noFoundText}>
          No results found for '{name}'
        </Text>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  noFoundText: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: SIZE,
  },
});
