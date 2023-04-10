import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { MiniPostCard } from '../../../../components/MiniPostCard';
import { HomeMap, IconButton, Row, Text, TextButton } from '../../../../components/index';
import { ROUTES } from '../../../../navigation/Navigation';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, FONTS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const HomeTop = forwardRef(({ mapData, ...props }, ref) => {
  const navigation = useNavigation();
  const onPressNotification = () => navigation.navigate(ROUTES.NotificationsScreen);
  const onPressLikes = () => navigation.navigate(ROUTES.LikeScreen);

  const { data, getRefreshedData, refreshing } = useInfiniteScroll({
    entity: 'posts/home',
    limit: 6,
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        onRefresh: () => {
          getRefreshedData();
        },
      };
    },
    []
  );

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
      <HomeMap mapData={mapData} />
      <Row alignCenter spaceBetween row style={{ marginBottom: SIZE}}>
        <Text semiBoldSm>Moments</Text>
        {!refreshing && data.length !== 0 && (
          <TouchableOpacity onPress={() => navigation.jumpTo(ROUTES.PostsNavigator)}>
            <Row row alignCenter>
              <TextButton
                text="View all"
                textStyle={{ width: SIZE * 4, textAlign: 'center', fontSize: SIZES.xs, color: 'black', fontFamily: FONTS.medium }}
              />
            </Row>
          </TouchableOpacity>
        )}
      </Row>

      <View style={styles.noteContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => <MiniPostCard postData={item} />}
          keyExtractor={(item) => item._id}
          horizontal
          style={{ paddingHorizontal: WIDTH_DEVICE / 20 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: SIZE * 4.5 }} />}
        />
      </View>
    </View>
  );
});

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
    marginRight: 0,
    marginLeft: -(WIDTH_DEVICE / 20),
    width: WIDTH_DEVICE,
    height: SIZE * 14,
    marginBottom: SIZE * 1.5,
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
