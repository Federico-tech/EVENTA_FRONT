import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { useSelector } from 'react-redux';

import { Container, HomeHeader, MiniEventCard } from '../../../components';

import { selectUserId } from '../../../store/user';
import { useInfiniteScroll } from '../../../utils/hooks';
import { FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';

export const OrganiserHome = () => {
  
  const organiserId = useSelector(selectUserId)

  const { data, refreshing, getRefreshedData } = useInfiniteScroll({
    entity: 'events',
    filters: {
      organiserId,
    }
  });

  return (
    <Container>
      <HomeHeader />
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <MiniEventCard data={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
          ListHeaderComponent={<Text style={styles.text}>All Your Events</Text>}
          style={styles.container}
        />
      </View>
      <FlashMessage position="top" />
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.semiBold,
    marginTop: SIZE,
    fontSize: SIZES.lg,
  },
});
