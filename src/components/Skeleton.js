import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import { COLORS, SIZE, SIZES } from '../utils/theme';
import { Row } from './Row';

export const Skeleton = ({ width, height, style }) => {
  const translateX = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [width]);
  return (
    <View style={StyleSheet.flatten([{ width, height, backgroundColor: COLORS.darkGray, overflow: 'hidden' }, style])}>
      <Animated.View style={{ width: '100%', height: '100%', transform: [{ translateX }] }}>
        <LinearGradient
          style={{ width: '100%', height: '100%' }}
          colors={['transparent', 'rgba(0, 0, 0, 0.05)', 'transparent']}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

export const SkeletonAccountRow = () => {
  return (
    <View style={styles.userWrapper}>
      <Row alignCenter row>
        <Skeleton width={SIZE * 3.5} height={SIZE * 3.5} style={{ borderRadius: SIZE * 50 }} />
        <Row column ml={SIZE}>
          <Skeleton height={SIZE * 0.8} width={SIZE * 15} style={{ marginBottom: SIZE / 2, borderRadius: SIZES.xxs }} />
          <Skeleton height={SIZE * 0.8} width={SIZE * 12} style={{ borderRadius: SIZES.xxs }} />
        </Row>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  userWrapper: {
    marginTop: SIZE,
    height: SIZE * 3.5,
  },
});
