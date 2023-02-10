import React from 'react';

import { Container, ProfileHeader } from '../../../components';
import { OrganiserTopNavigator } from '../../../navigation/TopTabNavigator';

export const OrganiserProfileScreen = () => {
  return (
    <Container>
      <ProfileHeader myProfile organiser />
      <OrganiserTopNavigator />
    </Container>
  );
};
