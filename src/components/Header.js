import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { IconButton } from './Button';
import { Row } from './Row';
import { SafeArea } from './SafeArea';
import { TextButton } from './TextButton';

export const Header = ({ title, onPress, loading, done, cancel, back, plus, onPressPlus, create }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Row alignCenter row spaceBetween style={{ marginTop: SIZE / 1.5 }}>
          {cancel && <TextButton text={t('Cancel')} onPress={() => navigation.goBack()} textStyle={styles.cancel} />}
          {back && <IconButton name="chevron-back" size={SIZE * 2} onPress={() => navigation.goBack()} iconStyle={{ marginLeft: -SIZE / 2 }} /> }
          <View />
          {done && <TextButton text={t('done')} onPress={onPress} textStyle={styles.fine} loading={loading} />}
          {create && <TextButton text="Create" onPress={onPress} textStyle={styles.fine} loading={loading} />}
          {plus && (
            <TouchableOpacity onPress={onPressPlus}>
              <AntDesign name="plus" size={SIZE * 1.6} color={'white'} />
            </TouchableOpacity>
          )}
        </Row>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZE * 3.5,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.darkGray,
    paddingHorizontal: WIDTH_DEVICE / 20,
    backgroundColor: COLORS.white,
  },
  title: {
    alignSelf: 'center',
    fontSize: SIZES.md,
    fontFamily: FONTS.semiBold,
    position: 'absolute',
    marginTop: SIZE / 1.4,
    color: 'white',
  },
  fine: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
  },
  cancel: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
  },
});
