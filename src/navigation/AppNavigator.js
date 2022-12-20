import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/user';
import { AuthNavigator, BottomNavigator } from './Navigation';

const AppNavigator = () => {

  const isAuth = useSelector(selectIsAuthenticated)

  return (
    <NavigationContainer>
      { isAuth ? <BottomNavigator/> : <AuthNavigator/> }
    </NavigationContainer>
    
  );
  
};


export default AppNavigator;
