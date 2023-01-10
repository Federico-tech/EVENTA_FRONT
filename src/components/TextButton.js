import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { COLORS, FONTS, HEIGHT_DEVICE, SIZES } from '../utils/theme';

export const TextButton = ({ onPress, text, textStyle, loading, ...rest }) => {
  return loading ? (
    <ActivityIndicator color="black" style={{ marginTop: HEIGHT_DEVICE / 30 }} />
  ) : (
    <TouchableOpacity onPress={onPress} disable={!onPress}>
      <Text style={[styles.text, textStyle]} {...rest}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const ReadMoreButton = (props, textStyle) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hanldlePress = () => {
    setIsExpanded(!isExpanded);
  };

  let text = props.text || props.children;
  if (!isExpanded) {
    text = `${text.substring(0, 70)}...`;
  }

  return (
    <TouchableOpacity onPress={hanldlePress}>
      <Text style={props.style}>
        {text}
        {!isExpanded && <Text style={[styles.text, { color: COLORS.gray }]}> Read More</Text>}
        {isExpanded && <Text style={[styles.text, { color: COLORS.gray }]}> Read Less</Text>}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.primary,
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
  },
});
