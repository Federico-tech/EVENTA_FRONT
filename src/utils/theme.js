import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const WIDTH_DEVICE = width;
export const HEIGHT_DEVICE = height;

export const COLORS = {
  primary: '#00A1FF',
  white: '#fff',
  backGray: '#F2F2F2',
  gray: '#A1A1A1',
  lightGray: '#CCCBCB',
  darkGray: '#7A7A7A',
  gradient1: '#00D1FF',
  gradient2: '#00A1FF',
  error: 'red',
  gradient: ['#32DAE4', '#00A1FF'],
};

export const FONTS = {
  bold: 'InterBold',
  extraBold: 'InterExtraBold',
  light: 'InterLight',
  medium: 'InterMedium',
  regular: 'InterRegular',
  semiBold: 'InterSemiBold',
};

export const SIZE = 14;

export const SIZES = {
  xxs: 8,
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
};

export const SHADOWS = {
  light: {
    Color: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3.5,
    },
    shadowOpacity: 0.02,
    shadowRadius: 1,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.darkGray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};

export const TAB_BAR_STYLE = {
  height: HEIGHT_DEVICE / 22,
};

export const TAB_BAR_HEIGHT = HEIGHT_DEVICE / 22;
