import Ionicons from '@expo/vector-icons/Ionicons';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import { setSearchFilter } from '../store/filter';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { SafeArea } from './SafeArea';

export const SearchBar = ({ style }) => {
  const { t } = useTranslation();
  const [searchData, setSearchData] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    _.debounce(() => {
      dispatch(setSearchFilter(searchData));
    }, 700)();
  }, [searchData]);

  return (
    <SafeArea>
      <View style={[styles.wrapper, style]}>
        <Ionicons name="ios-search" size={20} color={COLORS.gray} style={styles.icon} />
        <TextInput placeholder={t('search')} placeholderTextColor={COLORS.gray} color={'white'} style={styles.textInput} onChangeText={setSearchData} />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.darkGray,
    marginTop: SIZE,
    height: SIZE * 3,
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
    width: SIZE * 23,
    fontSize: SIZES.sm,
    
  },
});
