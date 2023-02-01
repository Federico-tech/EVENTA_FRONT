import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { useSelector } from 'react-redux';

import { Container, HomeHeader, MiniEventCard } from '../../../components';
import { getEvents, getOrganiserEvents } from '../../../services/events';
import { selectEvents } from '../../../store/event';
import { selectUserId } from '../../../store/user';
import { FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';

export const OrganiserHome = () => {
  const [refreshing, setRefreshing] = useState(false);

  const userId = useSelector(selectUserId)

  const onRefresh = async () => {
    setRefreshing(true);
    await getOrganiserEvents(userId);
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const { data } = useSelector(selectEvents);

  return (
    <Container>
      <HomeHeader />
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <MiniEventCard data={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.text}>All Your Events</Text>}
          style={styles.container}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
