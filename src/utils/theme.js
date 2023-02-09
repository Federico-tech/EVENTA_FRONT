import { Appearance, Dimensions } from 'react-native';

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

export const SIZE = WIDTH_DEVICE / 30;

export const SIZES = {
  xxs: SIZE * 0.9,
  xs: SIZE,
  sm: SIZE * 1.1,
  md: SIZE * 1.25,
  lg: SIZE * 1.4,
  xl: SIZE * 1.7,
};

export const SHADOWS = {
  light: {
    Color: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 1,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 2,
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

export function useTheme() {
  const appearance = Appearance.getColorScheme();
  let colors = {
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

  if (appearance === 'dark') {
    colors = {
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
  }

  return {
    colors,
    standardSize: SIZE,
  };
}
