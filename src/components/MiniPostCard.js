import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const MiniPostCard = ({ postData }) => {
  return (
    <View>
      <LoadingImage source={postData.postImage} width={SIZE * 14} event />
      <View style={styles.container}>
        <Row row alignCenter style={{ margin: SIZE / 2}}>
          <LoadingImage source={postData.user.profilePic} profile width={SIZE * 2} />
          <Text regularXs color={COLORS.white}style={{ marginLeft: SIZE / 2, fontFamily: FONTS.semiBold }}>
            {postData.user.username}
          </Text>
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  textStyle: { 
    fontSize: SIZES.xs,
    fontFamily: FONTS.semiBold,
  },
});
