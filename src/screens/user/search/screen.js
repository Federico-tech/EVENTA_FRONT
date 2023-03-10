import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container, SearchBar } from '../../../components/index';
import { SearchTopNavigator } from '../../../navigation/TopTabNavigator';
import { getEvents } from '../../../services/events';
import { WIDTH_DEVICE } from '../../../utils/theme';

export const SearchScreen = () => {
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container>
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
        <SearchBar />
      </View>
      <SearchTopNavigator style={styles.topBar} />
    </Container>
  );
};

const styles = StyleSheet.create({
  topBar: {},
});
