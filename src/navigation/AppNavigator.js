import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserRole } from '../store/user';
import { AuthNavigator, BottomNavigator, OrganiserNavigator } from './Navigation';

const AppNavigator = () => {

  const isAuth = useSelector(selectIsAuthenticated)
  const isOrganiser = useSelector(selectUserRole)

  return (
    <NavigationContainer>
      { isAuth ? (
        isOrganiser ? <OrganiserNavigator/> : BottomNavigator
        ) : ( 
        <AuthNavigator/> )}
    </NavigationContainer>
    
  );
  
};


export default AppNavigator;
