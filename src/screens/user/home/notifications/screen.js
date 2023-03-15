import * as Notifications from 'expo-notifications';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';

import { Container, Header } from '../../../../components';
import { registerForPushNotificationsAsync } from '../../../../utils/permissions';

export const NotificationsScreen = () => {
  const sendPushNotification = async (expoPushToken) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token);

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
      } catch (error) {
        console.log('Error registering for push notifications:', error);
        // handle error appropriately
      }
    })();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Container>
      <Header title="Notifications" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View>
    </Container>
  );
};
