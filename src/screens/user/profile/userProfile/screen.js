import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, ProfileHeader } from '../../../../components';
import { UserTopNavigator } from '../../../../navigation/TabView';
import { refreschCurrentUser } from '../../../../services/users';
import { selectCurrentUser } from '../../../../store/user';

export const ProfileScreen = () => {
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    refreschCurrentUser(user);
  }, [user.followers, user.followed]);

  return (
    <Container>
      <View style={{ zIndex: 1 }}>
        <ProfileHeader myProfile user={user} />
      </View>
      <UserTopNavigator user={user} />
    </Container>
  );
};
