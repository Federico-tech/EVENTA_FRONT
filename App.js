import { useFonts } from 'expo-font';
import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';

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
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
