import { AntDesign, Entypo, Octicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { postLike, postUnlike } from '../services/postLikes';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserId, setUserSelected } from '../store/user';
import { ROUTES } from '../navigation/Navigation'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { AlertModal } from './AlertModal';
import { report } from '../services/reports';

export const PostCard = ({ postData }) => {
  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState();
  const [lastTap, setLastTap] = useState(null)
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const currentUserId = useSelector(selectCurrentUserId)

  const bottomSheetModalRef = useRef(null);

  const navigation = useNavigation()
  const dispatch = useDispatch()

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
  

  useEffect(() => {
    setLikes(postData.likes);
    setIsLiked(postData.hasLiked);
  }, [postData]);

  const onPresslike = () => {
    postLike(postData._id);
    setLikes(likes + 1);
    setIsLiked(true);
  };

  const onPressUnlike = () => {
    postUnlike(postData._id);
    setLikes(likes - 1);
    setIsLiked(false);
  };
  
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      isLiked ? onPressUnlike() : onPresslike();
    } else {
      setLastTap(now);
    }
  }

  const onPressProfile = () => {
    dispatch(setUserSelected(postData.user))
    navigation.navigate(ROUTES.AccountUserScreen)
  }
 
  const onPressReportPost = (data) => {
    report(data)
    handleClosePress()
    setReportModalVisible(false)
  }

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={styles.wrapper}>
        <Row style={styles.topRow}>
          <Row style={{ padding: SIZE * 0.7 }} row alignCenter spaceBetween>
            <TouchableOpacity onPress={onPressProfile}>
              <Row row alignCenter>
                <LoadingImage source={postData.user.profilePic} profile width={SIZE * 3} iconSIZE={SIZE * 2} />
                <Row>
                  <Text style={{ marginLeft: SIZE, fontSize: SIZES.xs, fontFamily: FONTS.semiBold }}>{postData.user.username}</Text>
                </Row>
              </Row>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePresentModal}>
            <Entypo name="dots-three-horizontal" size={SIZE * 1.4} onPress={handlePresentModal}/>
            </TouchableOpacity>
          </Row>
          <LoadingImage source={postData.postImage} style={styles.image} indicator event />
          <Row style={styles.rowBottom} spaceBetween row alignCenter>
            <Row style={{ margin: SIZE / 2, width: SIZE * 22 }} justifyCenter>
              <Text color={COLORS.gray} medium style={{ fontSize: SIZES.sm }}>
                at {postData.event.name}
              </Text>
              <Text regularXs style={{ marginTop: SIZE / 10 }}>
                {postData.caption}
              </Text>
            </Row>
            <View style={styles.likeContainer}>
              <Text style={{ marginRight: SIZE / 3, fontFamily: FONTS.medium }}>{likes}</Text>
              {isLiked ? (
                <TouchableOpacity onPress={onPressUnlike}>
                  <AntDesign name="heart" iconStyle={styles.icon} size={SIZE * 1.7} color="red" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={onPresslike}>
                  <AntDesign name="hearto" iconStyle={styles.icon} size={SIZE * 1.7} />
                </TouchableOpacity>
              )}
            </View>
          </Row>
        </Row>
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
        title="Report this post?"
        descritpion="Thank you for reporting this post. Our team will review the event and take appropriate action as necessary."
        confirmText="Report"
        onPressConfirm={() => onPressReportPost({ type: 'post', userId: currentUserId, objectId: postData._id })}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: SIZE * 35.5,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xxs,
    width: WIDTH_DEVICE * 0.9,
    marginHorizontal: WIDTH_DEVICE / 20,
    marginBottom: SIZE,
    marginTop: SIZE / 2,
    ...SHADOWS.medium,
  },
  topRow: {
    height: SIZE * 4,
    borderTopRightRadius: SIZES.xxs,
    borderTopLeftRadius: SIZES.xxs,
  },
  bottomRow: {
    height: SIZE,
    backgroundColor: 'green',
    alignSelf: 'flex-end',
  },
  image: {
    width: SIZE * 27,
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
  },
  rowBottom: {
    margin: SIZE * 0.7,
    alignContent: 'center',
    alignItems: 'center',
  },
  likeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
