import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import { setSearchFilter } from '../store/filter';
import { COLORS, SIZE, SIZES, TAB_BAR_HEIGHT, WIDTH_DEVICE } from '../utils/theme';

export const SearchBar = () => {
  const { t } = useTranslation();
  const [searchData, setSearchData] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchFilter(searchData));
  }, [searchData]);

  return (
    <View style={styles.wrapper}>
      <Ionicons name="ios-search" size={20} color={COLORS.gray} style={styles.icon} />
      <TextInput placeholder={t('search')} placeholderTextColor={COLORS.gray} style={styles.textInput} onChangeText={setSearchData} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DEDEDE',
    marginTop: TAB_BAR_HEIGHT + SIZE,
    height: SIZE * 3,
    marginHorizontal: WIDTH_DEVICE / 20,
    borderRadius: SIZES.xs,
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: WIDTH_DEVICE / 9,
  },
  icon: {
    marginLeft: WIDTH_DEVICE / 40,
  },
  textInput: {
    marginLeft: WIDTH_DEVICE / 50,
  },
});
