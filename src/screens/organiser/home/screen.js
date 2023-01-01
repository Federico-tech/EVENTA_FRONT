import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Container } from '../../../components';

export const OrganiserHome = () => {
  return (
    <Container>
      <Text style={styles.container}> OrganiserHome </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
