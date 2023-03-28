import { AntDesign, Feather } from '@expo/vector-icons';
import { useIsFocused, useNavigation, useScrollToTop } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';

import { Container, Line, PostCard, Row, Text } from '../../../../components';
import { ROUTES } from '../../../../navigation/Navigation';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const PostsFeedScreen = ({route}) => {
  const [eventFilter, setEventFilter ] = useState()
  const [entity, setEntity ] = useState('posts/home')
  const navigation = useNavigation();
  const { event } = route?.params || {}

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const { data, getMoreData, getRefreshedData, loadMore, refreshing, getData } = useInfiniteScroll({
    entity: entity,
    limit: 6,
  });

  useEffect(() => {
    if (event) {
      setEventFilter(event?.name)
      setEntity(event ? `events/${event._id}/posts` : 'posts/home')
    }
  }, [event])
  
  useEffect(() => {
    if (entity) {
      getData()
    }
  }, [entity, eventFilter])

  const deleteEventFilter = () => {
    setEventFilter('')
    setEntity('posts/home')
    getData()
  }


  return (
    <Container>
      <View style={styles.container}>
        <Row alignCenter spaceBetween row>
          <Text semiBoldMd style={{ fontSize: SIZES.lg }}>
            Moments
          </Text>
          <AntDesign name="plus" size={SIZE * 1.6} onPress={() => navigation.navigate(ROUTES.CreatePostScreen)} />
        </Row>
        <Row row alignCenter style={{marginTop: SIZE / 4}}>
          {eventFilter && 
          <>
            <Feather name='x' color={COLORS.gray} size={SIZE* 1.2} onPress={deleteEventFilter}/>
            <Text color={COLORS.gray} regularXs> at {eventFilter.toUpperCase()}</Text>
           </>
          }
        </Row>
      </View>
      <FlatList
        ref={ref}
        data={data}
        renderItem={({ item }) => <PostCard postData={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 4,
  },
});
