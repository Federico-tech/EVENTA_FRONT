import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Container, SearchBar } from '../../../components/index';
import { SearchTopNavigator } from '../../../navigation/TopTabNavigator';
import { getEvents } from '../../../services/events';
import { SIZE, WIDTH_DEVICE } from '../../../utils/theme';

export const SearchScreen = () => {
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container>
      <SafeAreaView>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20, marginTop: -SIZE / 2 }}>
          <SearchBar />
        </View>
      </SafeAreaView>
      <SearchTopNavigator style={styles.topBar} />
    </Container>
  );
};

const styles = StyleSheet.create({
  topBar: {},
});
