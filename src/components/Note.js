import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { COLORS, SHADOWS, SIZE, SIZES } from '../utils/theme';
import { Row } from './Row';
import { Text } from './Text';

export const Note = ({ data }) => {
  return (
    <Row justifyCenter>
      <View>
        <View style={styles.note}>
          <Row row alignCenter spaceBetween>
            <Image source={{ uri: data?.user.profilePic }} style={styles.noteImage} />
            <Row row alignCenter>
              <Text>135</Text>
              <MaterialIcons name="local-fire-department" size={SIZE * 1.7} />
            </Row>
          </Row>
          <Text semiBoldSm numberOfLines={1} ellipsizeMode="tail">
            {data.user.username}
          </Text>
          <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: SIZES.xs, marginTop: SIZE / 3, marginRight: SIZE }}>
            {data.content}
          </Text>
        </View>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  note: {
    backgroundColor: COLORS.white,
    width: SIZE * 10.5,
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
    padding: SIZE / 1.5,
    marginHorizontal: SIZE / 6,
    marginRight: SIZE,
    ...SHADOWS.medium,
  },
  noteImage: {
    width: SIZE * 3,
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: SIZE * 2,
    marginBottom: SIZE / 2,
  },
});
