import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import { Container, Header, InputText, Row } from '../../../../../components';
import { ROUTES } from '../../../../../navigation/Navigation';
import { createStory } from '../../../../../services/stories';
import { selectCurrentUserId } from '../../../../../store/user';
import { SIZE, WIDTH_DEVICE } from '../../../../../utils/theme';

export const EditStoryScreen = ({ route }) => {
  const { image } = route.params;
  const [caption, setCaption] = useState('');
  const userId = useSelector(selectCurrentUserId);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState();

  const onPressCreateStory = async () => {
    setIsLoading(true);
    await createStory({ contentImage: image, userId, caption });
    navigation.navigate(ROUTES.HomeScreen);
    setIsLoading(false);
  };

  return (
    <Container>
      <Header title="Create a story" cancel create onPress={onPressCreateStory} loading={isLoading} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Row style={{ marginHorizontal: WIDTH_DEVICE / 20 }} width={WIDTH_DEVICE * 0.9}>
          <Image source={{ uri: image }} style={styles.imageStyle} />
          <InputText label="Caption" onChangeText={setCaption} maxLength={40} value={caption} />
        </Row>
      </KeyboardAwareScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: SIZE * 20,
    height: SIZE * 33,
    marginTop: SIZE * 3,
    alignSelf: 'center',
    marginBottom: SIZE * 2,
  },
});
