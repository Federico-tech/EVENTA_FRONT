import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

import { Button, Container, ProfileHeader, Row } from '../../../../components';
import { OrganiserTopNavigator } from '../../../../navigation/TopTabNavigator';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const AccountOrganiserScreen = ({ route }) => {
  const { data } = route.params;
  return (
    <Container>
      <ProfileHeader data={data} organiser/>
      <OrganiserTopNavigator data={data} otherProfile/>
    </Container>
  );
};
