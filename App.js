import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from './src/locales/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';

const App = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

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
        <AppNavigator />
      </Provider>
    </I18nextProvider>
  );
};

export default App;
