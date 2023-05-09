import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, ProfileHeader } from '../../../../components';
import { OrganiserTopNavigator } from '../../../../navigation/TabView';
import { refreschCurrentUser } from '../../../../services/users';
import { selectCurrentUser } from '../../../../store/user';

export const OrganiserProfileScreen = () => {
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    refreschCurrentUser(user);
  }, [user.followers, user.followed]);

  return (
    <Container>
      <View style={{ zIndex: 1 }}>
        <ProfileHeader myProfile user={user} />
      </View>
      <OrganiserTopNavigator user={user} myProfile />
    </Container>
  );
};
