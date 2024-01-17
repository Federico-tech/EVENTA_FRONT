import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { followWithId, unFollowWithId } from '../services/follow';
import { setUserSelected } from '../store/user';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { Button } from './Button';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';
import { useTranslation } from 'react-i18next';

export const UserRow = ({ data, bottomSheet, closeSheet = () => {} }) => {
  const { profilePic, username, name } = data;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleOnPress = () => {
    if (!data?.isDeleted) {
      dispatch(setUserSelected(data));
      if (bottomSheet) {
        navigation.navigate(ROUTES.AccountUserScreen, { data });
      } else {
        navigation.push(ROUTES.AccountUserScreen, { data });
      }
      closeSheet();
    }
  };
  return (
    <TouchableOpacity onPress={handleOnPress} disabled={data?.isDeleted} activeOpacity={0.8}>
      <View style={styles.userWrapper}>
        <Row row alignCenter>
          <View style={styles.profileImage}>
            <LoadingImage source={profilePic} profile iconSIZE={SIZE * 2.5} imageStyle={{ borderColor: COLORS.lightGray, borderWidth: 0.15 }} />
          </View>
          <Row style={{ paddingLeft: SIZE }}>
            <Text style={styles.usernameText}>{username}</Text>
            <Text style={styles.nameText} fs={SIZES.sm}>
              {name}
            </Text>
          </Row>
        </Row>
      </View>
    </TouchableOpacity>
  );
};

export const OrganiserRow = ({ data }) => {
  const { profilePic, username, address } = data;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleOnPress = () => {
    dispatch(setUserSelected(data));
    navigation.push(ROUTES.AccountOrganiserScreen, { data });
  };
  return (
    <TouchableOpacity onPress={handleOnPress} activeOpacity={0.8}>
      <View style={styles.organiserWrapper}>
        <Row row alignCenter>
          <LoadingImage source={profilePic} width={SIZE * 5} profile iconSIZE={SIZE * 2.5} />
          <Row style={{ paddingLeft: SIZE }}>
            <Text style={styles.organiserText}>{username}</Text>
            <View style={{ width: SIZE * 15 }}>
              <Text style={styles.addressText}>{address}</Text>
            </View>
          </Row>
        </Row>
      </View>
    </TouchableOpacity>
  );
};

export const UserColumn = ({ data }) => {
  const { profilePic, username } = data;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleOnPress = () => {
    dispatch(setUserSelected(data));
    navigation.navigate(ROUTES.AccountUserScreen, { data });
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Row alignCenter column mr={SIZE}>
        <LoadingImage source={profilePic} width={SIZE * 4} profile iconSIZE={SIZE * 2.5} />
        <Row width={SIZE * 5}>
          <Text ff={FONTS.medium} fs={SIZE / 1.2} mt={SIZE / 2} width={SIZE} numberOfLines={1}>
            {username}
          </Text>
        </Row>
      </Row>
    </TouchableOpacity>
  );
};

export const RecommendedUserColumn = ({ data, containerStyle }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log(data);

  const handleOnPress = () => {
    dispatch(setUserSelected(data));
    navigation.navigate(ROUTES.AccountUserScreen, { data });
  };

  const onPressFollow = async () => {
    setIsFollowing(true);
    setIsFollowLoading(true);
    await followWithId(data._id);
    setIsFollowLoading(false);
  };

  const onPressUnfollow = async () => {
    setIsFollowing(false);
    setIsFollowLoading(true);
    await unFollowWithId(data._id);
    setIsFollowLoading(false);
  };

  return (
    <View style={[styles.postedRecommendedUserContainer, { borderWidth: 0.3, borderColor: '#141414' }, containerStyle]}>
      <TouchableOpacity onPress={handleOnPress}>
        <LoadingImage source={data.profilePic} profile width={SIZE * 5} iconSIZE={SIZE * 2} />
      </TouchableOpacity>
      <Row width={SIZE * 6} alignCenter mt={SIZE}>
        <TouchableOpacity onPress={handleOnPress} style={{ alignItems: 'center' }}>
          <Text fs={SIZES.xxs} ff={FONTS.medium} numberOfLines={1}>
            {data.username}
          </Text>
          <Text color={COLORS.gray} fs={SIZES.xxs} ff={FONTS.regular} numberOfLines={1} mb={SIZE}>
            {data.name}
          </Text>
        </TouchableOpacity>
        {isFollowing ? (
          <Button
            secondary
            text={t('followingB')}
            onPress={onPressUnfollow}
            containerStyle={{ width: SIZE * 7, height: SIZE * 2, borderRadius: 10 }}
            disabled={isFollowLoading}
            textStyle={{ fontFamily: FONTS.semiBold, fontSize: SIZES.xs }}
          />
        ) : (
          <Button
            gradient
            text={t('follow')}
            onPress={onPressFollow}
            containerStyle={{ width: SIZE * 7, height: SIZE * 2, borderRadius: 10 }}
            disabled={isFollowLoading}
            textStyle={{ fontFamily: FONTS.semiBold, fontSize: SIZES.xs }}
          />
        )}
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  userWrapper: {
    marginTop: SIZE,
    height: SIZE * 3.5,
    
  },
  organiserWrapper: {
    marginTop: SIZE,
    height: SIZE * 5,
    marginHorizontal: WIDTH_DEVICE / 20,
    
  },
  profileImage: {
    width: SIZE * 3.5,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.backGray,
  },
  usernameText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.sm,
  },
  nameText: {
    color: COLORS.gray,
  },
  organiserImage: {
    width: SIZE * 5,
    aspectRatio: 1,
    borderRadius: 100,
  },
  organiserText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
  },
  addressText: {
    color: COLORS.gray,
    fontSize: SIZES.xxs,
    marginTop: SIZE / 5,
  },
  imageView: {
    width: SIZE * 3.5,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageViewOrgniser: {
    width: SIZE * 5,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postedRecommendedUserContainer: {
    backgroundColor: '#121212',
    height: SIZE * 13.5,
    width: SIZE * 8.5,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: SIZE,
    borderRadius: SIZES.xxs,
    justifyContent: 'center',
    
  },
});
