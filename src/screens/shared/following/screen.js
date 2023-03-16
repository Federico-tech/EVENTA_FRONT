import React from 'react';

import { Container, Header, SearchBar } from '../../../components';
import { FollowingTopNavigator } from '../../../navigation/TopTabNavigator';
import { SIZE, WIDTH_DEVICE } from '../../../utils/theme';

export const FollowingScreen = () => {
  return (
    <Container>
      <Header title="Following" />
      <SearchBar style={{ marginHorizontal: WIDTH_DEVICE / 20, marginTop: SIZE }} />
      <FollowingTopNavigator />
    </Container>
  );
};
