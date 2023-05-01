import { Entypo } from '@expo/vector-icons';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';

import { Container, Header, ListEmptyComponent, PostCard, Row, Text } from '../../../../components';
import { ROUTES } from '../../../../navigation/Navigation';
import { useInfiniteScroll } from '../../../../utils/hooks';
import { COLORS, FONTS, SIZE, SIZES, WIDTH_DEVICE } from '../../../../utils/theme';

export const PostsFeedScreen = ({ route }) => {
  const navigation = useNavigation();
  const { event } = route?.params || {};
  const [entity, setEntity] = useState(event ? `events/${event._id}/posts` : 'posts/home');
  const [eventFilter, setEventFilter] = useState(event?.name);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const { data, getMoreData, getRefreshedData, loadMore, refreshing, getData, setData } = useInfiniteScroll({
    entity,
    limit: 6,
    debug: true,
  });

  const deleteEventFilter = async () => {
    setData([]);
    setEntity('posts/home');
    setEventFilter('');
  };

  useEffect(() => {
    getData();
  }, [eventFilter]);

  const onPressCreateMoment = () => {
    navigation.navigate(ROUTES.CreatePostScreen);
  };

  return (
    <Container>
      <Header title="Moments" plus back onPressPlus={onPressCreateMoment} />
      <FlatList
        ref={ref}
        data={data}
        renderItem={({ item }) => <PostCard postData={item} getData={getData} />}
        keyExtractor={(item) => item._id}
        style={{ paddingTop: SIZE }}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
        ListHeaderComponent={
          eventFilter && (
            <Row row alignEnd spaceBetween mt={SIZE / 2} mb={SIZE / 2} style={{ marginHorizontal: WIDTH_DEVICE / 20 }}>
              <Text ff={FONTS.semiBold} fs={SIZES.sm}>
                at {eventFilter}
              </Text>
              <TouchableOpacity onPress={deleteEventFilter}>
                <Entypo name="circle-with-cross" size={SIZE * 1.4} color={COLORS.primary} />
              </TouchableOpacity>
            </Row>
          )
        }
        ListFooterComponent={<View style={{ marginTop: SIZE  / 4}}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="There are no new moments for you" />}
      />
    </Container>
  );
};
