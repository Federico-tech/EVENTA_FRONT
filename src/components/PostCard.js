import { AntDesign, Entypo, Ionicons, Octicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { postLike, postUnlike } from '../services/postLikes';
import { deletePost } from '../services/posts';
import { report } from '../services/reports';
import { selectCurrentUserId, setUserSelected } from '../store/user';
import { useInfiniteScroll } from '../utils/hooks';
import { formatNumber, formatShortNumber } from '../utils/numbers';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { AlertModal } from './AlertModal';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const PostCard = ({ postData, getData }) => {
  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState();
  const [isLikePressLoading, setIsLikePressLoading] = useState(false);
  const [lastTap, setLastTap] = useState(null);
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const currentUserId = useSelector(selectCurrentUserId);

  const bottomSheetModalRef = useRef(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const { data } = useInfiniteScroll({
    entity: `likes`,
    limit: 1,
    filters: {
      objectId: postData._id,
    },
  });

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

  const onPresslike = async () => {
    setLikes(likes + 1);
    setIsLiked(true);
    setIsLikePressLoading(true);
    await postLike(postData._id);
    setIsLikePressLoading(false);
  };

  const onPressUnlike = async () => {
    setLikes(likes - 1);
    setIsLiked(false);
    setIsLikePressLoading(true);
    await postUnlike(postData._id);
    setIsLikePressLoading(false);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      if (isLiked) {
        onPressUnlike();
      } else {
        onPresslike();
      }
    } else {
      setLastTap(now);
    }
  };

  const onPressProfile = () => {
    dispatch(setUserSelected(postData.user));
    navigation.navigate(ROUTES.AccountUserScreen);
  };

  const onPressViewComments = () => {
    navigation.navigate(ROUTES.PostCommentScreen, { postId: postData._id });
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
    await deletePost(data._id);
    await getData();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap} disabled={isLikePressLoading}>
      <View style={styles.wrapper}>
        <Row style={styles.topRow}>
          <Row style={{ padding: SIZE / 2 }} row alignCenter spaceBetween>
            <TouchableOpacity onPress={onPressProfile}>
              <Row row alignCenter>
                <LoadingImage source={postData.user.profilePic} profile width={SIZE * 3} iconSIZE={SIZE * 2} />
                <Row style={{ marginLeft: SIZE }}>
                  <Text style={{ fontSize: SIZES.xs, fontFamily: FONTS.semiBold }}>{postData.user.username}</Text>
                  <Text color={COLORS.gray} medium style={{ fontSize: SIZES.sm }}>
                    at {postData?.event?.name}
                  </Text>
                </Row>
              </Row>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePresentModal}>
              <Entypo name="dots-three-horizontal" size={SIZE * 1.4} onPress={handlePresentModal} />
            </TouchableOpacity>
          </Row>
          <LoadingImage source={postData.postImage} style={styles.image} indicator event />
          <Row style={styles.rowBottom} row spaceBetween>
            <Row justifyCenter>
              <Row row>
                {postData.likes !== 0 && (
                  <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PostLikesScreen, { postData })}>
                    <Text regularXs style={{ fontSize: SIZES.xxs }}>
                      Liked by <Text style={{ fontFamily: FONTS.semiBold }}>{data[0]?.user?.username}</Text> and{' '}
                      <Text style={{ fontFamily: FONTS.semiBold }}>others {formatShortNumber(likes - 1)}</Text>
                    </Text>
                  </TouchableOpacity>
                )}
              </Row>
              <Text regularXs style={{ marginTop: SIZE / 4, width: SIZE * 19 }}>
                {postData.caption}
              </Text>
              <TouchableOpacity onPress={onPressViewComments}>
                <Text regularXs color={COLORS.gray} style={{ marginTop: SIZE / 10 }}>
                  View all {postData.comments <= 5 ? 'the' : formatNumber(postData.comments)} comments
                </Text>
              </TouchableOpacity>
            </Row>
            <View style={styles.likeContainer}>
              {isLiked ? (
                <TouchableOpacity onPress={onPressUnlike} disabled={isLikePressLoading}>
                  <AntDesign name="heart" iconStyle={styles.icon} size={SIZE * 1.7} color="red" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={onPresslike} disabled={isLikePressLoading}>
                  <AntDesign name="hearto" iconStyle={styles.icon} size={SIZE * 1.7} />
                </TouchableOpacity>
              )}
            </View>
          </Row>
        </Row>
      </View>
      <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={['13%']} backdropComponent={renderBackdrop}>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          {currentUserId === postData.userId ? (
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
        title="Report this post?"
        descritpion="Thank you for reporting this post. Our team will review the event and take appropriate action as necessary."
        confirmText="Report"
        onPressConfirm={() => onPressReportPost({ type: 'post', userId: currentUserId, objectId: postData._id })}
      />
      <AlertModal
        isVisible={isDeleteModalVisible}
        onBackdropPress={() => setDeleteModalVisible(false)}
        title="Delete this post?"
        descritpion="Do you really want to delete this post? This action is irreversible."
        confirmText="Delete"
        onPressConfirm={() => onPressDeletePost(postData)}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xxs,
    width: WIDTH_DEVICE * 0.9,
    marginHorizontal: WIDTH_DEVICE / 20,
    marginBottom: SIZE,
    marginTop: SIZE / 2,
    ...SHADOWS.medium,
  },
  bottomRow: {
    height: SIZE,
    backgroundColor: 'green',
    alignSelf: 'flex-end',
  },
  image: {
    width: '100',
    aspectRatio: 1,
    borderRadius: SIZES.xxs,
  },
  rowBottom: {
    padding: SIZE / 2,
    alignItems: 'center',
  },
  likeContainer: {
    flexDirection: 'row',
  },
});
