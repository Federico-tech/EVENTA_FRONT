import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, ProfileHeader } from '../../../../components';
import { OrganiserTopNavigator } from '../../../../navigation/TabView';

import { refreshSelectedUser } from '../../../../services/users';
import { selectSelectedUser, selectSelectedUserId } from '../../../../store/user';
import { useIsFocused } from '@react-navigation/native';

export const AccountOrganiserScreen = ({ route }) => {
  const user = useSelector(selectSelectedUser);
  const [isLoading, setIsloading] = useState(false);
  const id = useSelector(selectSelectedUserId);

  const isFoucused = useIsFocused()

  useEffect(() => {
    const refresh = async () => {
      setIsloading(true);
      await refreshSelectedUser(user);
      setIsloading(false);
    };
    refresh();
  }, [id, isFoucused]);

  return (
    <Container>
      <View style={{ zIndex: 1 }}>
        <ProfileHeader user={user} disableGoBack={isLoading}/>
      </View>
      <OrganiserTopNavigator user={user} account isLoading={isLoading} />
    </Container>
  );
};
