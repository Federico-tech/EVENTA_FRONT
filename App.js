import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import React, { useState, useRef, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';

import i18n from './src/locales/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';
import { registerForPushNotificationsAsync } from './src/utils/notifications';

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [loaded] = useFonts({
    InterBold: require('./src/assets/fonts/Inter-Bold.ttf'),
    InterExtraBold: require('./src/assets/fonts/Inter-ExtraBold.ttf'),
    InterLight: require('./src/assets/fonts/Inter-Light.ttf'),
    InterMedium: require('./src/assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./src/assets/fonts/Inter-Regular.ttf'),
    InterSemiBold: require('./src/assets/fonts/Inter-SemiBold.ttf'),
  });

  if (!loaded) return null;
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigator />
          <FlashMessage position="top" />
        </View>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
