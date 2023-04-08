import { AntDesign, Feather } from '@expo/vector-icons';
import { useIsFocused, useNavigation, useScrollToTop } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';

import { Container, ListEmptyComponent, PostCard, Row, Text } from '../../../../components';
import { ROUTES } from '../../../../navigation/Navigation';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';
import { Notes} from './Notes'
import { LinearGradient } from 'expo-linear-gradient';

export const PostsFeedScreen = ({ route }) => {
  const [eventFilter, setEventFilter] = useState();
  const [entity, setEntity] = useState('posts/home');
  const navigation = useNavigation();
  const { event } = route?.params || {};

  console.log('route', route.params)

  const ref = React.useRef(null);
  useScrollToTop(ref);
  
  const isFocused = useIsFocused();

  const { data, getMoreData, getRefreshedData, loadMore, refreshing, getData } = useInfiniteScroll({
    entity,
    limit: 6,
  });

  useEffect(() => {
    if (event) {
      setEventFilter(event?.name);
      setEntity(event ? `events/${event._id}/posts` : 'posts/home');
    }
  }, [event]);

  useEffect(() => {
    if (entity) {
      getData();
    }
  }, [entity, eventFilter, isFocused]);

  const deleteEventFilter = () => {
    setEventFilter('');
    setEntity('posts/home');
    getData();
  };

  return (
    <Container>
      <LinearGradient  start={{ x: 1.2, y: 0 }} end={{ x: 0, y: 0 }} colors={['#32DAE4', '#00A1FF']}>
      <View style={styles.container}>
        <Row alignCenter spaceBetween row>
          <Text semiBoldMd style={{ fontSize: SIZES.lg }} color={COLORS.white}>
            Moments
          </Text>
          <AntDesign name="plus" size={SIZE * 1.6} onPress={() => navigation.navigate(ROUTES.CreatePostScreen)} color={COLORS.white}/>
        </Row>
        <Row row alignCenter style={{ marginTop: SIZE / 4 }}>
          {eventFilter && (
            <>
              <Feather name="x" color={COLORS.white} size={SIZE * 1.2} onPress={deleteEventFilter} />
              <Text color={COLORS.white} regularXs>
                {' '}
                at {eventFilter.toUpperCase()}
              </Text>
            </>
          )}
        </Row>
      </View>
      </LinearGradient>
      <FlatList
        ref={ref}
        data={data}
        renderItem={({ item }) => <PostCard postData={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListHeaderComponent={<Notes />}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="There are no new moments for you" />}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH_DEVICE / 20,
    marginTop: SIZE * 4,
    marginBottom: SIZE,
  },
});
