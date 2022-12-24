import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Line } from './Line'
import { HEIGHT_DEVICE } from '../utils/constants/Theme'

export const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text>Header</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red', 
    height: HEIGHT_DEVICE / 10
  }
})


