import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ROUTES } from '../navigation/Navigation';
import { COLORS, FONTS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';
import { FollowButton } from './FollowButton';
import { Row } from './Row';

export const OrganiserInf = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.AccountOrganiserScreen)}>
          <Row row alignCenter>
            <Image style={styles.image} source={{ uri: data.organiser.profilePic }} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={styles.textName}>{data.organiser.username}</Text>
              <View style={{ width: SIZE * 13 }}>
                <Text style={styles.textAdress}>@{data.organiser.name}</Text>
              </View>
            </View>
          </Row>
        </TouchableOpacity>
        <FollowButton />
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
    marginHorizontal: WIDTH_DEVICE / 20,
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
