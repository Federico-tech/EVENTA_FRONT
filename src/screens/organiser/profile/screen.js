import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, ProfileHeader } from '../../../components';
import { OrganiserTopNavigator } from '../../../navigation/TopTabNavigator';
import { refreschCurrentUser } from '../../../services/users';
import { selectCurrentUser } from '../../../store/user';

export const OrganiserProfileScreen = () => {

  const user = useSelector(selectCurrentUser);
  
  useEffect(() => {
    refreschCurrentUser(user);
  }, [user.followers, user.followed]);

  return (
    <Container>
      <ProfileHeader myProfile organiser user={user}/>
      <OrganiserTopNavigator />
    </Container>
  );
};
