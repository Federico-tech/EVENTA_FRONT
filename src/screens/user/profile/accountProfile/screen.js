import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, ProfileHeader } from '../../../../components';
import { refreshSelectedUser } from '../../../../services/users';
import { selectSelectedUser } from '../../../../store/user';

export const AccountUserScreen = ({ route }) => {
  const userSelected = useSelector(selectSelectedUser);

  useEffect(() => {
    refreshSelectedUser(userSelected);
  }, []);

  return (
    <Container>
      <ProfileHeader user={userSelected} />
    </Container>
  );
};
