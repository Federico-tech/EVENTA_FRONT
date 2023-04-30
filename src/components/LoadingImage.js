import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

import { COLORS, SIZE, SIZES } from '../utils/theme';

export const LoadingImage = ({ source, event, indicator, profile, width, blurRadius, iconSIZE, imageStyle, viewStyle, resizeMode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };
  return (
    <View>
      {isLoading && (
        <View style={[profile && styles.loadingProfileImage, event && styles.loadingEventImage, viewStyle, { width, position: 'absolute', zIndex: 1 }]}>
          {indicator && <ActivityIndicator color="black" style={{ zIndex: 2, alignItems: 'center'}}/>}
        </View>
      )}
      {profile && !source ? (
        <View style={[profile && styles.loadingProfileImage, viewStyle, { width }, imageStyle]}>
          <Ionicons name="person" size={iconSIZE} color={COLORS.lightGray} style={{ marginBottom: SIZE / 4 }} />
        </View>
      ) : (
        <View style={viewStyle}>
          <Image
            source={{ uri: source }}
            style={[profile && styles.profileImage, event && styles.eventImage, { width }, imageStyle]}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            blurRadius={blurRadius}
            resizeMode={resizeMode}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  eventImage: {
    backgroundColor: COLORS.backGray,
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
  },
  profileImage: {
    width: SIZE * 2,
    aspectRatio: 1,
    borderRadius: 100,
  },
  loadingEventImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
    backgroundColor: COLORS.backGray,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  loadingProfileImage: {
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.backGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
