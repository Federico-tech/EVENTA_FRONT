import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { IconButton } from './Button';
import { Row } from './Row';
import { TextButton } from './TextButton';

export const Header = ({ title, onPress, loading }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Row alignCenter row spaceBetween style={{ marginTop: SIZE * 3.5 }}>
        <IconButton name="chevron-back" size={22} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>{title}</Text>
        <TextButton text="Fine" onPress={onPress} textStyle={styles.fine} loading={loading}/>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT_DEVICE / 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray,
    paddingHorizontal: WIDTH_DEVICE / 40,
  },
  title: {
    alignSelf: 'center',
    fontSize: SIZES.md,
    fontFamily: FONTS.semiBold,
  },
  fine: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
  },
});
