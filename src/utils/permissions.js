import * as Device from 'expo-device';
import { requestCameraPermissionsAsync, PermissionStatus } from 'expo-image-picker';
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

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};
