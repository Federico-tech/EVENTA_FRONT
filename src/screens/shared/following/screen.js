import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, Header, SearchBar } from '../../../components';
import { FollowingTopNavigator } from '../../../navigation/TopTabNavigator';
import { selectSearchFilter } from '../../../store/filter';
import { SIZE, WIDTH_DEVICE } from '../../../utils/theme';

export const FollowingScreen = ({ route }) => {

  const { followingParams } = route.params;

  return (
    <Container>
      <Header title="Following" />
      <SearchBar style={{ marginHorizontal: WIDTH_DEVICE / 20, marginTop: SIZE }} />
      <FollowingTopNavigator followingParams={followingParams}/>
    </Container>
  );
};
