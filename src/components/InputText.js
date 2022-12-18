import { Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import { HEIGHT_DEVICE, SIZES, COLORS, WIDTH_DEVICE } from '../utils/constants/Theme'

export const InputText = ({value, setValue, label}) => {
  return (
    <>
      <Text style={styles.emailText}>{label}</Text>
      <TextInput style={styles.textInput} value={value} onChangeText={setValue}/>
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: HEIGHT_DEVICE / 16,
    marginTop: HEIGHT_DEVICE / 100,
    borderRadius: SIZES.md,
    borderWidth: 0.5,
    borderColor: COLORS.lightGray,
    paddingHorizontal: WIDTH_DEVICE / 20,
  },

  emailText: {
    marginTop: HEIGHT_DEVICE / 100,
    fontFamily: 'InterSemiBold',
    fontSize: SIZES.sm,
    color: COLORS.darkGray
  },
})