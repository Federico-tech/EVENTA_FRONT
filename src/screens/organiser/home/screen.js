import { useNavigation, useScrollToTop } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, HomeHeader, MiniEventCard, Row, Text } from '../../../components';
import { ROUTES } from '../../../navigation/Navigation';
import { getAnalytics } from '../../../services/analytics';
import { getPopularEvents } from '../../../services/events';
import { selectCurrentUser, selectCurrentUserId } from '../../../store/user';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';
import { Analytics } from './analytics';

export const OrganiserHome = () => {
  const navigation = useNavigation();
  const [popularEvents, setPopularEvents] = useState();
  const [analytics, setAnalytics] = useState();
  const [isLoading, setIsLoading] = useState();
  const organiserId = useSelector(selectCurrentUserId);
  const user = useSelector(selectCurrentUser);

  console.log(popularEvents);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const fetchData = async () => {
    setIsLoading(true);
    const resEvents = await getPopularEvents(organiserId, { queryParams: { limit: 2 } });
    const analytics = await getAnalytics();
    setAnalytics(analytics);
    setPopularEvents(resEvents);
    setIsLoading(false);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onPressNavigatePopularEvents = () => {
    navigation.navigate(ROUTES.PopularEventsScreen);
  };

  return (
    <Container>
      <HomeHeader organiser />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZE }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchData} />}>
        <Analytics analytics={analytics} />
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          <Text ff={FONTS.semiBold}>Most popular events</Text>
          {isLoading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : (
            <Row>
              {popularEvents && popularEvents?.slice(0, 3).map((event) => <MiniEventCard key={event._id} data={event} scan />)}

              {popularEvents && (
                <>
                  {popularEvents.length !== 0 && (
                    <TouchableOpacity onPress={onPressNavigatePopularEvents}>
                      <Text style={styles.viewAll} mt={SIZE}>
                        View all
                      </Text>
                    </TouchableOpacity>
                  )}
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
