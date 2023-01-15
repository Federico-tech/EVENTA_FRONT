import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Container, Text } from '../../../components';
import { ROUTES } from '../../../navigation/Navigation';
import { COLORS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';

export const AddressAutocompleteScreen = ({ route, navigation }) => {
  const { title } = route.params;

  const onPress = (data, details) => {
    if (!details?.geometry) {
      return;
    }
    const { geometry, formatted_address } = details;
    const addressInfo = {
      lat: geometry.location.lat,
      lng: geometry.location.lng,
      formatted_address,
    };
    navigation.navigate({
      name: ROUTES.CreateEventScreen,
      params: { addressInfo },
      merge: true,
    });
  };

  return (
    <Container>
      <View style={[styles.container]}>
        {!!title && (
          <View style={styles.titleRow}>
            <Text>{title}</Text>
          </View>
        )}
        <GooglePlacesAutocomplete
          styles={{
            container: {
              width: WIDTH_DEVICE * 0.9,
            },
          }}
          enablePoweredByContainer={false}
          listUnderlayColor="transparent"
          placeholder="Indirizzo"
          numberOfLines={10}
          nearbyPlacesAPI="GooglePlacesSearch"
          textInputProps={{
            placeholderTextColor: COLORS.white,
            borderWidth: 0.5,
            borderRadius: SIZES.xs,
            borderColor: COLORS.lightGray,
            height: HEIGHT_DEVICE / 17,
          }}
          fetchDetails
          onPress={onPress}
          query={{
            key: 'AIzaSyBPn2Qae8E0o1wVEi8pOyUVsz87eGfFQGQ',
            language: 'it',
          }}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZE * 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleRow: {
    marginVertical: SIZE / 2,
  },
});
