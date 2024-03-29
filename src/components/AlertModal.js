import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { COLORS, FONTS, SIZE, SIZES } from '../utils/theme';
import { Text } from './Text';

export const AlertModal = ({ isVisible, onBackdropPress, title, descritpion, onPressConfirm, confirmText }) => {
  const onPress = () => {
    onPressConfirm();
    onBackdropPress();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} animationIn="fadeIn">
      <View style={styles.wrapper}>
        <Text semiBoldMd style={styles.titleStyle}>
          {title}
        </Text>
        <Text regularXs color={COLORS.darkGray} style={styles.descritpion}>
          {descritpion}
        </Text>
        <View style={styles.line} />
        <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: SIZE * 6, paddingVertical: SIZE }}>
          <Text style={styles.confirm}>{confirmText}</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={onBackdropPress} style={{ paddingHorizontal: SIZE * 7, paddingVertical: SIZE }}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    backgroundColor: COLORS.darkGray,
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: SIZES.xxs,
    paddingHorizontal: SIZE,
    paddingTop: SIZE,
    width: SIZE * 20,
  },
  titleStyle: {
    width: SIZE * 12,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    marginTop: SIZE,
  },
  descritpion: {
    width: SIZE * 16,
    textAlign: 'center',
    marginTop: SIZE / 2,
    marginBottom: SIZE,
    color: 'white'
  },
  line: {
    height: 0.2,
    backgroundColor: COLORS.backGray,
    width: SIZE * 20,
  },
  confirm: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.error,
  },
  cancel: {
    color: 'white',
    fontSize: SIZES.sm,
    fontFamily: FONTS.medium,
  },
});
