import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, TextInput, TouchableOpacity, View, Switch } from 'react-native';

import { Normalize } from '../utils';
import { IS_ANDROID, IS_IOS } from '../utils/conts';
import { DATE_FORMAT } from '../utils/dates';
import { COLORS, HEIGHT_DEVICE, SIZE, WIDTH_DEVICE } from '../utils/theme';
import { Row } from './Row';
import { Text } from './Text';

export const INPUT_WIDTH = WIDTH_DEVICE * 0.9;
export const INPUT_HEIGHT = HEIGHT_DEVICE / 16;

export const InputText = ({
  email,
  number,
  onPress,
  date,
  datePickerMode = 'date' || 'time',
  label,
  disabled,
  onLayout,
  containerStyle,
  secureTextEntry,
  dateFormat = DATE_FORMAT,
  maxDate,
  minDate,
  value: inputValue,
  keyboardType: inputKeyboardType = undefined,
  pointerEvents: inputPointerEvents = undefined,
  onChangeText: inputOnChangeText,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDate, setShowDate] = useState(IS_IOS);
  const isPasswordSecure = secureTextEntry && !showPassword;
  const showIosDateInput = date && IS_IOS;

  const { maxLength, multiline } = rest;
  let keyboardType = inputKeyboardType;
  let pointerEvents = inputPointerEvents;
  const value = inputValue;
  const onChangeText = inputOnChangeText;

  if (email) {
    keyboardType = 'email-address';
  }
  if (number) {
    keyboardType = 'numeric';
  }
  if (onPress || date) {
    pointerEvents = 'none';
  }

  const onPressPressable = useCallback(() => {
    if (date) {
      setShowDate(true);
    }
    if (onPress) {
      onPress();
    }
  }, [date, onPress, setShowDate]);

  console.debug({ value });

  return (
    <Pressable onPress={onPressPressable}>
      {showIosDateInput && (
        <View style={styles.inputDateIos}>
          <Row justifyContent="center" alignItems="center" flex={0}>
            <View style={{ padding: 5, backgroundColor: datePickerMode === 'date' ? 'red' : 'blue', borderRadius: 4 }}>
              <Entypo name={datePickerMode === 'date' ? 'calendar' : 'clock'} size={20} color="white" />
            </View>
            <View style={{ paddingHorizontal: SIZE }}>
              <Text>{label}</Text>
              <Text>{DateTime.fromJSDate(value).toFormat(dateFormat)}</Text>
            </View>
          </Row>
          <Switch value={showDate} onChange={() => setShowDate(!showDate)} />
        </View>
      )}
      {date && (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {showDate && (
            <DateTimePicker
              value={value || new Date()}
              maximumDate={maxDate}
              minimumDate={minDate}
              display="inline"
              mode={datePickerMode}
              onChange={(v) => {
                IS_ANDROID && setShowDate(false);
                console.log({ v });
                if (v.type === 'set') {
                  onChangeText(DateTime.fromMillis(v.nativeEvent.timestamp).toJSDate());
                }
              }}
            />
          )}
        </View>
      )}
      {!showIosDateInput && (
        <View style={[styles.container, containerStyle]} onLayout={onLayout}>
          {!!label && <Text style={[styles.label]}>{label}</Text>}
          <View>
            <View pointerEvents={pointerEvents}>
              <TextInput
                allowFontScaling={false}
                style={[styles.textInput, multiline && styles.multiline]}
                keyboardType={keyboardType ? keyboardType : 'default'}
                secureTextEntry={isPasswordSecure}
                value={date ? DateTime.fromJSDate(value).toFormat('dd/MM/yyyy') : value}
                editable={!disabled}
                underlineColorAndroid="transparent"
                onChangeText={onChangeText}
                autoCorrect={!email}
                numberOfLines={multiline ? 5 : undefined}
                spellCheck={!email}
                {...rest}
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
          {/*<View style={[styles.textUnder, textUnderStyle]}>{!!error && !hideErrorText && <Text style={[styles.errorStyle, errorStyle]}>{t(error)}</Text>}</View>*/}
        </View>
      )}
    </Pressable>
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
    width: INPUT_WIDTH,
    marginTop: SIZE,
  },
  label: {
    paddingLeft: SIZE,
  },
  errorStyle: {
    paddingTop: 2,
    width: WIDTH_DEVICE * 0.7,
  },
  iconsRight: {
    flex: 0,
    flexDirection: 'column',
    position: 'absolute',
    height: INPUT_HEIGHT,
    marginTop: SIZE / 3,
    // backgroundColor: 'red',
    right: 0,
    top: 0,
  },
  multiline: {
    height: INPUT_HEIGHT * 2.5,
    paddingTop: SIZE,
  },
  icon: {
    height: Normalize(45),
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
    marginTop: SIZE / 3,
    borderRadius: SIZE,
    borderWidth: 0.5,
    borderColor: COLORS.lightGray,
    paddingHorizontal: SIZE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textUnder: {
    minHeight: Normalize(10),
  },
});
