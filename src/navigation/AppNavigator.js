import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator, AuthNavigator } from './Navigation';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <BottomNavigator/>
    </NavigationContainer>
  );
};

export default AppNavigator;
