import _ from 'lodash';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Container, ProfileHeader } from '../../../../components';
import { UserTopNavigator } from '../../../../navigation/TabView';
import { refreshSelectedUser } from '../../../../services/users';
import { selectSelectedUser, selectSelectedUserId } from '../../../../store/user';

export const AccountUserScreen = ({ route }) => {
  const user = useSelector(selectSelectedUser);
  const id = useSelector(selectSelectedUserId);

  useEffect(() => {
    refreshSelectedUser(user);
  }, [id]);

  return (
    <Container>
       <View style={{ zIndex: 1 }}>
        <ProfileHeader user={user} />
      </View>
      <UserTopNavigator user={user} account />
    </Container>
  );
};
