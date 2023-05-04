import { Octicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { report } from '../services/reports';
import { selectCurrentUserId, selectSelectedUserId } from '../store/user';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { AlertModal } from './AlertModal';
import { IconButton } from './Button';
import { Row } from './Row';

export const ProfileHeader = ({ myProfile, user, disableGoBack }) => {
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const currentUserId = useSelector(selectCurrentUserId);
  const selectedUserId = useSelector(selectSelectedUserId);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleClosePress = () => bottomSheetModalRef.current.close();

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

  const dataReport = { type: 'user', userId: currentUserId, objectId: selectedUserId };

  const onPressReportUser = (data) => {
    report(data);
    handleClosePress();
    setReportModalVisible(false);
    showMessage({
      message: 'User reported Succefully',
      description: 'Thank you for reporting this user.',
      type: 'success',
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={[{ width: '100%', position: 'absolute', alignItems: 'center' }, myProfile && { alignItems: 'flex-start' }]}>
            <Text style={styles.usernameText}>{user.username}</Text>
          </View>
          {!myProfile ? (
            <TouchableOpacity onPress={() => navigation.goBack()} disabled={disableGoBack}>
               <IconButton name="chevron-back" color="black" size={SIZE * 2}  iconStyle={{ marginLeft: -SIZE / 2 }} />
            </TouchableOpacity>
          
          ) : (
            <View style={{ width: SIZE }} />
          )}
          {myProfile ? (
            <IconButton name="settings-sharp" color="black" size={SIZE * 1.5} onPress={() => navigation.navigate('SettingScreen')} />
          ) : currentUserId !== selectedUserId ? (
            <IconButton name="ios-ellipsis-horizontal" color="black" size={SIZE * 1.75} onPress={handlePresentModal} />
          ) : (
            <View style={{ width: SIZE * 1.5 }} />
          )}
        </View>
        <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={['13%']} backdropComponent={renderBackdrop}>
          <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
            <TouchableOpacity onPress={() => setReportModalVisible(true)}>
              <Row row alignCenter style={{ marginTop: SIZE }}>
                <Octicons name="report" size={SIZE * 1.8} color="red" />
                <Text style={{ marginLeft: SIZE, fontFamily: FONTS.regular, fontSize: SIZES.sm, color: 'red' }}>Report</Text>
              </Row>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
        <AlertModal
          isVisible={isReportModalVisible}
          onBackdropPress={() => setReportModalVisible(false)}
          title="Report this event?"
          descritpion="Thank you for reporting this event. Our team will review the event and take appropriate action as necessary."
          confirmText="Report"
          onPressConfirm={() => onPressReportUser(dataReport)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: SIZE * 2.5,
    backgroundColor: COLORS.white,
    zIndex: -1,
  },
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE / 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    flex: 1,
    height: SIZE * 3.4,
  },
  usernameText: {
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.md,
  },
  name: {
    paddingLeft: SIZE * 10,
    paddingTop: SIZE,
  },
});
