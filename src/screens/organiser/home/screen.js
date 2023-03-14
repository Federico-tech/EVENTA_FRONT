import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Container, HomeHeader, MiniEventCard, Text } from '../../../components';
import { selectDateFilter, setDateFilter } from '../../../store/filter';
import { useInfiniteScroll } from '../../../utils/hooks';
import { COLORS, SIZE, WIDTH_DEVICE } from '../../../utils/theme';
import { Analytics } from './analytics';

export const OrganiserHome = () => {
  const currentDate = DateTime.now().toISO();
  const dispatch = useDispatch()
  const filter = useSelector(selectDateFilter)

  const { data, getMoreData, refreshing, getRefreshedData, loadMore, setData, getData } = useInfiniteScroll({
    entity: 'events',
    filters: {
      'date.$lt': currentDate,
    },
    limit: 10,
  });

  useEffect(() => {
    getData()
  }, [filter])

  const updateFilters = (f) => {
    setData([]);
    dispatch(setDateFilter(f));
  };

  return (
    <Container>
      <HomeHeader organiser />
      <FlatList
        data={data}
        renderItem={({ item }) => <MiniEventCard data={item} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListHeaderComponent={
          <View>
            <Analytics />
            <View style={{ marginHorizontal: WIDTH_DEVICE / 20, flexDirection: 'row' }}>
              <Button
                secondary
                containerStyle={[filter === 'upcoming' && { backgroundColor: 'black' }, { marginRight: SIZE }]}
                onPress={() => updateFilters('upcoming')}>
                <Text medium color={filter === 'upcoming' ? COLORS.white : 'black'}>
                  Upcoming
                </Text>
              </Button>
              <Button
                secondary
                containerStyle={[filter === 'past' && { backgroundColor: 'black' }, { marginRight: SIZE, width: SIZE * 7 }]}
                onPress={() => updateFilters('past')}>
                <Text medium color={filter === 'past' ? COLORS.white : 'black'}>
                  Past
                </Text>
              </Button>
            </View>
          </View>
        }
      />
      <FlashMessage position="top" />
    </Container>
  );
};
