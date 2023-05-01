import { AntDesign } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { HomeCarousel } from '../../../../components/HomeCarousel';
import { InputText, LoadingImage, Note, PostCard, Row, Text, TextButton } from '../../../../components/index';
import { ROUTES } from '../../../../navigation/Navigation';
import { createNote, deleteNote, getUserNotes } from '../../../../services/notes';
import { getPosts } from '../../../../services/posts';
import { selectCurrentUser, selectCurrentUserId } from '../../../../store/user';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const HomeTop = forwardRef(({ eventData, mapData, ...props }, ref) => {
  const [note, setNote] = useState();
  const [userNotes, setUserNotes] = useState();
  const [post, setPost] = useState();
  const user = useSelector(selectCurrentUser);
  const userId = useSelector(selectCurrentUserId);
  const navigation = useNavigation();

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['60%'];

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

  useImperativeHandle(
    ref,
    () => {
      return {
        onRefresh: () => {
          getRefreshedData();
          getUserNotes().then((result) => {
            console.log('result', result);
            setUserNotes(result.data);
          });
          getPosts().then((result) => {
            setPost(result[0]);
          });
        },
      };
    },
    []
  );

  useEffect(() => {
    getUserNotes().then((result) => {
      console.log('result', result);
      setUserNotes(result.data);
    });
  }, [getRefreshedData]);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPosts();
      setPost(post[0]);
    };
    fetchPost();
  }, []);

  const { data, getMoreData, getData, getRefreshedData, loadMore } = useInfiniteScroll({
    entity: 'notes/followedNotes',
    filters: {
      'date.$gte': DateTime.now().minus({ days: 2 }).toISO(),
    },
    limit: 5,
  });

  const onPressDeleteNote = async (noteId) => {
    handleClosePress();
    await deleteNote(noteId);
    await getUserNotes().then((result) => {
      console.log('result', result);
      setUserNotes(result.data);
    });
    await getData();
  };

  const onPressCreateNote = async () => {
    await createNote({ content: note, userId });
    handleClosePress();
    getUserNotes().then((result) => {
      console.log('result', result);
      setUserNotes(result.data);
    });
    setNote('');
  };

  return (
    <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
      <View style={{ alignItems: 'center' }}>
        <HomeCarousel eventData={eventData} mapData={mapData} />
        <View style={styles.noteContainer}>
          <FlatList
            data={[...(userNotes || []), ...(data || [])]}
            renderItem={({ item }) => <Note data={item} deleteNote={onPressDeleteNote} />}
            keyExtractor={(item) => item._id}
            style={{ paddingHorizontal: SIZE / 2 }}
            onEndReachedThreshold={0.1}
            onEndReached={_.throttle(getMoreData, 400)}
            ListFooterComponent={
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: SIZE * 4.5 }}>{loadMore && <ActivityIndicator />}</View>
            }
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
              <TouchableOpacity onPress={handlePresentModal} activeOpacity={0.7}>
                <Row justifyCenter mt={SIZE}>
                  <View>
                    <View style={[styles.note, { alignItems: 'center', alignContent: 'center', marginRight: SIZE }]}>
                      <Row alignCenter style={{ width: SIZE * 6 }} column>
                        <Row row>
                          <LoadingImage source={user.profilePic} profile iconSIZE={SIZE * 2.5} width={SIZE * 4} viewStyle={styles.createNoteImage} />
                          <View style={styles.plusIcon}>
                            <AntDesign name="pluscircle" size={SIZE * 1.3} color={COLORS.primary} />
                          </View>
                        </Row>
                        <Text style={{ fontSize: SIZES.xs, textAlign: 'center' }}>Share your plans!</Text>
                      </Row>
                    </View>
                  </View>
                </Row>
              </TouchableOpacity>
            }
          />
        </View>
        {post && (
          <>
            <Row row alignEnd style={{ width: '100%', marginBottom: SIZE / 2 }} spaceBetween>
              <Row row alignCenter>
                <Text ff={FONTS.medium} fs={SIZES.sm}>
                  Moments
                </Text>
              </Row>

              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PostsFeedScreen)}>
                <Row row alignCenter>
                  <AntDesign name="caretright" size={SIZE / 1.1} />
                  <TextButton
                    text="View all"
                    textStyle={{
                      width: SIZE * 4,
                      fontSize: SIZES.xs,
                      color: 'black',
                      fontFamily: FONTS.medium,
                      alignSelf: 'flex-end',
                      marginLeft: SIZE / 4,
                    }}
                  />
                </Row>
              </TouchableOpacity>
            </Row>
            {post && <PostCard postData={post} touchable />}
          </>
        )}
        <Text ff={FONTS.medium} fs={SIZES.sm} style={{ width: '100%', marginBottom: SIZE, marginTop: SIZE / 2 }}>
          Events near you
        </Text>
      </View>
      <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          <InputText label="Write your note" maxLength={45} value={note} onChangeText={setNote} />
          <Text color={COLORS.gray}>{note?.length !== undefined ? 45 - note?.length : 45}/45</Text>
          <TextButton text="Post" textStyle={styles.share} onPress={onPressCreateNote} disabled={!note?.length} />
        </View>
      </BottomSheetModal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontFamily: FONTS.regular,
    color: 'white',
  },
  icon: {
    position: 'relative',
    marginLeft: SIZE * 3,
  },
  lineButton: {
    width: SIZE * 12,
    height: 2,
    backgroundColor: 'black',
    marginTop: SIZE / 3,
  },
  place: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.lg,
    marginBottom: SIZE / 5,
  },
  map: {
    height: SIZE * 17,
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE,
    borderRadius: SIZES.xxs,
    marginBottom: SIZE * 1.5,
  },
  noteContainer: {
    marginRight: 0,
    marginLeft: -(WIDTH_DEVICE / 40),
    width: WIDTH_DEVICE,
    height: SIZE * 13,
    marginTop: SIZE,
  },
  plusIcon: {
    position: 'absolute',
    marginTop: SIZE * 3.8,
    marginLeft: SIZE * 2.8,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  createNoteImage: {
    marginBottom: SIZE,
    marginTop: SIZE,
  },
  share: {
    alignSelf: 'center',
    marginTop: SIZE,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
  },
  profilePic: {
    width: SIZE * 4,
    aspectRatio: 1,
    borderRadius: 100,
  },
});
