import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { HEIGHT_DEVICE } from '../utils/constants/Theme';

import { PLaceButton } from './Buttons';

export const HomeTop = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="ios-notifications-outline" size={22} />
      <PLaceButton />
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
});
