import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';

import { Container, Row } from '../../../components';
import { createDiscount } from '../../../services/discounts';
import { getEventById } from '../../../services/events';
import { getUserById } from '../../../services/users';
import { selectSelectedEvent } from '../../../store/event';
import { requestCodeScannerPermission } from '../../../utils/permissions';
import { COLORS, SHADOWS, SIZE, SIZES } from '../../../utils/theme';

export const ScannerScreen = () => {
  useEffect(requestCodeScannerPermission, []);
  const [scanned, setScanned] = useState(true);
  const [user, setUser] = useState();
  const [{ event }, setEvent] = useState({});
  const selectedEvent = useSelector(selectSelectedEvent);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      setScanned(false);
      const datas = data.split('/');
      const userId = datas[0];
      const eventId = datas[1];
      const discountData = { userId, eventId };
      if (selectedEvent._id === eventId) {
        getUserById(userId).then((result) => {
          setUser(result);
        });
        getEventById(eventId).then((result) => {
          setEvent(result);
        });
        createDiscount(discountData);
        setScanned(true);
        showMessage({
          message: 'Event Created Succefully',
          description: 'The event has been cerated succefully',
          type: 'success',
        });
      } else {
        setScanned(true);
        showMessage({
          message: 'Discount Error',
          description: 'The qrCode is not abot this event ',
          type: 'danger',
        });
      }
    } catch (e) {
      setScanned(true);
      console.log({ e });
    }
  };

  return (
    <Container>
      <View style={styles.scannerContainer}>
        <View style={styles.scanner}>
          <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.scanner} />
        </View>
        <View style={[styles.scanButton, scanned ? { backgroundColor: COLORS.primary } : { backgroundColor: COLORS.gray }]}>
          <MaterialCommunityIcons name="qrcode-scan" size={SIZE * 3} color={COLORS.white} onPress={() => setScanned(false)} />
        </View>
        <View style={styles.infoContainer}>
          <Row alignCenter>
            <Text>EVENT: {event?.name}</Text>
            <Text>USER: {user?.username}</Text>
          </Row>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  scanner: {
    width: SIZE * 25,
    height: SIZE * 30,
    alignSelf: 'center',
    marginTop: SIZE * 4,
    borderRadius: SIZES.xxs,
  },
  scanButton: {
    width: SIZE * 5,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    marginTop: SIZE * 6,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  scannerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoContainer: {
    width: SIZE * 25,
    height: SIZE * 12,
    backgroundColor: COLORS.white,
    marginTop: -SIZE * 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    borderRadius: SIZES.xxs,
    ...SHADOWS.medium,
  },
});
