import { Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import {HEIGHT_DEVICE, SIZES, COLORS, WIDTH_DEVICE, SIZE, FONTS} from '../utils/constants/Theme'

export const InputText = ({value, setValue, label, ...rest}) => {
  return (
    <>
      <Text style={styles.emailText}>{label}</Text>
      <TextInput  style={styles.textInput} value={value} onChangeText={setValue} {...rest}/>
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: HEIGHT_DEVICE / 16,
    marginTop: HEIGHT_DEVICE / 100,
    borderRadius: SIZES.xs,
    borderWidth: 0.5,
    borderColor: COLORS.lightGray,
    paddingHorizontal: SIZE
  },

  emailText: {
    marginTop: HEIGHT_DEVICE / 100,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.darkGray
  },
})
