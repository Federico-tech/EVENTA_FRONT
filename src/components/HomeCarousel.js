import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { HomeMap, MostPopularEventCard } from '.';
import { COLORS, SIZE, WIDTH_DEVICE } from '../utils/theme';

export const HomeCarousel = ({ eventData, mapData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  
  const items = [
    {
      title: 'Event Card 1',
      component: <MostPopularEventCard eventData={eventData} />,
    },
    {
      title: 'Map',
      component: <HomeMap mapData={mapData} />,
    },
    {
      title: 'Event Card 2',
      component: <MostPopularEventCard eventData={eventData} />,
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
          <View style={[styles.dot, { backgroundColor: index === activeIndex ? COLORS.primary : COLORS.gray }]} />
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
    width: SIZE / 1.7,
    aspectRatio: 1,
    borderRadius: 10,
    margin: SIZE / 2,
    marginBottom: -SIZE,
  },
});
