import React from 'react';
import { StyleSheet, Text } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import { Container } from '../../../components';

export const OrganiserHome = () => {
  return (
    <Container>
      <Text style={styles.container}> OrganiserHome </Text>
      <FlashMessage position="top" />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
