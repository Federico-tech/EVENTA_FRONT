import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { HEIGHT_DEVICE, SIZES, COLORS, SIZE, FONTS } from '../../../../utils/theme';

export const DataPicker = ({ label, Data, Time }) => {
  const [dataPicker, setDataPicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [date, setDate] = useState(DateTime.local());
  const [time, setTime] = useState(DateTime.local());

  const formattedDate = date.toFormat('ccc dd LLL yyyy');
  const formattedTime = time.toFormat('HH:mm');

  const onDateSelected = (event, selectedDate) => {
    setDate(DateTime.fromJSDate(selectedDate));
    setDataPicker(false);
  };

  const onTimeSelected = (event, selectedTime) => {
    setTime(DateTime.fromJSDate(selectedTime));
    setTimePicker(false);
  };

  return (
    <View>
      <Text style={styles.emailText}>{label}</Text>
      {Data && (
        <TouchableOpacity style={styles.wrapper} onPress={() => setDataPicker(true)}>
          {dataPicker && <DateTimePicker value={date.toJSDate()} onChange={onDateSelected} mode="date" display="none" />}
          {!dataPicker && <Text>{formattedDate}</Text>}
        </TouchableOpacity>
      )}
      {Time && (
        <TouchableOpacity style={styles.wrapper} onPress={() => setTimePicker(true)}>
          {timePicker && <DateTimePicker value={date.toJSDate()} onChange={onTimeSelected} mode="time" display="none" />}
          {!timePicker && <Text>{formattedTime}</Text>}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
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
});
