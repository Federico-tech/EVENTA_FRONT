import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import 'react-native-gesture-handler';

import { awaitRehydrate } from '../store';
import { selectIsAuthenticated, selectCurrentUserRole } from '../store/user';
import { ROLES } from '../utils/conts';
import { AuthNavigator, OrganiserStack, UserStack } from './Navigation';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const AppNavigator = () => {
  const [rehydrated, setRehydrated] = useState(false);
  const isLogged = useSelector(selectIsAuthenticated);
  const role = useSelector(selectCurrentUserRole);

  useEffect(() => {
    const componentDidMount = async () => {
      await awaitRehydrate();
      setRehydrated(true);
    };
    componentDidMount();
  }, []);

  if (!rehydrated) {
    return <View />;
  }

  return (
    <NavigationContainer>
      <BottomSheetModalProvider>{isLogged ? role === ROLES.USER ? <UserStack /> : <OrganiserStack /> : <AuthNavigator />}</BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
