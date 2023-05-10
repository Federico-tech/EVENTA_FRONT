import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Linking, Alert, StyleSheet, Touchable, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Container, Row, SafeArea } from '../../../../components';
import { COLORS, SIZE } from '../../../../utils/theme';

export const CreateStoryScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

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

  return (
    <Container>
      <Row style={styles.conatiner}>
        <Camera type={type} style={styles.camera} flashMode={flash} ref={cameraRef}>
          <SafeArea>
            <Row row alignCenter mt={SIZE}>
              <TouchableOpacity>
                <Row>
                  <MaterialIcons name="switch-camera" size={SIZE * 2} color={COLORS.white} />
                </Row>
              </TouchableOpacity>
              <TouchableOpacity>
                <Row>
                  <FontAwesome name="flash" size={SIZE * 2} color={COLORS.white} />
                </Row>
              </TouchableOpacity>
            </Row>

            <TouchableOpacity>
              <Row>
                <Entypo name="camera" size={SIZE * 2} color={COLORS.white} />
                <Text>Take a picture!</Text>
              </Row>
            </TouchableOpacity>
          </SafeArea>
        </Camera>
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
