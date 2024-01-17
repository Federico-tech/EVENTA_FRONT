import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { follow, unFollow } from '../services/follow';
import { selectCurrentUser, setUserSelected } from '../store/user';
import { COLORS, FONTS, SIZES, SIZE } from '../utils/theme';
import { Button } from './Button';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const OrganiserInf = ({ organiser, isLoading, scans }) => {
  const [isFollowing, setIsFollowing] = useState();
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const dispatch = useDispatch()

  const navigation = useNavigation();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    setIsFollowing(organiser.isFollowing);
  }, [organiser]);

  const onPressFollow = async () => {
    Haptics.selectionAsync();
    setIsFollowing(true);
    setIsFollowLoading(true);
    await follow();
    setIsFollowLoading(false);
  };

  const onPressUnfollow = async () => {
    setIsFollowing(false);
    setIsFollowLoading(true);
    await unFollow();
    setIsFollowLoading(false);
  };

  const onPressProfile = () => {
    navigation.navigate(ROUTES.AccountOrganiserScreen);
    dispatch(setUserSelected(organiser))
  }

  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <TouchableOpacity onPress={onPressProfile}>
          <Row row alignCenter>
            <LoadingImage source={organiser?.profilePic} profile width={SIZE * 4} iconSIZE={SIZE * 2} />
            <View style={styles.textContainer}>
              <Text style={styles.textName}>{organiser?.username}</Text>
              <View style={{ width: SIZE * 13 }}>
                <Text style={styles.textAdress}>{organiser?.name}</Text>
              </View>
            </View>
          </Row>
        </TouchableOpacity>
        {user.role === 'user' ? (
          isFollowing ? (
            <Button
              secondary
              text="Following"
              onPress={onPressUnfollow}
              containerStyle={{ width: SIZE * 9 }}
              loading={isLoading}
              disabled={isFollowLoading}
            />
          ) : (
            <Button
              gradient
              text="Follow"
              onPress={onPressFollow}
              containerStyle={{ width: SIZE * 9 }}
              loading={isLoading}
              disabled={isFollowLoading}
            />
          )
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ScannerScreen)}>
            <Row row alignCenter ml={SIZE * 5.5}>
              <Text mr={SIZE} fs={SIZES.sm} color={COLORS.gray} >{scans}</Text>
              <MaterialCommunityIcons name="qrcode-scan" size={SIZE * 2} color={'white'} />
            </Row>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SIZE * 4,
    aspectRatio: 1,
    borderRadius: 100,
  },
  container: {
    height: SIZE * 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZE,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: SIZE,
  },
  informationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textName: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
  },
  textAdress: {
    color: COLORS.gray,
    fontSize: SIZES.xxs,
  },
});
