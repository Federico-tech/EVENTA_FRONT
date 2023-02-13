import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, ProfileHeader } from '../../../../components';
import { OrganiserTopNavigator } from '../../../../navigation/TopTabNavigator';
import { refreshSelectedUser } from '../../../../services/users';
import { selectSelectedUser } from '../../../../store/user';

export const AccountOrganiserScreen = ({ route }) => {
  
  const userSelected = useSelector(selectSelectedUser);

  useEffect(() => {
    refreshSelectedUser(userSelected);
  }, []);

  return (
    <Container>
      <ProfileHeader user={userSelected} organiser />
      <OrganiserTopNavigator data={userSelected} />
    </Container>
  );
};
