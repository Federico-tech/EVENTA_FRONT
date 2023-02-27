import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileHeader, Row, Text } from '../../../components';
import { MapBottomSheet } from '../../../components/MapBottomSheet';
import { refreshSelectedUser } from '../../../services/users';
import { selectCurrentUser, setUserSelected } from '../../../store/user';
import { ROLES } from '../../../utils/conts';
import { useInfiniteScroll } from '../../../utils/hooks';
import mapStyle from '../../../utils/mapStyle.json';
import { COLORS, SIZE } from '../../../utils/theme';

export const MapScreen = () => {
  const dispatch = useDispatch();
  const { data } = useInfiniteScroll({
    entity: 'users',
    filters: {
      role: ROLES.ORGANISER,
    },
  });
  const user = useSelector(selectCurrentUser);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '95%'], []);

  const handlePresentModal = ({ user }) => {
    bottomSheetModalRef.current?.present();
    refreshSelectedUser(user)
    dispatch(setUserSelected(user))
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: '100%', height: '100%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: user.position.coordinates[1],
          longitude: user.position.coordinates[0],
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        customMapStyle={mapStyle}>
        {data.map((user) => (
          <Marker
            key={user._id}
            coordinate={{
              latitude: user.position.coordinates[1],
              longitude: user.position.coordinates[0],
            }}
            onPress={() => handlePresentModal({user})}>
            <View style={{ alignItems: 'center', height: SIZE * 8}}>

              <View style={styles.marker}>
              <Image source={{ uri: user.profilePic }} style={styles.profileImage} />
              </View>
              <Row alignCenter justifyCenter style={{marginTop: SIZE}}>
                <Text medium >{user.name}</Text>
              </Row>
            </View>
          </Marker>
        ))}
      </MapView>
      <View>
        <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
          <MapBottomSheet />
        </BottomSheetModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: SIZE * 4.5,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: SIZE / 5,
    borderColor: COLORS.white,
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE * 4.5,
    height: SIZE * 4.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: COLORS.white,
    transform: [{ rotateZ: '45deg' }]
  }
});
