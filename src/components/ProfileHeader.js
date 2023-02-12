import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { checkFollowing, follow, unFollow } from '../services/follow';
import { followUser } from '../services/users';
import { selectCurrentUser, selectCurrentUserId } from '../store/user';
import { COLORS, FONTS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';
import { Button, IconButton } from './Button';
import { Row } from './Row';
import { Text } from './Text';

export const ProfileHeader = ({ myProfile, organiser, user: initialUser }) => {
  const [user, setUser] = useState({...initialUser})
  const [isFollowing, setIsFollowing] = useState();
  const myId = useSelector(selectCurrentUserId)
  const otherUserId = user?._id

  useEffect(() => {
    if(!_.isEqual(user, initialUser)) {
      setUser({...initialUser})
    }
  }, [initialUser]) 

  const navigation = useNavigation();

  const onPressFollow = () => {
    follow()
    setUser((prevUser) => ({
      ...prevUser,
      followers: prevUser.followers + 1
    }))
    setIsFollowing(true)
  }

  const onPressUnfollow = () => {
    unFollow()
    setUser((prevUser) => ({
      ...prevUser,
      followers : prevUser.followers - 1
    }))
    setIsFollowing(false)
  }

  useEffect(() => {
    checkFollowing(myId, otherUserId)
      .then((result) => {
        setIsFollowing(result);
      })
  },[]);

  console.log(isFollowing)

  const handleEditProfile = () => navigation.navigate(organiser ? ROUTES.EditOrganiserScreen : ROUTES.EditUserScreen);
  return (
    <View>
      <LinearGradient start={{ x: 1.2, y: 0 }} end={{ x: 0, y: 0 }} colors={['#32DAE4', '#00A1FF']} style={styles.wrapper}>
        <View style={styles.container}>
          {!myProfile && <IconButton name="chevron-back" color="white" size={SIZE * 2} onPress={() => navigation.goBack()} />}
          <Text style={styles.usernameText}>{user.username}</Text>
          {myProfile ? (
            <IconButton name="settings-sharp" color="white" size={SIZE * 1.5} onPress={() => navigation.navigate('SettingScreen')} />
          ) : (
            <IconButton name="ios-ellipsis-vertical" color="white" size={18} />
          )}
        </View>
      </LinearGradient>
      <View style={styles.profileImage}>
        {!user.profilePic ? (
          <Ionicons name="person" size={60} color={COLORS.gray} />
        ) : (
          <Image source={{ uri: user.profilePic }} style={styles.image} resizeMode="contain" />
        )}
      </View>
      <Row style={styles.name}>
        <Text semiBoldMd>{user.name}</Text>
        <Text medium color={COLORS.darkGray}>
          @{user.username}
        </Text>
      </Row>
      <Row style={styles.bio}>
        {organiser ? (
          <Row row>
            <Ionicons name="pin" size={SIZE * 1.5} />
            <Text style={{ alignSelf: 'flex-end', marginTop: SIZE / 2 }}>{user.address}</Text>
          </Row>
        ) : (
          <Text regularXs style={{ width: SIZE * 15 }}>
            {user.bio}
          </Text>
        )}
        <Row spaceBetween row style={styles.followerRow}>
          <Row alignCenter style={styles.boxFollower}>
            <Text semiBoldSm>{user.followers || 0}</Text>
            <Text color={COLORS.darkGray} regularXs>
              Followers
            </Text>
          </Row>
          <Row alignCenter>
            <Text semiBoldSm>{user.followed || 0}</Text>
            <Text color={COLORS.darkGray} regularXs>
              Following
            </Text>
          </Row>
          {myProfile ? (
            <Button secondary text="Edit profile" containerStyle={{ width: SIZE * 13 }} onPress={handleEditProfile} />
          ) : isFollowing ? (
            <Button secondary text="Following" containerStyle={{ width: SIZE * 13 }} onPress={onPressUnfollow} />
          ) : (
            <Button gradient text="Follow" containerStyle={{ width: SIZE * 13 }} onPress={onPressFollow} />
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
    width: SIZE * 7.5,
    aspectRatio: 1,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: COLORS.white,
    position: 'absolute',
    marginTop: SIZE * 7,
    marginLeft: WIDTH_DEVICE / 20,
  },
  name: {
    paddingLeft: SIZE * 10,
    paddingTop: SIZE,
  },
  bio: {
    marginTop: SIZE * 2.5,
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  boxFollower: {
    width: SIZE * 5,
  },
  followerRow: {
    marginTop: SIZE,
  },
});
