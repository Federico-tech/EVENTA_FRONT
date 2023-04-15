import * as Notifications from 'expo-notifications';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';

import { Container, Header, Row, TextButton } from '../../../../components';

import { userUpdate } from '../../../../services/users';
import { SIZE } from '../../../../utils/theme';
import { registerForPushNotificationsAsync } from '../../../../utils/notifications';

export const NotificationsScreen = () => {
  
  const registerPushNotifications = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      userUpdate({ expoPushToken: token })
        .then((res) => console.debug({ res }))
        .catch((error) => console.debug({ errorUpdateUser: error }));
    }
  };

  return (
    <Container>
      <Row style={{ marginTop: SIZE * 5}} alignCenter>
        <TextButton text={'Token'} onPress={registerPushNotifications}/>
      </Row>
    </Container>
  );
};
