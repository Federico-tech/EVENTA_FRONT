import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Row, Text } from '../../../components';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';

export const Analytics = () => {
  return (
    <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
      {/* <Text style={styles.title}>Lifetime Analytics</Text> */}
      <Row row spaceBetween mt={SIZE}>
        <Row style={styles.wrapper}>
          <Row row alignCenter>
            <AntDesign name="heart" color="red" size={SIZE * 1.5} />
            <Text ml={SIZE} ff={FONTS.semiBold}>
              Likes
            </Text>
          </Row>
          <Text fs={SIZE * 2.2} ff={FONTS.semiBold} mt={SIZE}>
            1.863
          </Text>
        </Row>
        <Row style={styles.wrapper}>
          <Row row alignCenter>
            <MaterialCommunityIcons name="post" color={COLORS.primary} size={SIZE * 1.6} />
            <Text ml={SIZE} ff={FONTS.semiBold}>
              Events
            </Text>
          </Row>
          <Text fs={SIZE * 2.2} ff={FONTS.semiBold} mt={SIZE}>
            45
          </Text>
        </Row>
      </Row>
      <Row row spaceBetween>
        <Row style={styles.wrapper}>
          <Row row alignCenter>
            <Ionicons name="people" color="orange" size={SIZE * 1.7} />
            <Text ml={SIZE} ff={FONTS.semiBold}>
              Participants
            </Text>
          </Row>
          <Text fs={SIZE * 2.2} ff={FONTS.semiBold} mt={SIZE}>
            1.863
          </Text>
        </Row>
        <Row style={styles.wrapper}>
          <Row row alignCenter>
            <MaterialCommunityIcons name="qrcode-scan" color="mediumseagreen" size={SIZE * 1.7} />
            <Text ml={SIZE} ff={FONTS.semiBold}>
              Scans
            </Text>
          </Row>
          <Text fs={SIZE * 2.2} ff={FONTS.semiBold} mt={SIZE}>
            1.863
          </Text>
        </Row>
      </Row>
      <Row style={[styles.wrapper, { width: '100%', aspectRatio: 1.8, padding: SIZE }]}>
        <Text ff={FONTS.semiBold} fs={SIZES.md}>
          Avarages
        </Text>
        <Row row alignCenter mt={SIZE}>
          <Ionicons name="people" color="orange" size={SIZE * 2} />
          <Row ml={SIZE}>
            <Text ff={FONTS.bold} fs={SIZES.md}>
              165
            </Text>
            <Text ff={FONTS.medium} fs={SIZES.xxs} color={COLORS.gray}>
              Participants per event
            </Text>
          </Row>
        </Row>
        <Row row alignCenter mt={SIZE}>
          <MaterialCommunityIcons name="qrcode-scan" color="mediumseagreen" size={SIZE * 2} />
          <Row ml={SIZE}>
            <Text ff={FONTS.bold} fs={SIZES.md}>
              456
            </Text>
            <Text ff={FONTS.medium} fs={SIZES.xxs} color={COLORS.gray}>
              Scans per event
            </Text>
          </Row>
        </Row>
        <Row row alignCenter mt={SIZE}>
          <AntDesign name="heart" color="red" size={SIZE * 2} />
          <Row ml={SIZE}>
            <Text ff={FONTS.bold} fs={SIZES.md}>
              326
            </Text>
            <Text ff={FONTS.medium} fs={SIZES.xxs} color={COLORS.gray}>
              Likes per event
            </Text>
          </Row>
        </Row>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    width: SIZE * 13,
    aspectRatio: 1.5,
    ...SHADOWS.medium,
    borderRadius: 25,
    marginBottom: SIZE,
    padding: SIZE * 1.5,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
    alignSelf: 'center',
    marginTop: SIZE,
    marginBottom: SIZE,
  },
  circle: {
    width: SIZE * 8,
    // borderWidth: 2.5,
    // borderColor: COLORS.white,
    // aspectRatio: 1,
    // borderRadius: 100,
    // marginTop: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
