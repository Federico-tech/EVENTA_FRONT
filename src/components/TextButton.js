import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';

import { COLORS, FONTS, SIZES } from '../utils/theme';

export const TextButton = ({ onPress, text, textStyle, loading, lenght, disabled, ...rest }) => {
  return (
    <View>
      {loading ? (
        <ActivityIndicator color="black" style={{ alignSelf: 'center' }} />
      ) : (
        <TouchableOpacity onPress={onPress} disabled={!onPress || disabled}>
          <Text style={[styles.text, disabled && styles.disabled, textStyle]} {...rest}>
            {text}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const ReadMoreButton = (props, textStyle) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hanldlePress = () => {
    setIsExpanded(!isExpanded);
  };

  let text = (props.text || props.children)?.trim();
  const shouldShowMoreLess = text?.length > props?.subString;

  if (!isExpanded && shouldShowMoreLess) {
    text = `${text?.substring(0, props?.subString)}...`;
  }

  return (
    <TouchableOpacity onPress={hanldlePress}>
      <Text style={props.style}>
        {text}
        {shouldShowMoreLess && !isExpanded && <Text style={[styles.text, { color: COLORS.gray }]}> More</Text>}
        {shouldShowMoreLess && isExpanded && <Text style={[styles.text, { color: COLORS.gray }]}> Less</Text>}
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
  disabled: {
    color: COLORS.gray,
  },
});
