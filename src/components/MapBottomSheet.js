import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { checkFollowing, follow, unFollow } from '../services/follow';
import { refreshSelectedUser } from '../services/users';
import { selectCurrentUserId, selectCurrentUserRole, selectSelectedUser } from '../store/user';
import { useInfiniteScroll } from '../utils/hooks';
import { COLORS, SIZE, WIDTH_DEVICE } from '../utils/theme';
import { Button } from './Button';
import { LoadingImage } from './LoadingImage';
import { MiniEventCard } from './MiniEventCard';
import { Row } from './Row';
import { Text } from './Text';

export const MapBottomSheet = () => {
  const user = useSelector(selectSelectedUser);
  const myId = useSelector(selectCurrentUserId);
  const role = useSelector(selectCurrentUserRole);
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = useState();
  const [numFollowers, setNumFollowers] = useState();

  const { data, getMoreData, refreshing, getRefreshedData, loadMore } = useInfiniteScroll({
    entity: 'events',
    filters: {
      organiserId: user._id,
    },
    limit: 7,
  });

  useEffect(() => {
    refreshSelectedUser(user);
    setNumFollowers(user.followers);
    console.log('Followers', numFollowers);
  }, []);

  const onPressFollow = () => {
    follow();
    setIsFollowing(true);
    setNumFollowers(numFollowers + 1);
  };

  const onPressUnfollow = () => {
    Alert.alert('Unfollow', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          unFollow();
          setIsFollowing(false);
          setNumFollowers(numFollowers - 1);
        },
      },
    ]);
  };

  useEffect(() => {
    checkFollowing(myId, user._id).then((result) => {
      setIsFollowing(result);
    });
  }, []);

  const handleEditProfile = () => navigation.navigate(ROUTES.EditOrganiserScreen);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <MiniEventCard data={item} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Row row alignCenter>
              <View style={styles.profileImage}>
                {!user.profilePic ? (
                  <Ionicons name="person" size={60} color={COLORS.gray} />
                ) : (
                  <LoadingImage source={user.profilePic} style={styles.image} resizeMode="contain" profile />
                )}
              </View>
              <Row style={styles.name}>
                <Text semiBoldMd>{user.name}</Text>
                <Text medium color={COLORS.darkGray}>
                  @{user.username}
                </Text>
              </Row>
            </Row>
            <Row style={styles.bio}>
              <Row row>
                <Ionicons name="pin" size={SIZE * 1.5} />
                <Text style={{ alignSelf: 'flex-end', marginTop: SIZE / 2 }}>{user.address}</Text>
              </Row>
              <Row spaceBetween row style={styles.followerRow}>
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FollowersScreen, { user })}>
                  <Row alignCenter style={styles.boxFollower}>
                    <Text semiBoldSm>{numFollowers || 0}</Text>
                    <Text color={COLORS.darkGray} regularXs>
                      Followers
                    </Text>
                  </Row>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FollowingScreen, { user })}>
                  <Row alignCenter>
                    <Text semiBoldSm>{data.length}</Text>
                    <Text color={COLORS.darkGray} regularXs>
                      events
                    </Text>
                  </Row>
                </TouchableOpacity>
                {myId === user._id ? (
                  <Button secondary text="Edit profile" containerStyle={{ width: SIZE * 13 }} onPress={handleEditProfile} />
                ) : role === 'user' ? (
                  isFollowing ? (
                    <Button secondary text="Following" containerStyle={{ width: SIZE * 13 }} onPress={onPressUnfollow} />
                  ) : (
                    <Button gradient text="Follow" containerStyle={{ width: SIZE * 13 }} onPress={onPressFollow} />
                  )
                ) : (
                  <View style={{ width: SIZE * 13 }} />
                )}
              </Row>
            </Row>
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
    width: SIZE * 7.5,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 4,
    alignItem: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
  },

  profileImage: {
    width: SIZE * 7.5,
    aspectRatio: 1,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: WIDTH_DEVICE / 20,
  },
  name: {
    marginLeft: SIZE,
  },
  bio: {
    marginTop: SIZE / 2,
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  boxFollower: {
    width: SIZE * 5,
  },
  followerRow: {
    marginTop: SIZE,
  },
});
