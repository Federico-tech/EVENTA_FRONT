import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

import { COLORS, SIZE, SIZES } from '../utils/theme';

export const LoadingImage = ({ source, event, indicator, profile, width, blurRadius, iconSIZE, imageStyle, viewStyle }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };
  return (
    
    <View>
      {isLoading && 
        <View style={[profile && styles.loadingProfileImage, event && styles.loadingEventImage, viewStyle, { width, position: 'absolute' }]}>
        {indicator && <ActivityIndicator color="black" />}
      </View>}
      {(profile && !source) ? 
        <View style={[profile && styles.loadingProfileImage, viewStyle, { width }, imageStyle]}>
          <Ionicons name="person" size={iconSIZE} color={COLORS.lightGray} style={{ marginBottom: SIZE / 4 }} />
        </View>
       : 
         <View style={viewStyle}>
          <Image
            source={{ uri: source }}
            style={[profile && styles.profileImage, event && styles.eventImage, { width }, imageStyle]}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            blurRadius={blurRadius}
          />
          </View>
        }
        
    </View>
  ) 
}
const styles = StyleSheet.create({
  eventImage: {},
  profileImage: {
    width: SIZE * 2,
    aspectRatio: 1,
    borderRadius: 100,
  },
  loadingEventImage: {},
  loadingProfileImage: {
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.backGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
