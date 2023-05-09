import { Entypo, Ionicons, Octicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { deleteComment } from '../services/comments';
import { report } from '../services/reports';
import { selectCurrentUserId, setUserSelected } from '../store/user';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { AlertModal } from './AlertModal';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const Comment = ({ commentData, getData }) => {
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUserId = useSelector(selectCurrentUserId);

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

  const onPressProfilePic = () => {
    dispatch(setUserSelected(commentData.user));
    navigation.navigate(ROUTES.AccountUserScreen);
  };

  const onPressReportPost = (data) => {
    report(data);
    handleClosePress();
    setReportModalVisible(false);
    showMessage({
      message: 'Post reported Succefully',
      description: 'Thank you for reporting this post.',
      type: 'success',
    });
  };

  const onPressDeletePost = async (data) => {
    handleClosePress();
    setDeleteModalVisible(false);
    showMessage({
      message: 'Post deleted Succefully',
      type: 'success',
    });
    await deleteComment(data._id);
    await getData();
  };

  return (
    <View>
      <View style={{ marginHorizontal: WIDTH_DEVICE / 20, marginTop: SIZE * 1.5 }}>
        <Row alignStart row spaceBetween>
          <Row row style={{ width: SIZE * 22 }}>
            <TouchableOpacity onPress={onPressProfilePic}>
              <LoadingImage source={commentData.user.profilePic} width={SIZE * 3} iconSIZE={SIZE * 2.5} profile />
            </TouchableOpacity>
            <Row style={{ marginLeft: SIZE }}>
              <Text style={styles.username}>{commentData.user.username}</Text>
              <Text>{commentData.content}</Text>
            </Row>
          </Row>
          <Row>
            <TouchableOpacity onPress={handlePresentModal}>
              <Entypo name="dots-three-horizontal" size={SIZE * 1.2} color={COLORS.darkGray} />
            </TouchableOpacity>
          </Row>
        </Row>
      </View>
      <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={['13%']} backdropComponent={renderBackdrop}>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          {currentUserId === commentData.userId ? (
            <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
              <Row row alignCenter style={{ marginTop: SIZE }}>
                <Ionicons name="ios-trash-outline" size={SIZE * 2} color="red" />
                <Text style={{ marginLeft: SIZE, fontFamily: FONTS.regular, fontSize: SIZES.sm, color: 'red' }}>Delete</Text>
              </Row>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setReportModalVisible(true)}>
              <Row row alignCenter style={{ marginTop: SIZE }}>
                <Octicons name="report" size={SIZE * 1.8} color="red" />
                <Text style={{ marginLeft: SIZE, fontFamily: FONTS.regular, fontSize: SIZES.sm, color: 'red' }}>Report</Text>
              </Row>
            </TouchableOpacity>
          )}
        </View>
      </BottomSheetModal>
      <AlertModal
        isVisible={isReportModalVisible}
        onBackdropPress={() => setReportModalVisible(false)}
        title="Report this comment?"
        descritpion="Thank you for reporting this comment. Our team will review it and take appropriate action as necessary."
        confirmText="Report"
        onPressConfirm={() => onPressReportPost({ type: 'comment', userId: currentUserId, objectId: commentData._id })}
      />
      <AlertModal
        isVisible={isDeleteModalVisible}
        onBackdropPress={() => setDeleteModalVisible(false)}
        title="Delete this comment?"
        descritpion="Do you really want to delete this comment? This action is irreversible."
        confirmText="Delete"
        onPressConfirm={() => onPressDeletePost(commentData)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.xxs,
    marginBottom: SIZE / 4,
  },
});
