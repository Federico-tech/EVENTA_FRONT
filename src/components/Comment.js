import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { setUserSelected } from '../store/user';
import { FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const Comment = ({ commentData }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPressProfilePic = () => {
    dispatch(setUserSelected(commentData.user));
    navigation.navigate(ROUTES.AccountUserScreen);
  };

  return (
    <View style={{ marginHorizontal: WIDTH_DEVICE / 20, marginTop: SIZE, width: SIZE * 23 }}>
      <Row alignStart row>
        <TouchableOpacity onPress={onPressProfilePic}>
          <LoadingImage source={commentData.user.profilePic} width={SIZE * 3} iconSIZE={SIZE * 2.5} profile />
        </TouchableOpacity>
        <Row style={{ marginLeft: SIZE }}>
          <Text style={styles.username}>{commentData.user.username}</Text>
          <Text>{commentData.content}</Text>
        </Row>
      </Row>
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
