import { useFonts } from 'expo-font';
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';
import i18n from './src/locales/i18n';

const App = () => {
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
