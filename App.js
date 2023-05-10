import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import * as WebBrowser from 'expo-web-browser';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { I18nextProvider } from 'react-i18next';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import i18n from './src/locales/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';

SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();

const App = () => {
  const [notification, setNotification] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
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

  // const [loaded] = useFonts({
  //   InterBold: require('./src/assets/fonts/OpenSans-Bold.ttf'),
  //   InterExtraBold: require('./src/assets/fonts/OpenSans-ExtraBold.ttf'),
  //   InterLight: require('./src/assets/fonts/OpenSans-Light.ttf'),
  //   InterMedium: require('./src/assets/fonts/OpenSans-Medium.ttf'),
  //   InterRegular: require('./src/assets/fonts/OpenSans-Regular.ttf'),
  //   InterSemiBold: require('./src/assets/fonts/Inter-SemiBold.ttf'),
  // });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!loaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <AppNavigator />
            <FlashMessage position="top" />
          </View>
        </Provider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
};

export default App;
