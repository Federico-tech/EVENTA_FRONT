import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import * as Linking from 'expo-linking';

import { Container, Header, Row } from '../../../components';
import { createScan } from '../../../services/scans';
import { selectSelectedEvent } from '../../../store/event';
import { requestCodeScannerPermission } from '../../../utils/permissions';
import { COLORS, SHADOWS, SIZE, SIZES } from '../../../utils/theme';

export const ScannerScreen = () => {
  const [permissionResponse, requestPermission] = BarCodeScanner.usePermissions();
  console.log({ permissionResponse })
  useEffect(() => {
    if (!permissionResponse) {
      requestPermission();
    } else if (permissionResponse?.status === 'denied') {
      Alert.alert('Permission Required', 'Please allow access to your camera in your device settings to select scan the QR Code.', [
        {
          text: 'Go to Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
    }
  }, [permissionResponse]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasScanned, setHasScanned] = useState(true);
  const [username, setUsername] = useState();
  const [eventName, setEventName] = useState();
  const selectedEvent = useSelector(selectSelectedEvent);

  const handleBarCodeScanned = async ({ data }) => {
    try {
      setIsLoading(true);
      const info = JSON.parse(data);
      const discountData = { userId: info.userId, eventId: info.eventId };
      if (selectedEvent._id === info.eventId) {
        setUsername(info.username);
        setEventName(info.eventName);
        setHasScanned(true);
        await createScan(discountData);
        setIsLoading(false);
        showMessage({
          message: 'Event Scanned Succefully',
          description: 'The event has been scanned succefully',
          type: 'success',
        });
      } else {
        setIsLoading(false);
        setHasScanned(true);
        showMessage({
          message: 'Discount Error',
          description: 'The qrCode is not abot this event ',
          type: 'danger',
        });
      }
    } catch (e) {
      setIsLoading(false);
      setHasScanned(true);
      console.log({ e });
    }
  };

  return (
    <Container>
      <Header title={'Scanner'} back/>
      <View style={styles.scannerContainer}>
        <View style={styles.scanner}>
          <BarCodeScanner onBarCodeScanned={hasScanned ? undefined : handleBarCodeScanned} style={styles.scanner} />
        </View>
        <View style={[styles.scanButton, isLoading ? { backgroundColor: COLORS.gray } : { backgroundColor: COLORS.primary }]}>
          <MaterialCommunityIcons name="qrcode-scan" size={SIZE * 3} color={COLORS.white} onPress={() => setHasScanned(false)} />
        </View>
        <View style={styles.infoContainer}>
          <Row alignCenter>
            <Text>EVENT: {eventName}</Text>
            <Text>USER: {username}</Text>
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
    marginTop: SIZE,
    borderRadius: SIZES.xxs,
  },
  scanButton: {
    width: SIZE * 5,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    marginTop: SIZE * 2,
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
