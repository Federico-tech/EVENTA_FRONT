import { View, StyleSheet, Text, Image } from 'react-native'
import React from 'react'
import { COLORS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../utils/constants/Theme'
import { FollowButton } from './Buttons'
  

export const OrganiserInf = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <Image source={data.organiser.profileImage} style={styles.image} resizeMode='contain'/>
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{data.organiser.name}</Text>
          <View style={{width: WIDTH_DEVICE / 4}}>
            <Text style={styles.textAdress}>{data.organiser.adress}</Text>
          </View>
        </View>
      </View>
      <FollowButton />
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
      width: WIDTH_DEVICE / 6, 
      height: HEIGHT_DEVICE / 11,
    }, 
    container: { 
      height: HEIGHT_DEVICE / 13, 
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginHorizontal: WIDTH_DEVICE / 30, 
      marginVertical: HEIGHT_DEVICE / 70,
    }, 

    textContainer: {
      flexDirection: 'column',
      marginLeft: WIDTH_DEVICE / 30,

    }, 

    FollowButton: {
      alignContent: 'center'
    }, 

    informationContainer: {
      flexDirection: 'row', 
      alignItems: 'center'
    }, 

    textName: {
      fontFamily: 'InterMedium', 
      fontSize: SIZES.lg
    },
     
    textAdress: {
      fontFamily: 'InterRegular',
      fontSize: SIZES.xs, 
      color: COLORS.gray
    }


})
