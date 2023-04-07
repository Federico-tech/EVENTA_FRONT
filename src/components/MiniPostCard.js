import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS, FONTS, SIZE, SIZES } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const MiniPostCard = ({ postData }) => {
  return (
    <View style={{ marginRight: SIZE }}>
      <LoadingImage source={postData.postImage} event width={SIZE * 11} viewStyle={{ zIndex: 0 }} />
      <LinearGradient style={[styles.infoContainer, { borderRadius: SIZES.xxs }]} colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)']}>
        <Row style={styles.infoContainer}>
          <Text color={COLORS.white} style={[styles.textStyle, { marginBottom: SIZE * 6.5 }]}>
            {postData.user.username}
          </Text>
          <Text color={COLORS.white} style={styles.textStyle} numberOfLines={2} ellipsizeMode="tail">
            {postData.caption}
          </Text>
        </Row>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: SIZE / 3,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: SIZES.xs,
    fontFamily: FONTS.semiBold,
  },
});
