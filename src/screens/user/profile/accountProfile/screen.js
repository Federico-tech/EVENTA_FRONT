import _ from 'lodash';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, MiniEventCard, ProfileHeader } from '../../../../components';
import { refreshSelectedUser } from '../../../../services/users';
import { selectSelectedUser, selectSelectedUserId } from '../../../../store/user';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const AccountUserScreen = ({ route }) => {
  const user = useSelector(selectSelectedUser);
  const id = useSelector(selectSelectedUserId);

  const { data, getMoreData, refreshing, getRefreshedData, loadMore } = useInfiniteScroll({
    entity: `users/${id}/events`,
    limit: 6,
  });

  useEffect(() => {
    refreshSelectedUser(user);
  }, []);

  return (
    <Container>
      <ProfileHeader user={user} />
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
