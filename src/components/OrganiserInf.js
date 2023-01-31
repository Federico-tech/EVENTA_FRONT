import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, SIZES, WIDTH_DEVICE, SIZE } from '../utils/theme';

export const OrganiserInf = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <Image style={styles.image} source={{ uri: data.organiser.profilePic }} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{data.organiser.username}</Text>
          <View style={{ width: SIZE * 13 }}>
            <Text style={styles.textAdress}>{data.organiser.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SIZE * 5,
    aspectRatio: 1,
    borderRadius: 100,
  },
  container: {
    height: SIZE * 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: WIDTH_DEVICE / 20,
    marginVertical: SIZE,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: SIZE,
  },
  FollowButton: {
    alignContent: 'center',
  },
  informationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textName: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.lg,
    marginBottom: SIZE / 5,
  },
  textAdress: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
});
