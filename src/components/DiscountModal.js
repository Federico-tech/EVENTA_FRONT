import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import SvgQRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../store/user';
import { COLORS, SIZE, SIZES } from '../utils/theme';
import { Text } from './Text';

export const DiscountModal = ({ isVisible, onBackdropPress, event }) => {
  const user = useSelector(selectCurrentUser);
  const qrObject = { userId: user._id, eventId: event._id, eventName: event.name, username: user.username };
  const QRCodeValue = JSON.stringify(qrObject);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.container}>
        {/* <Image source={require('../assets/logos/WhiteLogo.png')} style={styles.logo} /> */}
        <Text color={COLORS.white} semiBoldMd>
          {event.name.toUpperCase()}
        </Text>
        <Text color={COLORS.white} medium style={{ marginTop: SIZE }}>
          {user.username}
        </Text>
        <Text color={COLORS.white} medium>
          is participating
        </Text>
        <Text color={COLORS.white} semiBoldMd style={{ marginTop: SIZE, fontSize: SIZES.xl }}>
          {event.discount}% Discount
        </Text>
        <View style={{ marginTop: SIZE * 2 }}>
          <SvgQRCode value={QRCodeValue} size={SIZE * 13} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: SIZE * 25,
    height: SIZE * 50,
    backgroundColor: COLORS.primary,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: SIZE * 4,
  },
});
