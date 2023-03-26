import _ from 'lodash';
import React, { useEffect } from 'react';
import { Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { ProfileInfo, Container, MiniEventCard, ProfileHeader } from '../../../../components';
import { UserTopNavigator } from '../../../../navigation/TabView';
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
      <View style={{ zIndex: 1 }}>
        <ProfileHeader myProfile user={user} />
      </View>
      <UserTopNavigator user={user} />
    </Container>
  );
};