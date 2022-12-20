import { View, Text, StyleSheet, Image } from 'react-native';
import {WIDTH_DEVICE, HEIGHT_DEVICE, SHADOWS, COLORS, SIZE, SIZES, FONTS} from '../utils/constants/Theme';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

export const EventCard = ({ data }) => {
  const { name, adress, date, image, organiser, likes } = data;

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('EventDetails', {data}) }>
      <View style={styles.cardContainer}>
        <Image source={image} style={styles.eventImage} />
        <View style={styles.descContainer}>
          <View style={styles.informationContainer}>
            <Image resizeMode="contain" source={organiser.profileImage} style={styles.organiserImage} />
            <View style={styles.textContainer}>
              <Text style={styles.textDate}> {date} </Text>
              <Text style={styles.textTitle}> {name} </Text>
              <Text style={styles.textAdress}> {adress} </Text>
            </View>
          </View>
          <View style={styles.likeContainer}>
            <FontAwesome name="heart" size={17} color="red" />
            <Text> {likes} </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    width: WIDTH_DEVICE / 1.1,
    height: HEIGHT_DEVICE / 2.2,
    marginTop: HEIGHT_DEVICE / 70,
    alignSelf: 'center',
    borderRadius: SIZES.xxs,
    ...SHADOWS.light,
  },

  eventImage: {
    width: WIDTH_DEVICE / 1.1,
    height: HEIGHT_DEVICE / 2.7,
    borderRadius: SIZES.xxs,
  },

  organiserImage: {
    width: WIDTH_DEVICE / 8,
    height: HEIGHT_DEVICE / 16,
  },

  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: HEIGHT_DEVICE / 90,
  },

  informationContainer: {
    flexDirection: 'row',
  },

  textContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: WIDTH_DEVICE / 100,
  },

  textDate: {
    color: COLORS.gray,
    fontSize: SIZES.xs,
  },

  textTitle: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.md,
  },

  textAdress: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xs,
  },

  likeContainer: {
    alignItems: 'center',
  },
});
