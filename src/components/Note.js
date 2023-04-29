import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { fire, unfire } from '../services/notes';
import { report } from '../services/reports';
import { selectCurrentUserId, setUserSelected } from '../store/user';
import { formatShortNumber } from '../utils/numbers';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { AlertModal } from './AlertModal';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const Note = ({ data, deleteNote }) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const userId = useSelector(selectCurrentUserId);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['13%'];

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

  const [isFire, setIsFire] = useState(data.isFire);
  const [numFires, setNumFires] = useState(data.fires);
  const [isFireLoading, setIsFireLoading] = useState(false);

  useEffect(() => {
    setIsFire(data.hasFired);
    setNumFires(data.fires);
  }, [data]);

  const onPressFire = async () => {
    setIsFire(true);
    setNumFires(numFires + 1);
    setIsFireLoading(true);
    await fire(data._id);
    setIsFireLoading(false);
  };

  const onPressUnfire = async () => {
    setIsFire(false);
    setNumFires(numFires - 1);
    setIsFireLoading(true);
    await unfire(data._id);
    setIsFireLoading(false);
  };

  const onPressReportNote = (data) => {
    report(data);
    handleClosePress();
    setReportModalVisible(false);
    showMessage({
      message: 'Note reported Succefully',
      description: 'Thank you for reporting this note.',
      type: 'success',
    });
  };

  const onPressDeleteNote = () => {
    deleteNote(data._id);
    handleClosePress();
    showMessage({
      message: 'Note deleted Succefully',
      type: 'success',
    });
  };

  const onPressNavigateProfile = () => {
    dispatch(setUserSelected(data.user));
    navigation.navigate(ROUTES.AccountUserScreen);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePresentModal} disabled={isFireLoading}>
        <Row justifyCenter>
          <View>
            <View style={styles.note}>
              <Row row alignCenter spaceBetween>
                <TouchableOpacity onPress={onPressNavigateProfile} disabled={data.user._id === userId}>
                  <LoadingImage source={data?.user.profilePic} profile width={SIZE * 3} iconSIZE={SIZE * 2} />
                </TouchableOpacity>
                <TouchableOpacity onPress={isFire ? onPressUnfire : onPressFire} disabled={isFireLoading}>
                  <Row row alignCenter>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.NoteFiresScreen, { data })}>
                      <Text regularSm style={{ fontFamily: FONTS.medium, padding: SIZE / 4 }}>
                        {formatShortNumber(numFires)}
                      </Text>
                    </TouchableOpacity>
                    <MaterialIcons
                      name="local-fire-department"
                      size={SIZE * 1.7}
                      color={isFire ? 'darkorange' : 'black'}
                      style={{ marginVertical: SIZE }}
                    />
                  </Row>
                </TouchableOpacity>
              </Row>
              <TouchableOpacity onPress={onPressNavigateProfile} disabled={data.user._id === userId}>
                <Text semiBoldSm numberOfLines={1} ellipsizeMode="tail" style={{ marginTop: SIZE / 2 }}>
                  {data.user.username}
                </Text>
              </TouchableOpacity>
              <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: SIZES.xs, marginTop: SIZE / 3, marginRight: SIZE }}>
                {data.content}
              </Text>
            </View>
          </View>
        </Row>
      </TouchableOpacity>
      <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
        {data.user._id === userId ? (
          <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
            <Row row alignCenter style={{ marginTop: SIZE, marginHorizontal: WIDTH_DEVICE / 20 }}>
              <Ionicons name="ios-trash-outline" size={SIZE * 2} color="red" />
              <Text regularSm color="red" style={{ marginLeft: SIZE / 2 }}>
                Delete the note
              </Text>
            </Row>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setReportModalVisible(true)}>
            <Row row alignCenter style={{ marginTop: SIZE, marginHorizontal: WIDTH_DEVICE / 20 }}>
              <Octicons name="report" size={SIZE * 1.8} color="red" />
              <Text regularSm color="red" style={{ marginLeft: SIZE }}>
                Report
              </Text>
            </Row>
          </TouchableOpacity>
        )}
      </BottomSheetModal>
      <AlertModal
        isVisible={isDeleteModalVisible}
        onBackdropPress={() => setDeleteModalVisible(false)}
        title="Delete this note?"
        descritpion="Are you sure you want to delete this note?"
        confirmText="Delete"
        onPressConfirm={onPressDeleteNote}
      />
      <AlertModal
        isVisible={isReportModalVisible}
        onBackdropPress={() => setReportModalVisible(false)}
        title="Report this note?"
        descritpion="You want to report this note? Our team will review the note and take appropriate action as necessary."
        confirmText="Report"
        onPressConfirm={() => onPressReportNote({ type: 'note', userId, objectId: data._id })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    backgroundColor: COLORS.white,
    width: SIZE * 10.5,
    aspectRatio: 1,
    borderRadius: SIZES.sm,
    padding: SIZE / 1.5,
    marginHorizontal: SIZE / 6,
    marginRight: SIZE,
    marginTop: SIZE,
    ...SHADOWS.medium,
  },
  noteImage: {
    width: SIZE * 3,
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: SIZE * 2,
  },
});
