import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import MapView from 'react-native-maps';

import { IconButton, Row } from '../components/index';
import { ROUTES } from '../navigation/Navigation';
import { FONTS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';

export const HomeTop = () => {
  const navigation = useNavigation();
  const onPressNotification = () => navigation.navigate(ROUTES.NotificationsScreen);
  const onPressLikes = () => navigation.navigate(ROUTES.LikeScreen);
  return (
    <View>
      <View style={styles.container}>
        <IconButton name="ios-notifications-outline" iconStyle={styles.icon} size={SIZE * 2} onPress={onPressNotification} />
        <Row alignCenter>
          <TouchableOpacity>
            <Row row alignCenter>
              <Text style={styles.place}>Lovere</Text>
              <Ionicons name="chevron-down" size={SIZE * 2} />
            </Row>
          </TouchableOpacity>
          <View style={styles.lineButton} />
        </Row>
        <IconButton name="heart-outline" iconStyle={styles.icon} size={SIZE * 2} onPress={onPressLikes} />
      </View>
      <MapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT_DEVICE / 70,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    fontFamily: FONTS.regular,
    color: 'white',
  },
  icon: {
    position: 'relative',
  },
  lineButton: {
    width: SIZE * 10,
    height: SIZE / 8,
    backgroundColor: 'black',
  },
  place: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
    marginBottom: SIZE / 5,
  },
  map: {
    height: SIZE * 17,
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE,
    borderRadius: SIZES.xxs,
  },
});
