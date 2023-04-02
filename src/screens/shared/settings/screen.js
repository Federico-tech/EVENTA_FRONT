import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Switch } from 'react-native';

import { Container, Header, TextButton, Text, Row, Line, AlertModal } from '../../../components';
import { logout } from '../../../utils/index';
import { COLORS, FONTS, SIZE, SIZES } from '../../../utils/theme';
import { deleteMe } from '../../../services/users';

export const SettingScreen = () => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [language, setLanguage] = useState(currentLanguage);

  const switchlanguage = async (lng) => {
    setLanguage(lng);
    await AsyncStorage.setItem('language', lng);
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const getLanguage = async () => {
      const lang = await AsyncStorage.getItem('language');
      if (lang) {
        switchlanguage(lang);
      }
    };
    getLanguage();
  }, []);

  const onPressDelete = () => {
    deleteMe()
    logout()
  }

  return (
    <Container>
      <Header title={t('settings')} back />
      <Row style={{ margin: SIZE }}>
        <Text semiBoldMd style={styles.notification}>
          Notifications
        </Text>
        <Row row alignCenter spaceBetween style={{ marginTop: SIZE }}>
          <Text medium>Allow notification</Text>
          <Switch />
        </Row>
      </Row>
      <Line />
      <Row style={{ margin: SIZE }}>
        <Text semiBoldMd style={styles.notification}>
          Language
        </Text>
        <Row style={{ marginTop: SIZE / 2 }}>
          <TextButton
            text="Italian"
            onPress={() => switchlanguage('it')}
            style={language === 'it' ? styles.languageButtonEnable : styles.languageButtonDisabled}
          />
          <TextButton
            text="English"
            onPress={() => switchlanguage('en')}
            style={language === 'en' ? styles.languageButtonEnable : styles.languageButtonDisabled}
          />
        </Row>
      </Row>
      <Line />
      <Row style={{ margin: SIZE }}>
        <Text semiBoldMd style={styles.notification}>
          Your data
        </Text>
        <Row row alignCenter style={{ marginTop: SIZE }}>
          <MaterialCommunityIcons name="lock-outline" size={SIZE * 2} style={{ marginRight: SIZE / 2 }} />
          <TextButton text="Privacy & Terms" />
        </Row>
        <Row row alignCenter style={{ marginTop: SIZE }}>
          <MaterialCommunityIcons name="information-outline" size={SIZE * 2} style={{ marginRight: SIZE / 2 }} />
          <TextButton text="Informations" />
        </Row>
        <Row style={{ marginTop: SIZE / 2 }} />
      </Row>
      <Line />
      <Row style={{ margin: SIZE }} alignCenter>
        <TextButton text="Delete account" style={styles.redButton} onPress={() => setDeleteModalVisible(!isDeleteModalVisible)} />
        <TextButton text="Logout" style={styles.redButton} onPress={() => setLogoutModalVisible(!isLogoutModalVisible)} />
      </Row>
      <AlertModal
        isVisible={isLogoutModalVisible}
        onPressConfirm={logout}
        title="You want to log out?"
        confirmText="Log out"
        onBackdropPress={() => setLogoutModalVisible(false)}
      />
      <AlertModal
        isVisible={isDeleteModalVisible}
        onPressConfirm={onPressDelete}
        title="Delete you Eventa account?"
        confirmText="Delete"
        descritpion="Are you sure you want to delete your account. This action is irreversible and you won't be able to recover it"
        onBackdropPress={() => setDeleteModalVisible(false)}
      />
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
  languageButtonEnable: {
    marginBottom: SIZE / 2,
    fontSize: SIZES.sm,
    fontFamily: FONTS.regular,
    color: COLORS.primary,
  },
  languageButtonDisabled: {
    marginBottom: SIZE / 2,
    fontSize: SIZES.sm,
    fontFamily: FONTS.regular,
  },
  redButton: {
    color: 'red',
    fontSize: SIZES.sm,
    marginTop: SIZE,
  },
});
