import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Container } from '../../../components';
import { logout } from '../../../utils';

export const OrganiserProfileScreen = () => {
  return (
    <Container>
      <Text>OrganiserProfileScreen</Text>
      <TouchableOpacity onPress={logout}>
        <Text style={{ marginTop: 150 }}> Logout </Text>
      </TouchableOpacity>
    </Container>
  );
};
