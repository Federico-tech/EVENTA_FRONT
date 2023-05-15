import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { View, Linking, Alert, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Container, Row, SafeArea, Text } from '../../../../../components';
import { ROUTES } from '../../../../../navigation/Navigation';
import { COLORS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../../utils/theme';
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export const CameraScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    } else if (permission?.status === 'denied') {
      Alert.alert('Permission Required', 'Please allow access to your camera in your device settings to select scan the QR Code.', [
        {
          text: 'Go to Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
    }
  }, [permission]);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        console.log({ data: image });
      } catch (e) {
        console.log({ errorTakingPicture: e });
      }
    }
  };

  const navigateEditStory = () => {
    navigation.navigate(ROUTES.EditStoryScreen, { image });
  };

  const pickImage = async () => {
    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 7],
      quality: 1,
    });
    if (!image.canceled) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(image.assets[0].uri, [{ resize: { width: 500, height: 500 } }], {
        format: ImageManipulator.SaveFormat.PNG,
      });
      setImage(manipulatedImage.uri);
    }
  };

  return (
    <Container>
      <Row style={styles.conatiner}>
        {!image ? (
          <Camera type={type} style={styles.camera} flashMode={flash} ref={cameraRef}>
            <SafeArea>
              <Row column alignCenter spaceBetween style={{ flex: 1 }} width="100%">
                <Row row mt={SIZE} width={WIDTH_DEVICE} spaceBetween style={{ paddingHorizontal: SIZE * 3 }}>
                  <Row>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <AntDesign name="close" size={SIZE * 2} color={COLORS.white} />
                    </TouchableOpacity>
                  </Row>
                  <Row>
                    <TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
                      <MaterialIcons name="switch-camera" size={SIZE * 2} color={COLORS.white} />
                    </TouchableOpacity>
                  </Row>
                  <Row>
                    {flash === Camera.Constants.FlashMode.off ? (
                      <TouchableOpacity onPress={() => setFlash(Camera.Constants.FlashMode.on)}>
                        <MaterialIcons name="flash-off" size={SIZE * 2} color={COLORS.white} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => setFlash(Camera.Constants.FlashMode.off)}>
                        <MaterialIcons name="flash-on" size={SIZE * 2} color={COLORS.white} />
                      </TouchableOpacity>
                    )}
                  </Row>
                </Row>
                <Row>
                  <Row row alignCenter>
                    <TouchableOpacity onPress={takePicture}>
                      <Row row alignCenter style={{ alignSlef: 'center'}} ml={SIZE * 7}>
                        <Entypo name="camera" size={SIZE * 2} color={COLORS.white} />
                        <Text ml={SIZE} color={COLORS.white}>
                          Take a picture!
                        </Text>
                      </Row>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage}>
                      <Row row style={{marginLeft: SIZE * 5}}>
                        <MaterialIcons name="insert-photo" size={SIZE * 2.1} color={COLORS.white}/>
                      </Row>
                    </TouchableOpacity>
                  </Row>
                </Row>
              </Row>
            </SafeArea>
          </Camera>
        ) : (
          <View style={styles.conatiner}>
            <SafeArea>
              <Row ml={SIZE * 2}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="close" size={SIZE * 2} color={COLORS.white} />
                </TouchableOpacity>
              </Row>
              <Image source={{ uri: image }} style={{ width: WIDTH_DEVICE, height: '90%' }} />
              <Row row alignCenter style={{ paddingHorizontal: SIZE * 2 }} spaceBetween mt={SIZE}>
                <TouchableOpacity onPress={() => setImage('')}>
                  <Row row alignCenter>
                    <MaterialCommunityIcons name="camera-retake" color={COLORS.white} size={SIZE * 2} />
                    <Text ml={SIZE} color={COLORS.white} fs={SIZES.md}>
                      Re-Take
                    </Text>
                  </Row>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateEditStory}>
                  <Row row alignCenter>
                    <Entypo name="check" color={COLORS.white} size={SIZE * 2} />
                    <Text ml={SIZE / 2} color={COLORS.white} fs={SIZES.md}>
                      {' '}
                      Next
                    </Text>
                  </Row>
                </TouchableOpacity>
              </Row>
            </SafeArea>
          </View>
        )}
      </Row>
    </Container>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
});
