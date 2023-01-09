import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, EventCard, HomeHeader, HomeTop } from '../../../components/index';
import { getEvents } from '../../../services/events';
import { selectEvents } from '../../../store/event';

export const HomeScreen = () => {
  useEffect(() => {
    getEvents();
  }, []);

  const eventData = useSelector(selectEvents);

  return (
    <Container>
      <HomeHeader />
      <FlatList
        data={eventData}
        renderItem={({ item }) => <EventCard data={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HomeTop />}
        style={styles.container}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {},
});
