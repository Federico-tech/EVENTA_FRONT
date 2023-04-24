import { AntDesign } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { GradientBlueLogo } from '../assets';
import { ROUTES } from '../navigation/Navigation';
import { createNote } from '../services/notes';
import { setReadNotifications } from '../services/notifications';
import { selectNotificationsRead, setUnreadNotifications } from '../store/notification';
import { selectCurrentUser, selectCurrentUserId } from '../store/user';
import { WIDTH_DEVICE, HEIGHT_DEVICE, SIZES, FONTS, SIZE, COLORS } from '../utils/theme';
import { IconButton } from './Button';
import { InputText } from './InputText';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';
import { TextButton } from './TextButton';

export const HomeHeader = ({ organiser, ...props }) => {
  const [note, setNote] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const userinfo = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);
  const navigation = useNavigation();
  const notificationsRead = useSelector(selectNotificationsRead);
  const dispatch = useDispatch();

  const onPressNotification = () => {
    setReadNotifications();
    navigation.navigate(ROUTES.NotificationsScreen);
    dispatch(setUnreadNotifications(0));
  };

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

  const onPressProfile = () => {
    navigation.jumpTo(organiser ? ROUTES.OrganiserProfileScreen : ROUTES.ProfileScreenNavigator);
  };

  const onPressCreateNote = async () => {
    setIsLoading(true);
    await createNote({ content: note, userId: currentUserId });
    handleClosePress();
    setIsLoading(false);
    setNote('');
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={{ flex: 1, marginTop: HEIGHT_DEVICE / 24 }}>
          <View style={styles.header}>
            <View style={styles.TextContainer}>
              <TouchableOpacity onPress={handlePresentModal}>
                <Row row>
                  <LoadingImage
                    source={userinfo.profilePic}
                    width={SIZE * 3.6}
                    profile
                    iconSIZE={SIZE * 2.5}
                    imageStyle={styles.imageProfile}
                    viewStyle={styles.createNoteImage}
                  />
                  <View style={styles.plusIcon}>
                    <AntDesign name="pluscircle" size={SIZE * 1.3} color={COLORS.primary} />
                  </View>
                </Row>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressProfile}>
                <View style={styles.text}>
                  <Text style={styles.welcome}>Welcome back,</Text>
                  <Text style={styles.federico}>{userinfo.username}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Row row alignCenter>
              <View>
                <IconButton name="ios-notifications-outline" iconStyle={styles.icon} size={SIZE * 1.85} onPress={onPressNotification} />
                {notificationsRead !== 0 && <View style={styles.notificationDot} />}
              </View>

              <Image resizeMode="contain" style={styles.logo} source={GradientBlueLogo} />
            </Row>
          </View>
        </View>
      </View>
      <BottomSheetModal enablePanDownToClose ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
        <View style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
          <InputText label="Write your note" maxLength={45} value={note} onChangeText={setNote} />
          <Text color={COLORS.gray}>{note?.length !== undefined ? 45 - note?.length : 45}/45</Text>
          <TextButton text="Post" textStyle={styles.share} onPress={onPressCreateNote} disabled={!note?.length} loading={isLoading} />
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZE * 7.5,
    marginBottom: SIZE / 2,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  logo: {
    width: SIZE * 2.7,
    aspectRatio: 1,
  },
  imageProfile: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  TextContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: SIZE,
  },
  welcome: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xxs,
  },
  federico: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.sm,
  },
  imageView: {
    width: SIZE * 4,
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: SIZE,
  },
  plusIcon: {
    position: 'absolute',
    marginTop: SIZE * 3.4,
    marginLeft: SIZE * 2.4,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    borderWidth: 2,
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
  notificationDot: {
    width: SIZE / 1.3,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    zIndex: 1,
    position: 'absolute',
    marginLeft: SIZE,
    borderColor: COLORS.white,
    borderWidth: 2,
  },
});
