import { AntDesign } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { HomeMap, IconButton, InputText, Note, Row, Text, TextButton } from '../components/index';
import { ROUTES } from '../navigation/Navigation';
import { createNote } from '../services/notes';
import { selectCurrentUser, selectCurrentUserId } from '../store/user';
import { useInfiniteScroll } from '../utils/hooks';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';

export const HomeTop = () => {
  const [note, setNote] = useState();
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

  const { data, getMoreData, loadMore, getRefreshedData } = useInfiniteScroll({
    entity: 'notes',
    filters: {
      'date.$gte': DateTime.now().minus({ days: 1 }).toISO(),
    },
    limit: 10,
  });

  const onPressCreateNote = () => {
    createNote({ content: note, userId });
    handleClosePress();
    getRefreshedData();
  };

  return (
    <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
      <View style={styles.container}>
        <Row>
          <Text semiBoldMd>Find the right event!</Text>
        </Row>
        <Row row>
          <IconButton name="ios-notifications-outline" iconStyle={styles.icon} size={SIZE * 2} onPress={onPressNotification} />
          <IconButton name="heart-outline" iconStyle={styles.icon} size={SIZE * 2} onPress={onPressLikes} />
        </Row>
      </View>
      <HomeMap />
      <Text semiBoldMd>Notes</Text>
      <View style={styles.noteContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Note data={item} />}
          keyExtractor={(item) => item._id}
          onEndReachedThreshold={0.1}
          onEndReached={_.throttle(getMoreData, 400)}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
          ListHeaderComponent={
            <TouchableOpacity onPress={handlePresentModal}>
              <Row justifyCenter>
                <View>
                  <View style={[styles.note, { alignItems: 'center', alignContent: 'center', marginRight: SIZE }]}>
                    <Row alignCenter style={{ width: SIZE * 6 }} column>
                      <Row row>
                        <Image source={{ uri: user.profilePic }} style={styles.createNoteImage} />
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
      <Text semiBoldMd style={{ marginBottom: SIZE }}>
        Upcoming events
      </Text>
      <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          <InputText label="Write your note" maxLength={60} value={note} onChangeText={setNote} />
          <Text color={COLORS.gray}>{note?.length === null ? 60 - note?.length : 60}/60</Text>
          <TextButton text="Post" textStyle={styles.share} onPress={onPressCreateNote} disabled={!note?.length} />
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT_DEVICE / 70,
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
    marginTop: SIZE,
    marginRight: 0,
    marginLeft: -(WIDTH_DEVICE / 20),
    width: WIDTH_DEVICE,
    paddingHorizontal: WIDTH_DEVICE / 20,
    height: SIZE * 11,
    marginBottom: SIZE,
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
    width: SIZE * 4,
    aspectRatio: 1,
    borderRadius: 100,
    marginBottom: SIZE,
    marginTop: SIZE,
  },
  share: {
    alignSelf: 'center',
    marginTop: SIZE,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
  },
});
