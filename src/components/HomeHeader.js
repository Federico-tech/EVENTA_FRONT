import { AntDesign } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { BlueGradientLogo } from '../assets';
import { ROUTES } from '../navigation/Navigation';
import { setReadNotifications } from '../services/notifications';
import { selectNotificationsRead, setUnreadNotifications } from '../store/notification';
import { selectCurrentUser } from '../store/user';
import { WIDTH_DEVICE, HEIGHT_DEVICE, SIZES, FONTS, SIZE, COLORS } from '../utils/theme';
import { IconButton } from './Button';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { SafeArea } from './SafeArea';
import { Text } from './Text';

export const HomeHeader = ({ organiser, ...props }) => {
  const userinfo = useSelector(selectCurrentUser);
  const navigation = useNavigation();
  const notificationsRead = useSelector(selectNotificationsRead);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onPressNotification = () => {
    setReadNotifications();
    navigation.navigate(ROUTES.NotificationsScreen);
    dispatch(setUnreadNotifications(0));
  };

  const bottomSheetModalRef = useRef(null);

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

  const onPressCreatePost = async () => {
    navigation.navigate(ROUTES.CreatePostScreen);
  };

  return (
    <View>
      <SafeArea />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.TextContainer}>
              <TouchableOpacity onPress={onPressCreatePost}>
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
                  <Text style={styles.welcome}>{t('welcome')}</Text>
                  <Text style={styles.federico}>{userinfo.username}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Row row alignCenter>
              <View>
                <IconButton name="ios-notifications-outline" iconStyle={styles.icon} size={SIZE * 1.85} onPress={onPressNotification} />
                {notificationsRead !== 0 && <View style={styles.notificationDot} />}
              </View>

              <Image resizeMode="contain" style={styles.logo} source={BlueGradientLogo} />
            </Row>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: COLORS.darkGray, height: 0.8 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZE * 4.7,
    marginBottom: SIZE / 2,
    marginTop: -SIZE / 5,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WIDTH_DEVICE / 20,
  },
  logo: {
    width: SIZE * 3.5,
    aspectRatio: 1,
    margin: -SIZE / 2,
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
