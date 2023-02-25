import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Container, Row, Text } from '../../../components';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';

export const Analytics = () => {
  return (
    <Container>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Lifetime Analytics</Text>
        <Row spaceAround row style={{ marginTop: SIZE * 2, marginBottom: SIZE * 2 }}>
          <Row alignCenter>
            <Row row alignCenter>
              <View style={styles.purpleDot} />
              <Text medium color={COLORS.darkGray}>
                Events
              </Text>
            </Row>
            <Text style={styles.number}>25</Text>
          </Row>
          <Row alignCenter>
            <Row row alignCenter>
              <View style={styles.blueDot} />
              <Text medium color={COLORS.darkGray}>
                Part
              </Text>
            </Row>
            <Text style={styles.number}>250</Text>
          </Row>
        </Row>
        <Row alignCenter>
          <Row row alignCenter style={{ alignSelf: 'center' }}>
            <View style={styles.greenDot} />
            <Text medium color={COLORS.darkGray}>
              Likes
            </Text>
          </Row>
          <Text style={styles.number}>150</Text>
        </Row>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    marginHorizontal: WIDTH_DEVICE / 20,
    height: SIZE * 15,
    marginTop: SIZE,
    ...SHADOWS.medium,
    borderRadius: 30,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
    alignSelf: 'center',
    marginTop: SIZE,
  },
  purpleDot: {
    width: SIZE / 2,
    backgroundColor: 'darkviolet',
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: SIZE / 2,
  },
  blueDot: {
    width: SIZE / 2,
    backgroundColor: 'darkturquoise',
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: SIZE / 2,
  },
  greenDot: {
    width: SIZE / 2,
    backgroundColor: 'darkslategrey',
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: SIZE / 2,
  },
  number: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.sm,
    marginTop: SIZE / 2,
  },
});
