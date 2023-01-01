import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, IconButton } from '../components/index';
import { FONTS, HEIGHT_DEVICE } from '../utils/theme';

export const HomeTop = () => {
  return (
    <View style={styles.container}>
      <IconButton name="ios-notifications-outline" iconStyle={styles.icon} size={22} />
      <Button gradient text="Lovere" />
      <IconButton name="heart-outline" iconStyle={styles.icon} size={23} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT_DEVICE / 70,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    fontFamily: FONTS.regular,
    color: 'white',
  },
  icon: {
    position: 'relative',
  },
});
