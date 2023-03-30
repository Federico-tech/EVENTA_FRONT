import { View, StyleSheet, Image } from 'react-native'
import React from 'react';
import Modal from "react-native-modal";
import { COLORS, SIZE, SIZES } from '../utils/theme';
import { Text } from './Text';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user';
import SvgQRCode from 'react-native-qrcode-svg';

export const DiscountModal = ({isVisible, onBackdropPress, event}) => {
  const user = useSelector(selectCurrentUser)
  const QRCodeValue = `${user._id}/${event._id}`

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.container}>
        <Image source={require('../assets/logos/WhiteLogo.png')} style={styles.logo}/>
        <Text color={COLORS.white} semiBoldMd >{event.name.toUpperCase()}</Text>
        <Text color={COLORS.white} medium style={{marginTop: SIZE}}>{user.username}</Text>
        <Text color={COLORS.white} medium >is participating</Text>
        <Text color={COLORS.white} semiBoldMd style={{marginTop: SIZE, fontSize: SIZES.xl}}>20% Discount</Text>
        <View style={{ marginTop: SIZE * 2}}>
          <SvgQRCode value={QRCodeValue}/>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: SIZE * 25,
    height: SIZE * 50,
    backgroundColor: COLORS.primary,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: SIZE * 4
  }
})