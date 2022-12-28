// eslint-disable-next-line no-unused-vars
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';

import { SearchBar } from '../../../components/index';

export const SearchScreen = () => {


  return (
    <View>
      <SearchBar />
    </View>
  );
};
