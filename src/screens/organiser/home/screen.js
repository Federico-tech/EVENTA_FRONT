import { useNavigation, useScrollToTop } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Container, HomeHeader, MiniEventCard, Row, Text } from '../../../components';
import { ROUTES } from '../../../navigation/Navigation';
import { getPopularEvents } from '../../../services/events';
import { getPopularPosts } from '../../../services/posts';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';
import { Analytics } from './analytics';

export const OrganiserHome = () => {
  const navigation = useNavigation();
  const [popularEvents, setPopularEvents] = useState();
  const [popularPosts, setPopularPosts] = useState();
  const [isLoading, setIsLoading] = useState();

  console.log(popularEvents);
  console.log(popularPosts);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const resEvents = await getPopularEvents();
      setPopularEvents(resEvents);
      const resPosts = await getPopularPosts();
      setPopularPosts(resPosts);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onPressNavigatePopularEvents = () => {
    navigation.navigate(ROUTES.PopularEventsScreen);
  };

  return (
    <Container>
      <HomeHeader organiser />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Analytics />
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          <Text ff={FONTS.semiBold}>Most popular events</Text>
          {isLoading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : (
            <Row>
              {popularEvents?.slice(0, 3).map((event) => (
                <MiniEventCard key={event._id} data={event} />
              ))}
              {popularEvents && (
                <>
                  <TouchableOpacity onPress={onPressNavigatePopularEvents}>
                    <Text style={styles.viewAll} mt={SIZE}>
                      View all
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Row>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  viewAll: {
    alignSelf: 'center',
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
    marginTop: SIZE,
  },
  activityIndicator: {
    marginTop: SIZE,
    marginBottom: SIZE,
  },
});
