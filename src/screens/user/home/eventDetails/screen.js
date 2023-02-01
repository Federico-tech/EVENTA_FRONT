import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { Container, IconButton, Line, OrganiserInf, ReadMoreButton } from '../../../../components';
import { formatDate, formatTime } from '../../../../utils/dates';
import { COLORS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE, FONTS, SIZE } from '../../../../utils/theme';

export const EventDetails = ({ route, navigation }) => {
  const { data } = route.params;
  const source = { uri: data.coverImage };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.imageContainer}>
              <Image source={source} style={styles.eventImage} resizeMode="contain" />
              <IconButton
                name="chevron-back-outline"
                onPress={() => navigation.goBack()}
                size={SIZE * 2}
                iconStyle={styles.arrowStyle}
                color="white"
              />
            </View>
            <OrganiserInf data={data} />
            <Line />
            <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
              <Text style={styles.eventTitle}>{data.name}</Text>
              <ReadMoreButton text={data.description} style={styles.description} />
              <View style={styles.date}>
                <FontAwesome name="calendar-o" size={18} />
                <View style={{ marginHorizontal: WIDTH_DEVICE / 30 }}>
                  <Text style={styles.dateText}>{formatDate(data.date)}</Text>
                  <Text style={styles.timeText}>{formatTime(data.date)}</Text>
                </View>
              </View>
              <View style={styles.place}>
                <Foundation name="marker" size={22} />
                <Text style={styles.adressText}>{data.address}</Text>
              </View>
              <View style={styles.person}>
                <Ionicons name="people-outline" size={24} />
                <Text style={styles.peopleText}>
                  22
                  <Text style={styles.description}> of your friends are going</Text>
                </Text>
              </View>
              <Text>Who's going?</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: WIDTH_DEVICE,
    height: SIZE * 20,
  },
  eventImage: {
    height: SIZE * 20,
    width: WIDTH_DEVICE / 1,
    alignItems: 'center',
    position: 'absolute',
  },
  eventTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: SIZES.xl,
    marginTop: SIZE,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
    marginTop: SIZE,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZE,
  },

  dateText: {
    fontFamily: 'InterMedium',
    fontSize: SIZES.sm,
  },
  timeText: {
    fontFamily: 'InterRegular',
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
  adressText: {
    marginLeft: SIZE,
    fontFamily: 'InterMedium',
    fontSize: SIZES.sm,
  },
  place: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZE,
    marginLeft: SIZE / 6,
  },
  peopleText: {
    marginLeft: WIDTH_DEVICE / 50,
    fontFamily: 'InterMedium',
    fontSize: SIZES.sm,
  },
  person: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HEIGHT_DEVICE / 70,
  },
  arrowStyle: {
    marginHorizontal: WIDTH_DEVICE / 40,
    marginTop: HEIGHT_DEVICE / 100,
  },
  other: {
    fontFamily: 'InterRegular',
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
});
