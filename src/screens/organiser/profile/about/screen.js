import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { Container } from '../../../../components';
import { selectCurrentUser } from '../../../../store/user';
import { SIZE } from '../../../../utils/theme';

export const AboutScreen = ({ route }) => {
  const user = useSelector(selectCurrentUser);
  const { data } = route.params;

  return (
    <Container>
      <View style={{ margin: SIZE }}>
        <Text>{data !== undefined ? (data._id !== user._id ? data.bio : user.bio) : user.bio}</Text>
      </View>
    </Container>
  );
};
