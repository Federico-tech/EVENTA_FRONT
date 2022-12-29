import React from 'react';
import { StyleSheet } from 'react-native';

import { SearchBar } from '../../../components/index';
import { SearchTopNavigator } from '../../../navigation/Navigation';

export const SearchScreen = ({ navigation }) => {
  return (
    <>
      <SearchBar />
      <SearchTopNavigator navigation={navigation} style={styles.topBar} />
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {},
});
