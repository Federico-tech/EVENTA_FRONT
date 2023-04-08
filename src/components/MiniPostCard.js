import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const MiniPostCard = ({ postData }) => {
  return (
    <View>
      <View style={styles.container}>
        <Row row alignCenter style={{ margin: SIZE / 3 }}>
          <LoadingImage source={postData.user.profilePic} profile width={SIZE * 2} />
          <Text regularXs style={{ marginLeft: SIZE / 2, fontFamily: FONTS.medium }}>
            {postData.user.username}
          </Text>
        </Row>
        <LoadingImage source={postData.postImage} width={SIZE * 12} event />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.xxs,
    backgroundColor: COLORS.white,
    marginRight: WIDTH_DEVICE / 20,
    marginTop: SIZE,
    ...SHADOWS.medium,
  },
  textStyle: {
    fontSize: SIZES.xs,
    fontFamily: FONTS.semiBold,
  },
});
