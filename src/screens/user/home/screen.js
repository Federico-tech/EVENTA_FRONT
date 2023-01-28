import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import { Container, EventCard, HomeHeader, HomeTop } from '../../../components/index';
import { getEvents } from '../../../services/events';
import * as Location from 'expo-location';

export const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync({});
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        console.log('Coordinates', location.coords);
      }
    })();
  }, []);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container>
      <HomeHeader />
      <FlatList
        //data={data}
        renderItem={({ item }) => <EventCard data={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HomeTop />}
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {},
});
