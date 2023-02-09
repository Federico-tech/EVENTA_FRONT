import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

import { Button, Container, ProfileHeader, Row } from '../../../../components';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const AccountUserScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { data } = route.params;
  return (
    <Container>
      <ProfileHeader data={data} />
    </Container>
  );
};

const styles = StyleSheet.create({
  
});
