import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Normalize } from '../utils';
import { DATE_FORMAT } from '../utils/dates';
import { COLORS, HEIGHT_DEVICE, SIZE, WIDTH_DEVICE, SIZES, FONTS } from '../utils/theme';
import { Text } from './Text';

export const INPUT_WIDTH = WIDTH_DEVICE * 0.9;
export const INPUT_HEIGHT = HEIGHT_DEVICE / 16;

export const InputText = ({
  email,
  number,
  onPress,
  label,
  disabled,
  onLayout,
  containerStyle,
  secureTextEntry,
  dateFormat = DATE_FORMAT,
  maxDate,
  minDate,
  maxLength,
  formik,
  numberOfLines,
  noAutoCorrect,
  formikName,
  touchableOpacity,
  value: inputValue,
  error: inputError,
  usernameError,
  keyboardType: inputKeyboardType = undefined,
  pointerEvents: inputPointerEvents = undefined,
  onChangeText: inputOnChangeText,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordSecure = secureTextEntry && !showPassword;

  const { multiline } = rest;
  let keyboardType = inputKeyboardType;
  let pointerEvents = inputPointerEvents;
  let value = inputValue;
  let error = inputError;
  let onChangeText = inputOnChangeText;

  if (formik) {
    // console.log({formikValues});
    value = formik?.values[formikName] || '';
    error = formik?.errors[formikName] || '';
    onChangeText = (newValue) => formik.onChangeText(formikName, newValue);
  }

  console.log('error', error);

  if (email) {
    keyboardType = 'email-address';
  }
  if (number) {
    keyboardType = 'numeric';
  }
  if (onPress) {
    pointerEvents = 'none';
  }

  const onPressPressable = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  console.debug({ value });

  const Component = onPress ? (touchableOpacity ? TouchableOpacity : Pressable) : View;

  return (
    <Component onPress={onPressPressable}>
      <View style={[styles.container, containerStyle]} onLayout={onLayout}>
        {!!label && <Text style={[styles.label]}>{label}</Text>}
        <View>
          <View pointerEvents={pointerEvents}>
            <TextInput
              allowFontScaling={false}
              style={[styles.textInput, multiline && styles.multiline]}
              keyboardType={keyboardType ? keyboardType : 'default'}
              secureTextEntry={isPasswordSecure}
              value={value}
              editable={!disabled}
              underlineColorAndroid="transparent"
              onChangeText={onChangeText}
              autoCorrect={!email || noAutoCorrect}
              numberOfLines={multiline ? 5 : undefined}
              spellCheck={!email}
              {...rest}
              maxLength={maxLength}
              placeholder={label}
            />
          </View>
          <View style={styles.iconsRight}>
            {secureTextEntry && (
              <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} style={styles.icon}>
                <Ionicons name={isPasswordSecure ? 'eye-off-outline' : 'eye-outline'} size={16} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={[styles.textUnder]}>
          {(!!error || usernameError) && <Text style={[styles.errorStyle]}>{usernameError ? usernameError : error}</Text>}
        </View>
      </View>
    </Component>
  );
};

const styles = StyleSheet.create({
  inputDateIos: {
    marginTop: SIZE * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    borderRadius: SIZES.xxs,
  },
  label: {
    marginTop: HEIGHT_DEVICE / 150,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.xs,
    color: COLORS.darkGray,
  },
  errorStyle: {
    paddingTop: 2,
    width: WIDTH_DEVICE * 0.9,
    color: COLORS.error,
    fontSize: SIZES.xs,
  },
  iconsRight: {
    flex: 0,
    flexDirection: 'column',
    position: 'absolute',
    height: INPUT_HEIGHT,
    marginTop: SIZE / 3,
    right: 0,
    top: 0,
  },
  multiline: {
    height: INPUT_HEIGHT * 2.5,
    paddingTop: SIZE,
    textAlignVertical: 'top',
  },
  icon: {
    height: Normalize(50),
    padding: Normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginHorizontal: 5,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    borderColor: COLORS.error,
    borderWidth: 1,
  },
  textInput: {
    height: INPUT_HEIGHT,
    marginTop: HEIGHT_DEVICE / 100,
    borderRadius: SIZES.xs,
    borderWidth: 0.5,
    borderColor: COLORS.lightGray,
    paddingHorizontal: SIZE,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: SIZES.sm,
  },
  textUnder: {
    minHeight: Normalize(5),
  },
});
