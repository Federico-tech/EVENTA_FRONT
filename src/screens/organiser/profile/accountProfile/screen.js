import React from 'react';

import { Container, ProfileHeader } from '../../../../components';
import { OrganiserTopNavigator } from '../../../../navigation/TopTabNavigator';

export const AccountOrganiserScreen = ({ route }) => {
  const { data } = route.params;
  return (
    <Container>
      <ProfileHeader data={data} organiser />
      <OrganiserTopNavigator data={data} otherProfile />
    </Container>
  );
};
