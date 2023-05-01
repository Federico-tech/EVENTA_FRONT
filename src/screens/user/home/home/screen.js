import { useNavigation, useScrollToTop } from '@react-navigation/native';
import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { Container, EventCard, HomeHeader, HomeTop, ListEmptyComponent } from '../../../../components/index';
import { ROUTES } from '../../../../navigation/Navigation';
import { getMostPopularEvent } from '../../../../services/events';
import { checkReadNotifications } from '../../../../services/notifications';
import { setUnreadNotifications } from '../../../../store/notification';
import { selectCurrentUser } from '../../../../store/user';
import { updateUserCoordinates } from '../../../../utils';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE } from '../../../../utils/theme';

export const HomeScreen = () => {
  const listRef = React.useRef(null);
  const homeRef = React.useRef(null);
  const [mostPopularEvent, setMostpopularEvent] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const navigation = useNavigation();

  useScrollToTop(listRef);

  useEffect(() => {
    updateUserCoordinates();
    if (!currentUser.username) {
      navigation.navigate(ROUTES.UsernameScreen);
    }
  }, []);

  useEffect(() => {
    const fetchMostpopularEvent = async () => {
      const event = await getMostPopularEvent();
      setMostpopularEvent(event[0]);
    };
    fetchMostpopularEvent();
  }, [refreshing]);

  const { data, refreshing, getRefreshedData, getMoreData, loadMore } = useInfiniteScroll({
    entity: 'events/home',
    debug: true,
    limit: 6,
    filters: {
      'date.$gte': DateTime.now(),
    },
  });

  useEffect(() => {
    const fetchNotification = async () => {
      const unreadNotifications = await checkReadNotifications();
      console.log('unread', unreadNotifications);
      dispatch(setUnreadNotifications(unreadNotifications.totalData));
    };
    fetchNotification();
  }, [refreshing]);

  const onRefresh = async () => {
    await Promise.all([getRefreshedData(), homeRef?.current?.onRefresh()]).catch((e) => console.debug({ homeError: e }));
  };

  return (
    <Container>
      <HomeHeader />
      <FlatList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <EventCard eventData={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        ListHeaderComponent={<HomeTop ref={homeRef} eventData={mostPopularEvent} mapData={data} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="No upcoming events" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Container>
  );
};
