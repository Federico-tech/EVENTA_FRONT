import _ from 'lodash';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, HomeHeader, MiniEventCard, Text } from '../../../components';
import { selectCurrentUserId } from '../../../store/user';
import { useInfiniteScroll } from '../../../utils/hooks';
import { COLORS, SIZE, WIDTH_DEVICE } from '../../../utils/theme';
import { Analytics } from './analytics';

export const OrganiserHome = () => {
  const organiserId = useSelector(selectCurrentUserId);

  const { data, getMoreData, refreshing, getRefreshedData, loadMore } = useInfiniteScroll({
    entity: 'events',
    filters: {
      organiserId,
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
              <View style={styles.buttonEnabled}>
                <Text medium color={COLORS.white}>
                  Upcoming
                </Text>
              </View>
              <View style={styles.buttonDisabled}>
                <Text medium>Past</Text>
              </View>
            </View>
          </View>
        }
      />
      <FlashMessage position="top" />
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonEnabled: {
    backgroundColor: 'black',
    width: SIZE * 8,
    height: SIZE * 2.5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textEnabled: {},
  buttonDisabled: {
    backgroundColor: COLORS.backGray,
    width: SIZE * 7,
    height: SIZE * 2.5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZE,
    borderColor: 'black',
  },
  textDisabled: {},
});
