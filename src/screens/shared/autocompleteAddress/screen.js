import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Container, Text } from '../../../components';
import { COLORS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../../../utils/theme';

export const AddressAutocompleteScreen = ({ route, navigation }) => {
  const { title, backScreenName } = route.params;

  const findAddress = (address_components, type) => {
    return _.find(address_components, (a) => a.types.includes(type)).long_name;
  };

  const onPress = (data, details) => {
    if (!details?.geometry) {
      return;
    }
    const { geometry, formatted_address } = details;
    const city = findAddress(details.address_components, 'political');
    console.log({ details, city });
    const addressInfo = {
      lat: geometry.location.lat,
      lng: geometry.location.lng,
      formatted_address,
      city,
    };
    navigation.navigate({
      name: backScreenName,
      params: { addressInfo },
      merge: true,
    });
  };

  return (
    <Container>
      <View style={[styles.container]}>
        {!!title && (
          <View style={styles.titleRow}>
            <Text medium>{title}</Text>
          </View>
        )}
        <GooglePlacesAutocomplete
          styles={{
            container: {
              width: WIDTH_DEVICE * 0.9,
              
            },
            row: {
              backgroundColor: COLORS.darkGray,
              
            },
            listView: {
              borderRadius: SIZES.xs
            },
            separator: {
              height: 0.5,
              backgroundColor: COLORS.gray,
            },
            description: {
              color: 'white'
            }
            
           
          }}
          listUnderlayColor='red'
          listHoverColor= 'red'
          enablePoweredByContainer={false}
          placeholder="Search"
          numberOfLines={10}
          nearbyPlacesAPI="GooglePlacesSearch"
          textInputProps={{
            placeholderTextColor: COLORS.gray,
            borderRadius: SIZES.xs,
            borderColor: COLORS.lightGray,
            height: HEIGHT_DEVICE / 17,
            cursorColor: 'black',
            backgroundColor: COLORS.darkGray,
            color: 'white',
           
          }}
          fetchDetails
       
          onPress={onPress}
          onFail={(error) => console.debug(error)}
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
