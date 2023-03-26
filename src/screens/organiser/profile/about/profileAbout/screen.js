import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { Container } from '../../../../../components';
import { selectCurrentUser, selectSelectedUser } from '../../../../../store/user';
import { SIZE } from '../../../../../utils/theme';

export const AboutScreen = ({ account }) => {
  const user = useSelector(account ? selectSelectedUser : selectCurrentUser);

  return (
    <Container>
      <View style={{ margin: SIZE }}>
        <Text>{user.bio}</Text>
      </View>
    </Container>
  );
};
