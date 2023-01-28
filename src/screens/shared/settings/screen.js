import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import i18n from '../../../locales/i18n';

import { Container, IconButton, TextButton } from '../../../components';
import { logout } from '../../../utils/index';
import { SIZE } from '../../../utils/theme';
import { useTranslation } from 'react-i18next';

export const SettingScreen = ({ navigation }) => {

  const [language, setLanguage] = useState()

  const switchlanguage = (lng) => {
    setLanguage(lng)
    i18n.changeLanguage(lng)
  }

  const { i18n } = useTranslation()
  return (
    <Container>
      <IconButton name="chevron-back" size={22} iconStyle={styles.iconStyle} onPress={() => navigation.goBack()} />
      <View style={styles.logout}>
        <TouchableOpacity onPress={logout}>
          <Text>{i18n.t('logout')}</Text>
        </TouchableOpacity>
        <Text> Change Language</Text>
          <TextButton text={'Italian'} onPress={() => switchlanguage('it')}/>
          <TextButton text={'English'} onPress={() => switchlanguage('en')}/>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    marginTop: SIZE * 3,
    position: 'absolute',
    marginLeft: SIZE * 1,
  },
  logout: {
    marginTop: SIZE * 27,
    marginHorizontal: SIZE * 10,
    alignItems: 'center',
  },
});
