import React, {useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, SearchBar } from '../../../components/index';
import { SearchTopNavigator } from '../../../navigation/Navigation';
import { getEvents } from '../../../services/events';
import { selectEvents } from '../../../store/event';

export const SearchScreen = () => {

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container>
      <SearchBar />
      <SearchTopNavigator style={styles.topBar}/>
    </Container>
  );
};

const styles = StyleSheet.create({
  topBar: {},
});
