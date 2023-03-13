import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';

import { Button, Container, HomeHeader, MiniEventCard, Text } from '../../../components';
import { useInfiniteScroll } from '../../../utils/hooks';
import { COLORS, SIZE, WIDTH_DEVICE } from '../../../utils/theme';
import { Analytics } from './analytics';

export const OrganiserHome = () => {
  const [eventFilter, setEventFilter] = useState('upcoming');
  const currentDate = DateTime.now().toISO();

  const { data, getMoreData, refreshing, getRefreshedData, loadMore } = useInfiniteScroll({
    entity: 'events',
    filters: {
      'date.$lt': currentDate,
    },
    limit: 10,
  });

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
                containerStyle={[eventFilter === 'upcoming' && { backgroundColor: 'black' }, { marginRight: SIZE }]}
                onPress={() => setEventFilter('upcoming')}>
                <Text medium color={eventFilter === 'upcoming' ? COLORS.white : 'black'}>
                  Upcoming
                </Text>
              </Button>
              <Button
                secondary
                containerStyle={[eventFilter === 'past' && { backgroundColor: 'black' }, { marginRight: SIZE, width: SIZE * 7 }]}
                onPress={() => setEventFilter('past')}>
                <Text medium color={eventFilter === 'past' ? COLORS.white : 'black'}>
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
