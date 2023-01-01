import React from 'react';
import { StyleSheet } from 'react-native';

import { Container, SearchBar } from '../../../components/index';
import { SearchTopNavigator } from '../../../navigation/Navigation';

export const SearchScreen = ({ navigation }) => {
  return (
    <Container>
      <SearchBar />
      <SearchTopNavigator navigation={navigation} style={styles.topBar} />
    </Container>
  );
};

const styles = StyleSheet.create({
  topBar: {},
});
