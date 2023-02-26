import React from 'react';
import FlashMessage from 'react-native-flash-message';

import { Container, HomeHeader } from '../../../components';
import { OrganiserEventsTopNavigator } from '../../../navigation/TopTabNavigator';
import { Analytics } from './analytics';

export const OrganiserHome = () => {
  return (
    <Container>
      <HomeHeader organiser />
      <Analytics />
      <OrganiserEventsTopNavigator />
      <FlashMessage position="top" />
    </Container>
  );
};
