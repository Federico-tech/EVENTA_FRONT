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
import { getUserField } from '../services/users';
import { selectCurrentUserId, setUserSelected } from '../store/user';
import { setTimeElapsed } from '../utils/dates';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { AlertModal } from './AlertModal';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const PostCard = ({ postData, getData, touchable }) => {
  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState();
  const [commentUserUsername, setCommentUserUsername] = useState();
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
    if (postData.comments !== 0) {
      getUserField({ userId: postData?.comment?.userId, field: 'username' }).then((result) => {
        setCommentUserUsername(result.user.username);
      });
    }
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

  const onPressReportPost = (data) => {
    report(data);
    handleClosePress();
    setReportModalVisible(false);
    showMessage({
      message: 'Post reported succefully',
      description: 'Thank you for reporting this post.',
      type: 'success',
    });
  };

  const onPressDeletePost = async (data) => {
    handleClosePress();
    setDeleteModalVisible(false);
    showMessage({
      message: 'Post deleted succefully',
      type: 'success',
    });
    await deletePost(data._id);
    await getData();
  };

  const onPressNavigatePosts = () => {
    navigation.navigate(ROUTES.PostsFeedScreen);
  };

  const onPressLikeNumber = () => {
    navigation.navigate(ROUTES.PostLikesScreen, { postData });
  };

  const onPressComments = () => {
    navigation.navigate(ROUTES.PostCommentScreen, { postId: postData._id });
  };

  return (
    <TouchableWithoutFeedback onPress={touchable ? onPressNavigatePosts : handleDoubleTap} disabled={isLikePressLoading}>
      <View style={styles.wrapper}>
        <Row style={styles.topRow}>
          <Row style={{ padding: SIZE / 1.5, paddingVertical: SIZE / 1.5 }} row alignCenter spaceBetween>
            <TouchableOpacity onPress={onPressProfile}>
              <Row row alignCenter>
                <LoadingImage source={postData.user.profilePic} profile width={SIZE * 3} iconSIZE={SIZE * 2} />
                <Row style={{ marginLeft: SIZE }}>
                  <Text style={{ fontSize: SIZES.sm, fontFamily: FONTS.medium }}>{postData.user.username}</Text>
                  <Text color={COLORS.gray} style={{ fontSize: SIZES.xs, fontFamily: FONTS.regular }}>
                    at {postData?.event?.name}
                  </Text>
                </Row>
              </Row>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePresentModal} style={{ paddingVertical: SIZE }}>
              <Entypo name="dots-three-horizontal" size={SIZE * 1.3} onPress={handlePresentModal} />
            </TouchableOpacity>
          </Row>
          <LoadingImage
            source={postData.postImage}
            style={styles.image}
            indicator
            event
            imageStyle={{ aspectRatio: 0.9 }}
            viewStyle={{ aspectRatio: 0.9 }}
          />
          <Row style={styles.rowBottom}>
            <Row row spaceBetween alignCenter width="100%">
              <Row row>
                {isLiked ? (
                  <TouchableOpacity onPress={onPressUnlike} disabled={isLikePressLoading}>
                    <Row row alignCenter>
                      <AntDesign name="heart" size={SIZE * 1.7} color="red" />
                      <Text style={{ marginHorizontal: SIZE / 1.5 }}>{likes}</Text>
                    </Row>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={onPresslike} disabled={isLikePressLoading}>
                    <Row row alignCenter>
                      <AntDesign name="hearto" size={SIZE * 1.7} />
                      <TouchableOpacity onPress={onPressLikeNumber}>
                        <Text style={{ marginHorizontal: SIZE / 1.5 }}>{likes}</Text>
                      </TouchableOpacity>
                    </Row>
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={onPressComments}>
                  <Row row alignCenter>
                    <AntDesign name="message1" size={SIZE * 1.7} style={{ marginRight: SIZE / 1.5, marginLeft: SIZE / 1.8 }} />
                    <Text>{postData.comments}</Text>
                  </Row>
                </TouchableOpacity>
              </Row>
              <Text ff={FONTS.regular} color={COLORS.gray} fs={SIZES.xs}>
                {setTimeElapsed(postData.createdAt)} ago
              </Text>
            </Row>

            <Row>
              <Text regularXs style={{ marginTop: SIZE / 1.5, width: SIZE * 25, marginBottom: SIZE / 2 }}>
                <Text ff={FONTS.semiBold}>{postData.user.username} </Text>
                {postData.caption}
              </Text>
            </Row>
            {postData.comments !== 0 && (
              <Row>
                <Text regularXs style={{ marginTop: SIZE / 1.5, width: SIZE * 24, marginBottom: SIZE / 2 }} numberOfLines={2}>
                  <Text ff={FONTS.semiBold}>{commentUserUsername} </Text>
                  {postData?.comment?.content}
                </Text>
              </Row>
            )}
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
    padding: SIZE,
    paddingVertical: SIZE / 1.2,
    flexDirection: 'column',
  },
  likeContainer: {
    flexDirection: 'row',
  },
});
