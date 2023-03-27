import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Container, Row, Text } from '../../../../components';
import { ROUTES } from '../../../../navigation/Navigation';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const PostsFeedScreen = () => {
  const navigation = useNavigation();

  const { data } = useInfiniteScroll({
    entity: 'posts'
  })

  console.log('posts', data)

  return (
    <Container>
      <View style={styles.container}>
        <Row alignCenter spaceBetween row>
          <Text semiBoldMd style={{ fontSize: SIZES.lg }}>
            Posts
          </Text>
          <AntDesign name="plus" size={SIZE * 1.6} onPress={() => navigation.navigate(ROUTES.CreatePostScreen)} />
        </Row>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 4.5,
  },
});
