import React from 'react';

import { Container, ProfileHeader } from '../../../../components';

export const AccountUserScreen = ({ route }) => {
  const { data } = route.params;
  return (
    <Container>
      <ProfileHeader data={data} />
    </Container>
  );
};
