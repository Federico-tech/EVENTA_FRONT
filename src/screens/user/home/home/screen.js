import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, EventCard, HomeHeader, HomeTop } from '../../../../components/index';
import { getEvents } from '../../../../services/events';
import { userUpdate } from '../../../../services/users';
import { selectEvents } from '../../../../store/event';
import { SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync({});
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        console.log('Coordinates', location.coords);
        const position = {
          type: 'Point',
          coordinates: [location.coords.longitude, location.coords.latitude],
        };
        await userUpdate({ position });
      }
    })();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getEvents();
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const { data } = useSelector(selectEvents);
  console.log('data', data);

  return (
    <Container>
      <HomeHeader />
      <FlatList
        data={data}
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
  map: {
    height: SIZE * 17,
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE,
    borderRadius: SIZES.xxs,
  },
});
