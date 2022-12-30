import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { RotationGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';

import { HEIGHT_DEVICE, SIZES, COLORS, SIZE, FONTS, WIDTH_DEVICE } from '../utils/constants/Theme';

export const InputText = ({ value, setValue, label, containerStyle, hide, maxLength, ...rest }) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const secureEntry = () => {
    setIsSecureEntry((prev) => !prev);
  };

  return (
    <>
      <Text style={styles.emailText}>{label}</Text>
      <View style={[styles.conatiner, containerStyle]}>
        <TextInput style={[styles.textInput]} value={value} onChangeText={setValue} secureTextEntry={hide && isSecureEntry} maxLength={maxLength} {...rest} />
        {hide && (
          <TouchableOpacity onPress={secureEntry} style={styles.eyeIcon}>
            <Ionicons name={isSecureEntry ? 'eye-off-outline' : 'eye-outline'} size={16} />
          </TouchableOpacity>
        )}
       {maxLength && (
          <Text style={styles.lenght}> {value.length} / {maxLength}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: HEIGHT_DEVICE / 10,
    width: WIDTH_DEVICE / 1.25,
  },
  conatiner: {
    height: HEIGHT_DEVICE / 16,
    marginTop: HEIGHT_DEVICE / 100,
    borderRadius: SIZES.xs,
    borderWidth: 0.5,
    borderColor: COLORS.lightGray,
    paddingHorizontal: SIZE,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: WIDTH_DEVICE / 50,

  },
  emailText: {
    marginTop: HEIGHT_DEVICE / 100,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
  },
  eyeIcon: {
    alignSelf: 'flex-end',
  },
  lenght: {
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    fontSize: SIZES.xs,
    alignSelf: 'flex-end',
    marginBottom: HEIGHT_DEVICE / 150,
    padding: 0
  }
});
