import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { logout } from '../../../utils';

export const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <TouchableOpacity style={{ marginTop: 150 }} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
