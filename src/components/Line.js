import { View, Text } from 'react-native'
import React from 'react'
import { HEIGHT_DEVICE, WIDTH_DEVICE, COLORS } from '../utils/constants/Theme'

export const LineLogin = () => {
  return (
    <View style={{ 
      flex: 1,
      height: HEIGHT_DEVICE / 1500, 
      backgroundColor: COLORS.lightGray 
    }}>
    </View>
  )
}

export const Line = () => {
  return (
    <View style={{ 
      height: HEIGHT_DEVICE / 1500, 
      backgroundColor: COLORS.lightGray 
    }}>
    </View>
  )
}

