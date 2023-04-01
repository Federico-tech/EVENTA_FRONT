import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { follow, unFollow } from '../services/follow';
import { refreshSelectedUser } from '../services/users';
import { selectCurrentUser, selectSelectedUser } from '../store/user';
import { useInfiniteScroll } from '../utils/hooks';
import { COLORS, FONTS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';
import { Button } from './Button';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const ProfileInfo = ({ myProfile, organiser, user: initialUser }) => {
  const [user, setUser] = useState({ ...initialUser });
  const navigation = useNavigation();
  const currentUser = useSelector(selectCurrentUser);
  const selectedUser = useSelector(selectSelectedUser);
  const followingParams = myProfile ? currentUser : selectedUser;

  const { data } = useInfiniteScroll({
    entity: 'events',
    filters: {
      organiserId: user._id,
    },
  });

  console.log('data', data);

  useEffect(() => {
    if (!_.isEqual(user, initialUser)) {
      setUser({ ...initialUser });
    }
  }, [initialUser]);

  const onPressFollow = () => {
    follow();
    setUser((prevUser) => ({
      ...prevUser,
      followers: prevUser.followers + 1,
      isFollowing: true,
    }));
    refreshSelectedUser(user);
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
          setUser((prevUser) => ({
            ...prevUser,
            followers: prevUser.followers - 1,
            isFollowing: false,
          }));
          refreshSelectedUser(user);
        },
      },
    ]);
  };

  const handleEditProfile = () => navigation.navigate(organiser ? ROUTES.EditOrganiserScreen : ROUTES.EditUserScreen);

  const onPressFollowing = () => {
    navigation.push(organiser ? ROUTES.SearchOrganiserEventsScreen : ROUTES.FollowingScreen, { followingParams });
  };

  return (
    <View>
      <Row row>
        <LoadingImage source={user.profilePic} width={SIZE * 6} viewStyle={styles.profileImage} profile />
        <Row style={styles.name}>
          <Text semiBoldMd>{user.name}</Text>
          <Text regularSm color={COLORS.darkGray}>
            @{user.username}
          </Text>
        </Row>
      </Row>
      <Row style={styles.bio}>
        {organiser || user.role === 'organiser' ? (
          <Row row>
            <Ionicons name="pin" size={SIZE * 1.5} />
            <Text style={{ alignSelf: 'flex-end', marginTop: SIZE / 2 }}>{user.address}</Text>
          </Row>
        ) : (
          <Text regularXs color={!user.bio ? COLORS.gray : 'black'} style={{ width: SIZE * 15 }}>
            {user.bio ? user.bio : 'Description'}
          </Text>
        )}
        <Row spaceBetween row style={styles.followerRow}>
          <TouchableOpacity onPress={() => navigation.push(ROUTES.FollowersScreen, { followingParams })}>
            <Row alignCenter style={styles.boxFollower}>
              <Text semiBoldSm>{user.followers || 0}</Text>
              <Text color={COLORS.darkGray} regularXs>
                Followers
              </Text>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressFollowing}>
            <Row alignCenter>
              <Text semiBoldSm>{organiser ? data.length : user.followed}</Text>
              <Text color={COLORS.darkGray} regularXs>
                {organiser || user.role === 'organiser' ? 'Events' : 'Following'}
              </Text>
            </Row>
          </TouchableOpacity>
          {myProfile || (currentUser._id === selectedUser._id) ? (
            <Button secondary text="Edit profile" containerStyle={{ width: SIZE * 13 }} onPress={handleEditProfile} />
          ) : currentUser.role === 'user' ? (
            user.isFollowing ? (
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
  usernameText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
  },
  profileImage: {
    width: SIZE * 7,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: WIDTH_DEVICE / 20,
    marginTop: SIZE / 2,
  },
  name: {
    paddingLeft: SIZE * 2,
    paddingTop: SIZE * 3,
  },
  bio: {
    marginTop: SIZE,
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  boxFollower: {
    width: SIZE * 5,
  },
  followerRow: {
    marginTop: SIZE,
  },
  recent: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
    marginTop: SIZE,
    marginLeft: WIDTH_DEVICE / 20,
    marginBottom: SIZE / 2,
  },
});
