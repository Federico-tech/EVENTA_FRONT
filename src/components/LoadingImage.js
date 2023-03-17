import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../utils/theme';

export const LoadingImage = ({ source, style, indicator, profile, width }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };
  return (
    <View style={profile && styles.profile}>
      {isLoading && (
        <>
          <View style={[profile ? styles.imageProfileView : styles.imageView, { width }]}>{indicator && <ActivityIndicator color="black" />}</View>
        </>
      )}
      <Image source={{ uri: source }} style={style} onLoadStart={handleLoadStart} onLoadEnd={handleLoadEnd} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    backgroundColor: COLORS.backGray,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    borderRadius: SIZES.xxs,
  },
  imageProfileView: {
    backgroundColor: COLORS.backGray,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    aspectRatio: 1,
    borderRadius: 100,
  },
});