import { AntDesign, Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { postLike, postUnlike } from '../services/postLikes';
import { COLORS, FONTS, SHADOWS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const PostCard = ({ postData }) => {
  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState();

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

  return (
    <TouchableOpacity>
      <View style={styles.wrapper}>
        <Row style={styles.topRow}>
          <Row style={{ padding: SIZE * 0.7 }} row alignCenter spaceBetween>
            <Row row alignCenter>
              <LoadingImage source={postData.user.profilePic} style={{ width: SIZE * 2.5, aspectRatio: 1, borderRadius: 100 }} profile />
              <Row>
                <Text style={{ marginLeft: SIZE, fontSize: SIZES.xs, fontFamily: FONTS.semiBold }}>{postData.user.username}</Text>
              </Row>
            </Row>
            <Entypo name="dots-three-horizontal" size={SIZE * 1.2} />
          </Row>
          <LoadingImage source={postData.postImage} style={styles.image} indicator />
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
    </TouchableOpacity>
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
