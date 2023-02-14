import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { IconButton } from './Button';
import { Row } from './Row';
import { TextButton } from './TextButton';

export const Header = ({ title, onPress, loading, done }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Row alignCenter row spaceBetween style={{ marginTop: SIZE * 4 }}>
        <View style={{ width: SIZE * 4 }}>
          <IconButton name="chevron-back" size={SIZE * 2} onPress={() => navigation.goBack()} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {done ? (
          <View style={{ width: SIZE * 4, alignItems: 'center' }}>
            <TextButton text={t('done')} onPress={onPress} textStyle={styles.fine} loading={loading} />
          </View>
        ) : (
          <View style={{ width: SIZE * 4, alignItems: 'center' }} />
        )}
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZE * 7,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.lightGray,
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
