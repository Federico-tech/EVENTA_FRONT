import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, ProfileHeader } from '../../../../components';
import { OrganiserTopNavigator } from '../../../../navigation/TabView';

import { refreshSelectedUser } from '../../../../services/users';
import { selectSelectedUser } from '../../../../store/user';

export const AccountOrganiserScreen = ({ route }) => {
  const user = useSelector(selectSelectedUser);

  useEffect(() => {
    refreshSelectedUser(user);
  }, []);

  return (
    <Container>
      <View style={{ zIndex: 1 }}>
        <ProfileHeader user={user} />
      </View>
      <OrganiserTopNavigator user={user} account />
    </Container>
  );
};
