import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../navigation/Navigation';
import { setUserSelected } from '../store/user';
import { COLORS, FONTS, SIZE, SIZES } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

export const MiniPostCard = ({ postData }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPressUser = () => {
    if (!postData?.user.isDeleted) {
      dispatch(setUserSelected(postData?.user));
      navigation.navigate(ROUTES.AccountUserScreen);
    }
  };

  return (
    <View style={{ marginRight: SIZE }}>
      <LoadingImage source={postData.postImage} width={SIZE * 14} event />
      <View style={styles.container}>
        <TouchableOpacity onPress={onPressUser}>
          <Row row alignCenter style={{ margin: SIZE / 2 }}>
            <LoadingImage source={postData.user.profilePic} profile width={SIZE * 2} />
            <Text regularXs color={COLORS.white} style={{ marginLeft: SIZE / 2, fontFamily: FONTS.semiBold }}>
              {postData.user.username}
            </Text>
          </Row>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  textStyle: {
    fontSize: SIZES.xs,
    fontFamily: FONTS.semiBold,
  },
});
