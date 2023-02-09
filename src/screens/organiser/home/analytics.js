import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Container, Row } from '../../../components';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES } from '../../../utils/theme';

export const Analytics = () => {
  return (
    <Container>
      <Row row spaceBetween>
        <View style={styles.containers}>
          <Row alignCenter>
            <Text style={styles.number}>12</Text>
            <Text style={styles.text}>Your Events</Text>
          </Row>
        </View>
        <View style={styles.containers}>
          <Row alignCenter>
            <Text style={styles.number}>132</Text>
            <Text style={styles.text}>Partecipants</Text>
          </Row>
        </View>
      </Row>
      <Text style={styles.events}>Recent Events</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  containers: {
    backgroundColor: COLORS.white,
    width: SIZE * 13,
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
    marginTop: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.backGray,
    borderWidth: 0.5,
    ...SHADOWS.medium,
  },
  number: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZE * 4,
    color: COLORS.primary,
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.primary,
  },
  events: {
    marginTop: SIZE,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
  },
});
