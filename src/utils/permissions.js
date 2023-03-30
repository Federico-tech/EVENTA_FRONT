import * as Device from 'expo-device';
import { requestCameraPermissionsAsync, PermissionStatus } from 'expo-image-picker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const requestCameraPermission = () => {
  requestCameraPermissionsAsync()
    .then(({ status, canAskAgain, expires }) => {
      console.log({ canAskAgain, expires });
      status !== PermissionStatus.GRANTED && alert('Permission denied!');
    })
    .catch((e) => {
      console.log(e);
      alert('Permission denied!');
    });
};

export const requestCodeScannerPermission = () => {
  BarCodeScanner.getPermissionsAsync()
  .then(({ status, canAskAgain, expires }) => {
    console.log({ canAskAgain, expires });
    status !== PermissionStatus.GRANTED && alert('Permission denied!');
  })
  .catch((e) => {
    console.log(e);
    alert('Permission denied!');
  });
};
