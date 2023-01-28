import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, IconButton } from '../components/index';
import { ROUTES } from '../navigation/Navigation';
import { FONTS, HEIGHT_DEVICE, SIZE } from '../utils/theme';

export const HomeTop = () => {
  return (
    <View style={styles.container}>
      <IconButton name="ios-notifications-outline" iconStyle={styles.icon} size={SIZE * 2} />
      <Button gradient text="Lovere" />
      <IconButton name="heart-outline" iconStyle={styles.icon} size={SIZE * 2}/>
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
