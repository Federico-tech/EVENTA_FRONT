import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import { COLORS, FONTS, SIZE, SIZES } from '../utils/theme';
import { Text } from './Text';
import { TextButton } from './TextButton';

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
        <TextButton text={confirmText} textStyle={styles.confirm} onPress={onPress} />
        <View style={styles.line} />
        <TextButton text="Cancel" textStyle={styles.cancel} onPress={onBackdropPress} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: SIZES.xxs,
    padding: SIZE,
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
  },
  line: {
    height: 1,
    backgroundColor: COLORS.backGray,
    width: SIZE * 20,
    marginBottom: SIZE,
    marginTop: SIZE,
  },
  confirm: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.error,
  },
  cancel: {
    color: 'black',
    fontSize: SIZES.sm,
    fontFamily: FONTS.medium,
  },
});
