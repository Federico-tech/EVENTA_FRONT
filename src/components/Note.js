import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { deleteNote, fire, unfire } from '../services/notes';
import { selectCurrentUserId } from '../store/user';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';
import { getRefreshedEvent } from '../services/events';
import { AlertModal } from './AlertModal';

export const Note = ({ data, deleteNote }) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  console.debug({ note: data})
  const userId = useSelector(selectCurrentUserId)

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['13%'];

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
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

  const [isFire, setIsFire] = useState(data.isFire);
  const [numFires, setNumFires] = useState(data.fires)
  
  useEffect(() => {
    setIsFire(data.hasFired)
    setNumFires(data.fires)
  }, [data])

  const onPressFire = () => {
    fire(data._id);
    setIsFire(true);
    setNumFires(numFires + 1)
  };

  const onPressUnfire = () => {
    unfire(data._id);
    setIsFire(false);
    setNumFires(numFires - 1)
  };

  return (
    <View>
      <TouchableOpacity onPress={data.user._id === userId ? handlePresentModal : () => {}}>
        <Row justifyCenter>
          <View>
            <View style={styles.note}>
              <Row row alignCenter spaceBetween>
                <LoadingImage source={data?.user.profilePic} profile width={SIZE * 3} iconSIZE={SIZE * 2} />
                <TouchableOpacity onPress={isFire ? onPressUnfire : onPressFire}>
                  <Row row alignCenter>
                    <Text regularSm style={{ fontFamily: FONTS.medium}}>{numFires}</Text>
                    <MaterialIcons name="local-fire-department" size={SIZE * 1.7} color={isFire ? 'darkorange' : 'black'} />
                  </Row>
                </TouchableOpacity>
              </Row>
              <Text semiBoldSm numberOfLines={1} ellipsizeMode="tail" style={{ marginTop: SIZE / 2 }}>
                {data.user.username}
              </Text>
              <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: SIZES.xs, marginTop: SIZE / 3, marginRight: SIZE }}>
                {data.content}
              </Text>
            </View>
          </View>
        </Row>
      </TouchableOpacity>
      <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
      {data.user._id === userId ? 
          <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
            <Row row alignCenter style={{ marginTop: SIZE, marginHorizontal: WIDTH_DEVICE / 20 }}>
              <Ionicons name="ios-trash-outline" size={SIZE * 2} color="red" />
              <Text regularSm color="red" style={{ marginLeft: SIZE / 2 }}>
                Delete the note
              </Text>
            </Row>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => setReportModalVisible(true)}>
            <Row row alignCenter style={{ marginTop: SIZE }}>
              <Octicons name="report" size={SIZE * 1.8} color="red" />
              <Text regularSm color="red" style={{ marginLeft: SIZE }}>
                Report
              </Text>
            </Row>
          </TouchableOpacity>
      }
        </BottomSheetModal>
        <AlertModal
        isVisible={isDeleteModalVisible}
        onBackdropPress={() => setDeleteModalVisible(false)}
        title="Delete this note?"
        descritpion="Are you sure you want to delete this note?"
        confirmText="Delete"
        onPressConfirm={() => deleteNote(data._id)}
      />
       <AlertModal
        isVisible={isReportModalVisible}
        onBackdropPress={() => setReportModalVisible(false)}
        title="Report this post?"
        descritpion="You want to report this note? Our team will review the event and take appropriate action as necessary."
        confirmText="Report"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    backgroundColor: COLORS.white,
    width: SIZE * 10.5,
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
    padding: SIZE / 1.5,
    marginHorizontal: SIZE / 6,
    marginRight: SIZE,
    ...SHADOWS.medium,
  },
  noteImage: {
    width: SIZE * 3,
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: SIZE * 2,
  },
});
