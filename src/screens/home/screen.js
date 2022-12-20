import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { EventData } from '../../utils/constants/Dummy';

import { HEIGHT_DEVICE } from '../../utils/constants/Theme';
import { EventCard, } from '../../components/index';
import { Header, HomeTop } from '../../components/index'

export const HomeScreen = () => {
  return (
    <View>
      <Header />
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
