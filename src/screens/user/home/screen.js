import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { EventCard, HomeHeader, HomeTop } from '../../../components/index';
import { EventData } from '../../../utils/constants/Dummy';
import { HEIGHT_DEVICE } from '../../../utils/constants/Theme';

export const HomeScreen = () => {
  return (
    <View>
      <HomeHeader />
      <FlatList
        data={EventData}
        renderItem={({ item }) => <EventCard data={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HomeTop />}
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: HEIGHT_DEVICE / 8.5,
  },
});
