import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { View, Keyboard, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { FlatList, RefreshControl, TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { Comment, Container, Header, ListEmptyComponent, LoadingImage, SafeArea, Text } from '../../../../components';
import { createComment } from '../../../../services/comments';
import { selectCurrentUser, selectCurrentUserId } from '../../../../store/user';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, SIZE, WIDTH_DEVICE } from '../../../../utils/theme';

export const PostCommentScreen = ({ route }) => {
  const [content, setContent] = useState('');
  const [isCreatePostLoading, setIsCreatePostLoading] = useState(false);
  const textInputRef = useRef(null);

  const currentUser = useSelector(selectCurrentUser);
  const userId = useSelector(selectCurrentUserId);
  const { postId } = route.params;
  console.log(postId);

  const handleInputChange = (inputText) => {
    setContent(inputText);
  };

  const viewRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    console.log({ keyboardHeight });

    viewRef.current.setNativeProps({
      style: Platform.OS === 'android' ? { marginTop: keyboardHeight } : { marginBottom: keyboardHeight - SIZE * 2.5},
    });
  };
  const keyboardDidHide = () => {
    viewRef.current.setNativeProps({
      style: { marginBottom: 0 },
    });
  };
  const { data, getMoreData, getRefreshedData, loadMore, refreshing, getData } = useInfiniteScroll({
    entity: 'comments',
    filters: {
      postId,
    },
    limit: 15,
  });

  const onPressPostComment = async () => {
    setContent('');
    setIsCreatePostLoading(true);
    await createComment({ content, userId, postId });
    await getRefreshedData();
    setIsCreatePostLoading(false);
  };

  const handleScroll = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <Header title="Comments" back />
      <FlatList
        data={data}
        renderItem={({ item }) => <Comment commentData={item} getData={getData} />}
        keyExtractor={(item) => item?._id}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZE * 8 }}
        onScroll={handleScroll}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="There are no comments for this post" />}
      />
      <SafeArea style={{ backgroundColor: '#080808'}}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#080808' }}>
          <View style={{ height: SIZE * 5.5, backgroundColor: '#080808' }} ref={viewRef}>
            <View style={{ backgroundColor: '#080808', height: 1 }} />
            <View
              style={{ flexDirection: 'row', marginHorizontal: WIDTH_DEVICE / 20, marginTop: SIZE, width: WIDTH_DEVICE * 0.9, alignItems: 'center' }}
              ref={textInputRef}>
              <LoadingImage profile source={currentUser.profilePic} width={SIZE * 3.5} iconSIZE={SIZE * 2.5} />
              <TextInput style={styles.input} onChangeText={handleInputChange} value={content} placeholder="Write you comment" maxLength={150} placeholderTextColor={COLORS.gray} />
              <TouchableOpacity onPress={onPressPostComment} disabled={(isCreatePostLoading || !content) && true}>
                <Text color={COLORS.primary} semiBoldSm style={(isCreatePostLoading || !content) && { opacity: 0.5 }}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeArea>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    height: SIZE * 3.5,
    borderRadius: 30,
    marginHorizontal: SIZE,
    paddingHorizontal: SIZE,
    width: SIZE * 19,
    color: 'white',
    backgroundColor: COLORS.darkGray
  },
});
