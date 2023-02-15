import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Container, SearchBar } from '../../../components/index';
import { SearchTopNavigator } from '../../../navigation/TopTabNavigator';
import { getEvents } from '../../../services/events';

export const SearchScreen = () => {
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container>
      <SearchBar />
      <SearchTopNavigator style={styles.topBar} />
    </Container>
  );
};

const styles = StyleSheet.create({
  topBar: {},
});
