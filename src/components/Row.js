import React from 'react';
import { Pressable, StyleSheet, View, TouchableOpacity } from 'react-native';

export const Row = ({
  children,
  style,
  alignStart,
  flex,
  alignCenter,
  spaceBetween,
  width,
  justifyCenter,
  spaceAround,
  justifyStart,
  alignEnd,
  justifyEnd,
  onPress,
  backgroundColor,
  maxWidth,
  touchableOpacity,
  ...rest
}) => {
  const Component = onPress ? (touchableOpacity ? TouchableOpacity : Pressable) : View;
  return (
    <Component
      style={[
        styles.row,
        style,
        alignCenter && { alignItems: 'center' },
        alignStart && { alignItems: 'flex-start' },
        alignEnd && { alignItems: 'flex-end' },
        justifyCenter && { justifyContent: 'center' },
        justifyStart && { justifyContent: 'flex-start' },
        justifyEnd && { justifyContent: 'flex-end' },
        spaceBetween && { justifyContent: 'space-between' },
        spaceAround && { justifyContent: 'space-around' },
        { width },
        { flex },
      ]}
      collapsable={false}
      onPress={onPress}
      {...rest}>
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});
