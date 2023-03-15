import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, ActivityIndicator, View, Animated } from 'react-native';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { ProfileHeader, Container, MiniEventCard } from '../../../../components';
import { refreschCurrentUser } from '../../../../services/users';
import { selectCurrentUser, selectCurrentUserId } from '../../../../store/user';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { FONTS, SIZES, WIDTH_DEVICE, SIZE } from '../../../../utils/theme';

export const ProfileScreen = () => {
  const myId = useSelector(selectCurrentUserId);
  const { data, refreshing, getRefreshedData, getMoreData, loadMore } = useInfiniteScroll({
    entity: `users/${myId}/events`,
    limit: 6,
  });

  console.log('data', data);

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    refreschCurrentUser(user);
  }, [user.followers, user.followed]);

  return (
    <Container>
        <ProfileHeader myProfile user={user} />
        <Text style={styles.recent}>Recent Events</Text>
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
    </Container>
  );
};

const styles = StyleSheet.create({
  recent: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
    marginTop: SIZE,
    marginLeft: WIDTH_DEVICE / 20,
    marginBottom: SIZE / 2,
  },
});
