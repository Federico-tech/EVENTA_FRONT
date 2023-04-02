import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { follow, unFollow } from '../services/follow';
import { selectCurrentUserRole } from '../store/user';
import { COLORS, FONTS, SIZES, SIZE } from '../utils/theme';
import { Button } from './Button';
import { Row } from './Row';

export const OrganiserInf = ({ organiser, isLoading }) => {
  const [isFollowing, setIsFollowing] = useState();

  const navigation = useNavigation();
  const role = useSelector(selectCurrentUserRole);

  useEffect(() => {
    setIsFollowing(organiser.isFollowing);
  }, [organiser]);

  const onPressFollow = () => {
    follow();
    setIsFollowing(true);
  };

  const onPressUnfollow = () => {
    unFollow();
    setIsFollowing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.AccountOrganiserScreen)}>
          <Row row alignCenter>
            <Image style={styles.image} source={{ uri: organiser?.profilePic }} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={styles.textName}>{organiser?.name}</Text>
              <View style={{ width: SIZE * 13 }}>
                <Text style={styles.textAdress}>@{organiser?.username}</Text>
              </View>
            </View>
          </Row>
        </TouchableOpacity>
        {role === 'user' && isFollowing ? (
          <Button secondary text="Following" onPress={onPressUnfollow} containerStyle={{ width: SIZE * 9.5}} loading={isLoading}/>
        ) : (
          <Button gradient text="Follow" onPress={onPressFollow} containerStyle={{ width: SIZE * 9.5}} loading={isLoading}/>
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
    marginLeft: SIZE / 2,
  },
  informationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textName: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.lg,
  },
  textAdress: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
});
