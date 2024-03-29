import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { ActivityIndicator, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { Container, Header, ListEmptyComponent, LoadingImage, Row, Skeleton, Text } from '../../../../components';
import { ROUTES } from '../../../../navigation/Navigation';
import { setUserSelected } from '../../../../store/user';
import { setTimeElapsed } from '../../../../utils/dates';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

const Notification = ({ notificationData }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPressUser = () => {
    dispatch(setUserSelected(notificationData.senderUser));
    navigation.navigate(ROUTES.AccountUserScreen);
  };

  return (
    <View style={{ marginHorizontal: WIDTH_DEVICE / 20, marginTop: SIZE }}>
      <Row>
        <Row row alignCenter>
          <TouchableOpacity onPress={onPressUser}>
            <LoadingImage source={notificationData?.senderUser?.profilePic} profile width={SIZE * 3.5} iconSIZE={SIZE * 2} />
          </TouchableOpacity>
          <Row width={SIZE * 20} ml={SIZE}>
            <Text fs={SIZES.sm}>
              <Text ff={FONTS.semiBold} fs={SIZES.sm}>
                {notificationData?.senderUser?.username}{' '}
              </Text>
              {notificationData?.message}.
              <Text color={COLORS.gray} ff={FONTS.medium} fs={SIZES.sm}>
                {' '}
                {setTimeElapsed(notificationData.createdAt)}
              </Text>
            </Text>
          </Row>
        </Row>
      </Row>
    </View>
  );
};

export const NotificationsScreen = () => {
  const dateFilter = DateTime.now().minus({ month: 1 }).toISODate();

  const { data, getMoreData, getRefreshedData, refreshing, loadMore } = useInfiniteScroll({
    entity: 'notifications/me',
    filters: {
      'date.$gte': dateFilter,
    },
  });

  return (
    <Container>
      <Header back title="Notifications" />
      <FlatList
        data={data}
        renderItem={({ item }) => <Notification notificationData={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="There's no notifications" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
      />
    </Container>
  );
};
