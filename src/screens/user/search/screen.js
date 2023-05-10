import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container, SafeArea, SearchBar } from '../../../components/index';
import { SearchTopNavigator } from '../../../navigation/TopTabNavigator';
import { getEvents } from '../../../services/events';
import { SIZE, WIDTH_DEVICE } from '../../../utils/theme';

export const SearchScreen = () => {
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container>
      <SafeArea>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20, marginTop: -SIZE / 2 }}>
          <SearchBar />
        </View>
      </SafeArea>
      <SearchTopNavigator style={styles.topBar} />
    </Container>
  );
};

const styles = StyleSheet.create({
  topBar: {},
});
