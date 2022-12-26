import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '../components/index';
import { FONTS, HEIGHT_DEVICE } from '../utils/constants/Theme';

export const HomeTop = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="ios-notifications-outline" size={22} />
      <Button gradient text="Lovere" />
      <FontAwesome name="heart-o" size={20} />
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
});
