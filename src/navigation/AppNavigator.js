import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator, AuthNavigator } from './Navigation';
import {awaitRehydrate, store} from "../store";
import {useSelector} from "react-redux";
import {View} from 'react-native'
import {selectIsAuthenticated} from "../store/user";

const AppNavigator = () => {
  const [rehydrated, setRehydrated] = useState(false)
  const isLogged = useSelector(selectIsAuthenticated)

  useEffect(() => {
    const componentDidMount  = async () => {
      await awaitRehydrate()
      setRehydrated(true)
    }
    componentDidMount()
  }, [])

  if(!rehydrated) {
    return <View/>
  }

  return (
    <NavigationContainer>
      {isLogged ? <BottomNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
