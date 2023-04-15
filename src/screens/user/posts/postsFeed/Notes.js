import { AntDesign } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { useState, useImperativeHandle, useRef, useCallback, useEffect, forwardRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { InputText, LoadingImage, Note, Row, Text, TextButton } from '../../../../components';
import { ROUTES } from '../../../../navigation/Navigation';
import { createNote, deleteNote, getUserNotes } from '../../../../services/notes';
import { selectCurrentUser, selectCurrentUserId } from '../../../../store/user';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const Notes = forwardRef(({onRefresh,  ...props }, refNotes) => {
  const [note, setNote] = useState();
  const [userNotes, setUserNotes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const onPressNotification = () => navigation.navigate(ROUTES.NotificationsScreen);
  const onPressLikes = () => navigation.navigate(ROUTES.LikeScreen);
  const user = useSelector(selectCurrentUser);
  const userId = useSelector(selectCurrentUserId);

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

  useEffect(() => {
    getUserNotes().then((result) => {
      console.log('result', result);
      setUserNotes(result.data);
    });
  }, []);



  const { data, getMoreData, loadMore, getData, getRefreshedData } = useInfiniteScroll({
    entity: 'notes/followedNotes',
    filters: {
      'date.$gte': DateTime.now().minus({ days: 1 }).toISO(),
    },
    limit: 5,
    debug: true,
  });

  useEffect(() => {
    if (onRefresh) {
      getRefreshedData();
    }
  }, [onRefresh]);

  useImperativeHandle(
    refNotes,
    () => {
      return {
        onRefresh: () => {
          getRefreshedData();
        },
      };
    },
    []
  );

  const onPressCreateNote = async () => {
    setIsLoading(true);
    await createNote({ content: note, userId });
    handleClosePress();
    await getUserNotes().then((result) => {
      console.log('result', result);
      setUserNotes(result.data);
    });
    setIsLoading(false);
    setNote('');
  };

  const onPressDeleteNote = async (noteId) => {
    setIsLoading(true);
    handleClosePress();
    await deleteNote(noteId);
    await getUserNotes().then((result) => {
      console.log('result', result);
      setUserNotes(result.data);
    });
    await getData();
    setIsLoading(false);
  };

  return (
    <View style={styles.noteContainer}>
      <FlatList
        data={[...(userNotes || []), ...(data || [])]}
        renderItem={({ item }) => <Note data={item} deleteNote={onPressDeleteNote} />}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: SIZE * 4.5 }}>{loadMore && <ActivityIndicator />}</View>
        }
        ListHeaderComponent={
          <TouchableOpacity onPress={handlePresentModal}>
            <Row justifyCenter style={{ marginTop: SIZE / 2 }}>
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
      <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          <InputText label="Write your note" maxLength={45} value={note} onChangeText={setNote} />
          <Text color={COLORS.gray}>{note?.length !== undefined ? 45 - note?.length : 45}/45</Text>
          <TextButton text="Post" textStyle={styles.share} onPress={onPressCreateNote} disabled={!note?.length} loading={isLoading} />
        </View>
      </BottomSheetModal>
    </View>
  );
});

const styles = StyleSheet.create({
  noteContainer: {
    marginTop: SIZE,
    marginRight: 0,
    width: WIDTH_DEVICE,
    paddingHorizontal: WIDTH_DEVICE / 20,
    height: SIZE * 11,
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
