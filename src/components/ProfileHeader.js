import { Entypo, Octicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Unblock, block } from '../services/block';
import { unFollow, unFollowBlocked } from '../services/follow';
import { report } from '../services/reports';
import { refreshSelectedUser } from '../services/users';
import { selectCurrentUserId, selectSelectedUser, selectSelectedUserId } from '../store/user';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { AlertModal } from './AlertModal';
import { IconButton } from './Button';
import { Row } from './Row';

export const ProfileHeader = ({ myProfile, user, disableGoBack }) => {
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [isBlockModalVisible, setBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setUnblockModalVisible] = useState(false);
  const currentUserId = useSelector(selectCurrentUserId);
  const selectedUserId = useSelector(selectSelectedUserId);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const userSelected = useSelector(selectSelectedUser);

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
  const dataBlock = { blockerId: currentUserId, blockedId: selectedUserId };

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

  const onPressBlockUser = (data) => {
    block(data);
    handleClosePress();
    setBlockModalVisible(false);
    unFollow();
    unFollowBlocked();
    showMessage({
      message: 'User blocked Succefully',
      type: 'success',
    });
    refreshSelectedUser(user);
  };

  const onPressUnblockUser = (userId) => {
    Unblock(userId);
    setUnblockModalVisible(false);
    refreshSelectedUser(user);
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
              <IconButton name="chevron-back" color="black" size={SIZE * 2} iconStyle={{ marginLeft: -SIZE / 2 }} />
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
        <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={['17%']} backdropComponent={renderBackdrop}>
          <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
            <TouchableOpacity onPress={() => setReportModalVisible(true)}>
              <Row row alignCenter style={{ marginTop: SIZE }}>
                <Octicons name="report" size={SIZE * 1.8} color="red" />
                <Text style={{ marginLeft: SIZE, fontFamily: FONTS.regular, fontSize: SIZES.sm, color: 'red' }}>Report</Text>
              </Row>
            </TouchableOpacity>
            {userSelected.isBlocked ? (
              <TouchableOpacity onPress={() => setUnblockModalVisible(true)}>
                <Row row alignCenter style={{ marginTop: SIZE }}>
                  <Entypo name="block" size={SIZE * 1.8} color="red" />
                  <Text style={{ marginLeft: SIZE, fontFamily: FONTS.regular, fontSize: SIZES.sm, color: 'red' }}>Unblock</Text>
                </Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setBlockModalVisible(true)}>
                <Row row alignCenter style={{ marginTop: SIZE }}>
                  <Entypo name="block" size={SIZE * 1.8} color="red" />
                  <Text style={{ marginLeft: SIZE, fontFamily: FONTS.regular, fontSize: SIZES.sm, color: 'red' }}>Block</Text>
                </Row>
              </TouchableOpacity>
            )}
          </View>
        </BottomSheetModal>
        <AlertModal
          isVisible={isReportModalVisible}
          onBackdropPress={() => setReportModalVisible(false)}
          title="Report this user?"
          descritpion="Thank you for reporting this user. Our team will review the event and take appropriate action as necessary."
          confirmText="Report"
          onPressConfirm={() => onPressReportUser(dataReport)}
        />
        <AlertModal
          isVisible={isBlockModalVisible}
          onBackdropPress={() => setBlockModalVisible(false)}
          title="Block this user?"
          descritpion="They won't be able to see your profle posts and notes on Eventa. They won't be notififed that you blocked them."
          confirmText="Block"
          onPressConfirm={() => onPressBlockUser(dataBlock)}
        />
        <AlertModal
          isVisible={isUnblockModalVisible}
          onBackdropPress={() => setUnblockModalVisible(false)}
          title="Unblock this user?"
          descritpion="By unblocking this user he'll be able to see your contents. He won't be notified that you unblock him."
          confirmText="Unblock"
          onPressConfirm={() => onPressUnblockUser(selectedUserId)}
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
