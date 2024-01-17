import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import SvgQRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';

import { BlueGradientLogo } from '../assets';
import { selectCurrentUser } from '../store/user';
import { COLORS, FONTS, SIZE, SIZES } from '../utils/theme';
import { Text } from './Text';

export const DiscountModal = ({ isVisible, onBackdropPress, event }) => {
  const user = useSelector(selectCurrentUser);
  const qrObject = { userId: user._id, eventId: event._id, eventName: event.name, username: user.username };
  const QRCodeValue = JSON.stringify(qrObject);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} style={{ borderRadius: 100 }}>
      <View style={styles.container}>
        <Image source={BlueGradientLogo} style={styles.logo} />
        <Text ff={FONTS.semiBold} fs={SIZES.xl}>
          {event.name.toUpperCase()}
        </Text>
        <Text ff={FONTS.regular} color={COLORS.gray}>
          {user.username}
        </Text>
        <View style={{ marginTop: SIZE * 2 }}>
          <SvgQRCode value={QRCodeValue} size={SIZE * 13} />
        </View>
        <Text ff={FONTS.medium} fs={SIZES.lg} style={{ marginTop: SIZE * 3 }}>
          {event.discount}% Discount
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: SIZE * 25,
    height: SIZE * 50,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: SIZES.xxs,
    borderColor: COLORS.darkGray,
    borderWidth: 0.5

  },
  logo: {
    width: SIZE * 18,
    height: SIZE * 18,
    aspectRatio: 1,
    marginTop: SIZE * 2,
  },
});
