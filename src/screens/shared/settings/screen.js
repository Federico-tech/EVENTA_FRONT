import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import i18n from '../../../utils/locales/i18n';

import { Container, IconButton } from '../../../components';
import { logout } from '../../../utils/index';
import { SIZE } from '../../../utils/theme';

export const SettingScreen = ({ navigation }) => {
  return (
    <Container>
      <IconButton name="chevron-back" size={22} iconStyle={styles.iconStyle} onPress={() => navigation.goBack()} />
      <View style={styles.logout}>
        <TouchableOpacity onPress={logout}>
          <Text>{i18n.t('logout')}</Text>
        </TouchableOpacity>
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
