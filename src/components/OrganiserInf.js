import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { Button } from './Button';

export const OrganiserInf = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <Image style={styles.image} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>COCO CLUBBING</Text>
          <View style={{ width: WIDTH_DEVICE / 4 }}>
            <Text style={styles.textAdress}>{data.address}</Text>
          </View>
        </View>
      </View>
      <Button gradient text="Follow" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: WIDTH_DEVICE / 6,
    height: HEIGHT_DEVICE / 11,
  },
  container: {
    height: HEIGHT_DEVICE / 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: WIDTH_DEVICE / 30,
    marginVertical: HEIGHT_DEVICE / 70,
  },

  textContainer: {
    flexDirection: 'column',
    marginLeft: WIDTH_DEVICE / 30,
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
  },

  textAdress: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
});
