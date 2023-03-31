import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { Row } from './Row';
import { TextButton } from './TextButton';

//onPress={() => navigation.goBack()

export const Header = ({ title, onPress, loading, done }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Row alignCenter row spaceBetween style={{ marginTop: SIZE * 4 }}>
        <View style={{ width: SIZE * 4.5 }}>
          <TextButton text={t('Cancel')} onPress={() => navigation.goBack()} textStyle={styles.cancel} loading={loading} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {done ? (
          <View style={{ width: SIZE * 4.5, alignItems: 'center' }}>
            <TextButton text={t('done')} onPress={onPress} textStyle={styles.fine} loading={loading} />
          </View>
        ) : (
          <View style={{ width: SIZE * 4.5, alignItems: 'center' }} />
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
  cancel: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.error,

  },
});
