import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { HEIGHT_DEVICE, SIZES, COLORS, SIZE, FONTS } from '../utils/constants/Theme';

export const InputText = ({ value, setValue, label, containerStyle, hide, ...rest }) => {
  const [isSecureEntry, setIsSecureEntry] = useState(isSecureEntry);

  const secureEntry = () => {
    setIsSecureEntry((prev) => !prev);
  };

  return (
    <>
      <Text style={styles.emailText}>{label}</Text>
      <View style={[styles.conatiner, containerStyle]}>
        <TextInput style={[styles.textInput]} value={value} onChangeText={setValue} secureTextEntry={isSecureEntry} {...rest} />
        {hide && (
          <TouchableOpacity onPress={secureEntry} style={styles.eyeIcon}>
            <Ionicons name={isSecureEntry ? 'eye-off-outline' : 'eye-outline'} size={16} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
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
});
