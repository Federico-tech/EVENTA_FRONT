import React from 'react';
import { View } from 'react-native';

import { COLORS, HEIGHT_DEVICE } from '../utils/constants/Theme';

export const Line = () => {
  return (
    <View
      style={{
        flex: 1,
        height: HEIGHT_DEVICE / 1500,
        backgroundColor: COLORS.lightGray,
      }}
    />
  );
};
