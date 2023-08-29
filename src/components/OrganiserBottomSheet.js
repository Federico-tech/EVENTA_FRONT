import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { checkFollowing, follow, unFollow } from '../services/follow';
import { refreshSelectedUser } from '../services/users';
import { selectCurrentUserId, selectCurrentUserRole, selectSelectedUser } from '../store/user';
import { useInfiniteScroll } from '../utils/hooks';
import { formatNumber } from '../utils/numbers';
import { COLORS, SIZE, WIDTH_DEVICE, SIZES } from '../utils/theme';
import { Button } from './Button';
import { Line } from './Line';
import { ListEmptyComponent } from './ListEmptyComponent';
import { LoadingImage } from './LoadingImage';
import { MiniEventCard } from './MiniEventCard';
import { Row } from './Row';
import { Text } from './Text';

export const OrganiserBottomSheet = ({ scroll, closeSheet }) => {
  const user = useSelector(selectSelectedUser);
  const myId = useSelector(selectCurrentUserId);
  const role = useSelector(selectCurrentUserRole);
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowingPressLoading, setIsFollowingPressLoading] = useState(false);
  const [numFollowers, setNumFollowers] = useState();

  const { data, getMoreData, refreshing, getRefreshedData, loadMore } = useInfiniteScroll({
    entity: 'events',
    filters: {
      organiserId: user._id,
    },
    limit: 7,
  });

  const onPressFollow = async () => {
    Haptics.selectionAsync();
    setIsFollowing(true);
    setNumFollowers(numFollowers + 1);
    setIsFollowingPressLoading(true);
    await follow();
    setIsFollowingPressLoading(false);
  };

  const onPressUnfollow = async () => {
    setIsFollowing(false);
    setNumFollowers(numFollowers - 1);
    setIsFollowingPressLoading(true);
    await unFollow();
    setIsFollowingPressLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    refreshSelectedUser(user);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setNumFollowers(user.followers);
    checkFollowing(myId, user._id).then((result) => {
      setIsFollowing(result);
    });
  }, [user]);

  const handleEditProfile = () => navigation.navigate(ROUTES.EditOrganiserScreen);

  const onPressNavigateProfile = () => {
    navigation.navigate(ROUTES.AccountOrganiserScreen);
    closeSheet();
  };

  const onPressFollowers = () => {
    navigation.navigate(ROUTES.FollowersScreen, { followingParams: user });
    closeSheet();
  };

  const onPressEvents = () => {
    navigation.navigate(ROUTES.SearchOrganiserEventsScreen);
    closeSheet();
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <MiniEventCard data={item} closeSheet={closeSheet} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scroll}
        ListEmptyComponent={<ListEmptyComponent text={`This organizer hasn't created any events yet`} />}
        ListHeaderComponent={
          <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
            <TouchableOpacity onPress={onPressNavigateProfile}>
              <Row row alignCenter>
                <LoadingImage source={user.profilePic} profile width={SIZE * 5} iconSIZE={SIZE * 2.5} />
                <Row style={styles.name}>
                  <Text medium fs={SIZES.sm}>
                    {user.username}
                  </Text>
                  <View style={{ width: SIZE * 15 }}>
                    <Text style={styles.addressText}>{user.address}</Text>
                  </View>
                </Row>
              </Row>
            </TouchableOpacity>
            <Row style={styles.bio}>
              <Row spaceBetween row style={styles.followerRow}>
                <TouchableOpacity onPress={onPressFollowers}>
                  <Row alignCenter style={styles.boxFollower}>
                    <Text semiBoldSm>{numFollowers ? formatNumber(numFollowers) : 0}</Text>
                    <Text color={COLORS.darkGray} regularXs>
                      Followers
                    </Text>
                  </Row>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressEvents}>
                  <Row alignCenter>
                    <Text semiBoldSm>{formatNumber(data.length)}</Text>
                    <Text color={COLORS.darkGray} regularXs>
                      events
                    </Text>
                  </Row>
                </TouchableOpacity>
                {myId === user._id ? (
                  <Button secondary text="Edit profile" containerStyle={{ width: SIZE * 13 }} onPress={handleEditProfile} />
                ) : role === 'user' ? (
                  isFollowing ? (
                    <Button
                      secondary
                      text="Following"
                      containerStyle={{ width: SIZE * 13 }}
                      onPress={onPressUnfollow}
                      disabled={isFollowingPressLoading || isLoading}
                      loading={isLoading}
                    />
                  ) : (
                    <Button
                      gradient
                      text="Follow"
                      containerStyle={{ width: SIZE * 13 }}
                      onPress={onPressFollow}
                      disabled={isFollowingPressLoading || isLoading}
                      loading={isLoading}
                    />
                  )
                ) : (
                  <View style={{ width: SIZE * 13 }} />
                )}
              </Row>
            </Row>
            <Line lineStyle={{ marginTop: SIZE, marginBottom: SIZE / 2 }} />
          </View>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: SIZE * 8.5,
  },
  image: {
    borderRadius: 100,
    width: SIZE * 6.5,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  container: {
    marginTop: SIZE * 4,
    alignItem: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
  },
  name: {
    marginLeft: SIZE,
  },
  profileImage: {
    width: SIZE * 6.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  bio: {
    marginTop: SIZE / 2,
    marginBottom: SIZE / 2,
  },
  boxFollower: {
    width: SIZE * 5,
  },
  followerRow: {
    marginTop: SIZE,
  },
  addressText: {
    color: COLORS.gray,
    fontSize: SIZES.xxs,
    marginTop: SIZE / 5,
  },
});
