import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { COLORS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../utils/constants/Theme';

export const SearchBar = () => {
  return (
    <View style={styles.wrapper}>
      <Ionicons name="ios-search" size={20} color={COLORS.gray} style={styles.icon} />
      <TextInput placeholder="Search" placeholderTextColor={COLORS.gray} style={styles.textInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DEDEDE',
    marginTop: HEIGHT_DEVICE / 16,
    height: HEIGHT_DEVICE / 20,
    marginHorizontal: WIDTH_DEVICE / 20,
    borderRadius: SIZES.xs,
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: WIDTH_DEVICE / 9,
  },
  icon: {
    marginLeft: WIDTH_DEVICE / 40,
  },
  textInput: {
    marginLeft: WIDTH_DEVICE / 50,
  },
});
