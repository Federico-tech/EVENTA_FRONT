import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { awaitRehydrate } from '../store';
import { selectIsAuthenticated } from '../store/user';
import { AuthNavigator, UserBottomNavigator } from './Navigation';

const AppNavigator = () => {
  const [rehydrated, setRehydrated] = useState(false);
  const isLogged = useSelector(selectIsAuthenticated);

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
      {isLogged ? <UserBottomNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
