import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, ProfileHeader } from '../../../../components';
import { UserTopNavigator } from '../../../../navigation/TabView';
import { refreshSelectedUser } from '../../../../services/users';
import { selectSelectedUser, selectSelectedUserId } from '../../../../store/user';

export const AccountUserScreen = ({ route }) => {
  const [isLoading, setIsloading] = useState(false);
  const user = useSelector(selectSelectedUser);
  const id = useSelector(selectSelectedUserId);

  useEffect(() => {
    const refresh = async () => {
      setIsloading(true);
      await refreshSelectedUser(user);
      setIsloading(false);
    };
    refresh();
  }, [id]);

  return (
    <Container>
      <View style={{ zIndex: 1 }}>
        <ProfileHeader user={user} disableGoBack={isLoading} />
      </View>
      <UserTopNavigator user={user} account isLoading={isLoading} />
    </Container>
  );
};
