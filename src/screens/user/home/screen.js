import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Container, EventCard, HomeHeader, HomeTop } from '../../../components/index';
import { EventData } from '../../../utils/constants/Dummy';

export const HomeScreen = () => {
  return (
    <Container>
      <HomeHeader />
      <FlatList
        data={EventData}
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
