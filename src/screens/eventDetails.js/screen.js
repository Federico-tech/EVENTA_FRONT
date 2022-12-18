import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Line, OrganiserInf } from '../../components';
import { COLORS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../utils/constants/Theme';

export const EventDetails = ({ route }) => {
  const { data } = route.params

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <View style={styles.imageContainer}>
          <Image source={data.image} style={styles.eventImage} resizeMode='contain'/>
        </View>
      <OrganiserInf data={data} />
      <Line style={styles.line}/>
      <View style={{marginHorizontal: WIDTH_DEVICE / 20}}>  
        <Text style={styles.eventTitle}>{data.name}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <View style={styles.date}>
          <FontAwesome name='calendar-o' size={18}/>
          <View style={{marginHorizontal: WIDTH_DEVICE / 30}}>
            <Text style={styles.dateText}>{data.date}</Text>
            <Text style={styles.timeText}>{data.time}</Text>
          </View>
        </View>
        <View style={styles.place}>
          <Foundation name='marker' size={22}/>
          <Text style={styles.adressText}>{data.adress}</Text>
        </View>
        <View style={styles.person}>
          <Ionicons name='people-outline' size={24}/>
          <Text style={styles.peopleText}>{data.nPerson}<Text style={styles.description}> of your friends are going</Text></Text> 
        </View>
        <Text>Who's going?</Text>
      </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: WIDTH_DEVICE,
    height: HEIGHT_DEVICE / 3.3
  }, 

  eventImage: {
    height: HEIGHT_DEVICE / 3.3, 
    width: WIDTH_DEVICE / 1, 
    alignItems: 'center', 
    position: 'absolute'
  }, 

  eventTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: SIZES.xl, 
    marginTop: HEIGHT_DEVICE / 60
  }, 

  description: {
    fontFamily: 'InterRegular',
    fontSize: SIZES.sm,
    marginTop: HEIGHT_DEVICE / 80
  },

  date: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: HEIGHT_DEVICE / 80
  },

  dateText: {
    fontFamily: 'InterMedium',
    fontSize: SIZES.sm
  },
  
  timeText: {
    fontFamily: 'InterRegular',
    fontSize: SIZES.xs,
    color: COLORS.gray
  }, 

  adressText: {
    marginLeft: WIDTH_DEVICE / 25, 
    fontFamily: 'InterMedium',
    fontSize: SIZES.sm
  }, 

  place: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: HEIGHT_DEVICE / 70, 
    marginLeft: WIDTH_DEVICE / 160
  }, 

  peopleText: {
    marginLeft: WIDTH_DEVICE / 50, 
    fontFamily: 'InterMedium',
    fontSize: SIZES.sm
  }, 

  person: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: HEIGHT_DEVICE / 70
  }

})

