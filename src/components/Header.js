import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { HEIGHT_DEVICE } from '../utils/theme';

export const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text>Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: HEIGHT_DEVICE / 10,
  },
});
