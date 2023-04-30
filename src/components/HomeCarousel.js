import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { HomeMap, MostPopularEventCard, Row, Text } from '.';
import { getRecommendedUsers } from '../services/users';
import { COLORS, SIZE, WIDTH_DEVICE } from '../utils/theme';
import { RecommendedUserColumn } from './AccountRow';

const RecommendedUsers = () => {
  const [recommendedUsers, setRecommendedUsers] = useState();

  useEffect(() => {
    getRecommendedUsers().then((result) => {
      console.log(result);
      setRecommendedUsers(result);
    });
  }, []);

  console.log('RecommendedUsers', recommendedUsers);

  return (
    <View style={styles.recommendedUserContainer}>
      <Text semiBoldSm>Find new Friends!</Text>
      <Row row spaceBetween width="100%" mt={SIZE}>
        {recommendedUsers?.map((recommendedUser) => (
          <RecommendedUserColumn key={recommendedUser._id} data={recommendedUser} />
        ))}
      </Row>
    </View>
  );
};

export const HomeCarousel = ({ eventData, mapData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      title: 'Event Card 1',
      component: eventData?._id ? <MostPopularEventCard eventData={eventData} /> : null,
    },
    {
      title: 'Map',
      component: <HomeMap mapData={mapData} />,
    },
    {
      title: 'Find new friends',
      component: <RecommendedUsers />,
    },
  ];

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const x = event.nativeEvent.contentOffset.x;
          const index = Math.floor(x / WIDTH_DEVICE);
          if (index !== activeIndex) {
            setActiveIndex(index);
          }
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{ height: SIZE * 17 }}>
        {items.map((item, index) => (
          <View key={index} style={{ width: WIDTH_DEVICE }}>
            {item.component}
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        {items.map((_, index) => (
          <View style={[styles.dot, { backgroundColor: index === activeIndex ? COLORS.primary : COLORS.lightGray }]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZE * 20,
    width: WIDTH_DEVICE,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZE * 18,
  },
  textContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    textAlign: 'center',
  },
  dotContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    width: SIZE / 2,
    aspectRatio: 1,
    borderRadius: 10,
    margin: SIZE / 2,
    marginBottom: -SIZE,
  },
  recommendedUserContainer: {
    backgroundColor: COLORS.backGray,
    height: SIZE * 19,
    marginBottom: -SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: WIDTH_DEVICE / 20,
  },
});
