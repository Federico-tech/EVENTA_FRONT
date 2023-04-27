import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { follow, unFollow } from '../services/follow';
import { refreshSelectedUser } from '../services/users';
import { selectCurrentUser, selectSelectedUser } from '../store/user';
import { formatNumber } from '../utils/numbers';
import { COLORS, FONTS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';
import { Button } from './Button';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';
import { ReadMoreButton } from './TextButton';

export const ProfileInfo = ({ myProfile, organiser, user: initialUser, loading }) => {
  const [user, setUser] = useState({ ...initialUser });
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const navigation = useNavigation();
  const currentUser = useSelector(selectCurrentUser);
  const selectedUser = useSelector(selectSelectedUser);
  const followingParams = myProfile ? currentUser : selectedUser;

  useEffect(() => {
    if (!_.isEqual(user, initialUser)) {
      setUser({ ...initialUser });
    }
  }, [initialUser]);

  const onPressFollow = async () => {
    setUser((prevUser) => ({
      ...prevUser,
      followers: prevUser.followers + 1,
      isFollowing: true,
    }));
    setIsFollowLoading(true);
    await follow();
    setIsFollowLoading(false);
    refreshSelectedUser(user);
  };

  const onPressUnfollow = async () => {
    setUser((prevUser) => ({
      ...prevUser,
      followers: prevUser.followers - 1,
      isFollowing: false,
    }));
    setIsFollowLoading(true);
    await unFollow();
    setIsFollowLoading(false);
    refreshSelectedUser(user);
  };

  const handleEditProfile = () => navigation.navigate(user.role === 'organiser' ? ROUTES.EditOrganiserScreen : ROUTES.EditUserScreen);

  const onPressFollowing = () => {
    navigation.push(user.role === 'organiser' ? ROUTES.SearchOrganiserEventsScreen : ROUTES.FollowingScreen, { followingParams });
  };

  const onPressCreatePost = () => {
    navigation.navigate(ROUTES.CreatePostScreen)
  }

  return (
    <View>
      <Row row>
        <View style={styles.TextContainer}>
          <TouchableOpacity onPress={onPressCreatePost}>
            <Row row>
              <LoadingImage
                source={user.profilePic}
                width={SIZE * 6}
                profile
                iconSIZE={SIZE * 2.5}
                imageStyle={styles.imageProfile}
                viewStyle={styles.createNoteImage}
              />
                <View style={styles.plusIcon}>
                  <AntDesign name="pluscircle" size={SIZE * 1.5} color={COLORS.primary} />
                </View>
            </Row>
          </TouchableOpacity>
        </View>
        <Row style={styles.name}>
          <Text semiBoldMd>{user.username}</Text>
          <Text regularSm color={COLORS.darkGray}>
            {user.name}
          </Text>
        </Row>
      </Row>
      <Row style={styles.bio}>
          <ReadMoreButton text={user.bio ? user.bio : 'Description'} style={styles.description} />
        <Row spaceBetween row style={styles.followerRow}>
          <TouchableOpacity onPress={() => navigation.push(ROUTES.FollowersScreen, { followingParams })}>
            <Row alignCenter style={styles.boxFollower}>
              <Text semiBoldSm>{user.followers ? formatNumber(user.followers) : 0}</Text>
              <Text color={COLORS.darkGray} regularXs>
                Followers
              </Text>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressFollowing}>
            <Row alignCenter>
              <Text semiBoldSm>{user.role === 'organiser' ? formatNumber(user.events) : formatNumber(user.followed)}</Text>
              <Text color={COLORS.darkGray} regularXs>
                {organiser || user.role === 'organiser' ? 'Events' : 'Following'}
              </Text>
            </Row>
          </TouchableOpacity>
          {myProfile || currentUser._id === selectedUser._id ? (
            <Button secondary text="Edit profile" containerStyle={{ width: SIZE * 13 }} onPress={handleEditProfile} />
          ) : currentUser.role === 'user' ? (
            user.isFollowing ? (
              <Button
                secondary
                text="Following"
                containerStyle={{ width: SIZE * 13 }}
                onPress={onPressUnfollow}
                loading={loading}
                disabled={isFollowLoading}
              />
            ) : (
              <Button
                gradient
                text="Follow"
                containerStyle={{ width: SIZE * 13 }}
                onPress={onPressFollow}
                loading={loading}
                disabled={isFollowLoading}
              />
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
  TextContainer: {
    marginHorizontal: WIDTH_DEVICE / 20,
    alignContent: 'center',
    alignItems: 'center',
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
  plusIcon: {
    position: 'absolute',
    marginTop: SIZE * 5.5,
    marginLeft: SIZE * 4,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  createNoteImage: {
    marginBottom: SIZE,
    marginTop: SIZE,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
  },
  usernameText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
  },
  imageProfile: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  profileImage: {
    width: SIZE * 7,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: WIDTH_DEVICE /30,
    marginTop: SIZE / 2,
  },
  name: {
    paddingLeft: SIZE / 4,
    paddingTop: SIZE * 3,
  },
  bio: {
    marginTop: SIZE / 4,
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  boxFollower: {
    width: SIZE * 5,
  },
  followerRow: {
    marginTop: SIZE * 1.5,
  },
  recent: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
    marginTop: SIZE,
    marginLeft: WIDTH_DEVICE / 20,
    marginBottom: SIZE / 2,
  },
});
