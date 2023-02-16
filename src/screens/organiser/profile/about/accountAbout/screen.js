import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { Container } from '../../../../../components';
import { selectSelectedUser } from '../../../../../store/user';
import { SIZE } from '../../../../../utils/theme';

export const AboutAccountScreen = () => {
  const user = useSelector(selectSelectedUser);
  return (
    <Container>
      <Text style={{ margin: SIZE }}>{user.bio}</Text>
    </Container>
  );
};
