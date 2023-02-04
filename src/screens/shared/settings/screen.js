import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Container, Header, TextButton } from '../../../components';
import { logout } from '../../../utils/index';
import { SIZE } from '../../../utils/theme';

export const SettingScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState();


  const switchlanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };
  
  return (
    <Container>
      <Header title={t('settings')} />
      <View style={styles.logout}>
        <TouchableOpacity onPress={logout}>
          <Text>{t('logout')}</Text>
        </TouchableOpacity>
        <Text> Change Language</Text>
        <TextButton text="Italian" onPress={() => switchlanguage('it')} />
        <TextButton text="English" onPress={() => switchlanguage('en')} />
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
