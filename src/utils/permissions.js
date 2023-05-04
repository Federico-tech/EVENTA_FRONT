import { BarCodeScanner } from 'expo-barcode-scanner';
import { requestCameraPermissionsAsync, PermissionStatus } from 'expo-image-picker';

export const requestCameraPermission = () => {
  requestCameraPermissionsAsync()
    .then(({ status, canAskAgain, expires }) => {
      console.log({ canAskAgain, expires, status });
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
