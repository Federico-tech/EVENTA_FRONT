import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { awaitRehydrate } from '../store';
import { selectIsAuthenticated, selectUserRole } from '../store/user';
import { AuthNavigator, OrganiserBottomNavigator, UserBottomNavigator } from './Navigation';

const AppNavigator = () => {
  const [rehydrated, setRehydrated] = useState(false);
  const isLogged = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);

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

  return <NavigationContainer>{isLogged ? role ? <UserBottomNavigator /> : <OrganiserBottomNavigator /> : <AuthNavigator />}</NavigationContainer>;
};

export default AppNavigator;
