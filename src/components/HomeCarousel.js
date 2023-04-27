import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel, {Pagination, useCarousel } from 'react-native-reanimated-carousel';

import { SIZE, WIDTH_DEVICE } from '../utils/theme';

export const HomeCarousel = () => {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  page: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
});
