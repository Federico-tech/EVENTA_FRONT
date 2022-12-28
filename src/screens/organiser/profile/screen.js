import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { logout } from '../../../utils';

export const OrganiserProfileScreen = () => {
  return (
    <View>
      <Text>OrganiserProfileScreen</Text>
      <TouchableOpacity onPress={logout}>
        <Text style={{ marginTop: 150 }}> Logout </Text>
      </TouchableOpacity>
    </View>
  );
};
