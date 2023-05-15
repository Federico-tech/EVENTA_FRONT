import _ from 'lodash';
import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, Touchable, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';

import { useInfiniteScroll } from '../utils/hooks';
import { COLORS, HEIGHT_DEVICE, SIZE, SIZES, WIDTH_DEVICE } from '../utils/theme';
import { LoadingImage } from './LoadingImage';
import { Row } from './Row';
import { Text } from './Text';

const StoryOpened = ({ storyData }) => {
  return (
    <View style={{ width: WIDTH_DEVICE, height: HEIGHT_DEVICE * 0.9, marginTop: SIZE }}>
      <LoadingImage source={storyData.contentImage} imageStyle={styles.openedStory} viewStyle={styles.openedStory} event ActivityIndicator />
    </View>
  );
};

const StoryModal = ({ isVisible, onBackdropPress, event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, getMoreData } = useInfiniteScroll({
    entity: 'stories',
    limit: 1,
  });

  const handleMomentumScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / contentOffset.width);
    setCurrentIndex(index);
  };

  console.debug({ stories: data });

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} backdropOpacity={1} animationIn="slideInUp" animationOutTiming={250}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        data={data}
        keyExtractor={(item) => item._id}
        style={{ marginHorizontal: -WIDTH_DEVICE / 20, marginTop: SIZE }}
        renderItem={({ item }) => <StoryOpened storyData={item} />}
        scrollEventThrottle={16}
        onEndReached={_.throttle(getMoreData, 400)}
        horizontal
        pagingEnabled
      />
    </Modal>
  );
};

const Story = ({ storyData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <GestureRecognizer onSwipeDown={() => setIsModalVisible(false)} style={{ flex: 1 }}>
      <View>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Row column alignCenter mr={SIZE} mt={SIZE} mb={SIZE} width={SIZE * 4}>
            <LoadingImage width={SIZE * 4} imageStyle={{ borderColor: COLORS.primary, borderWidth: 2 }} profile source={storyData.contentImage} />
            <Text fs={SIZES.xxs} numberOfLines={1}>
              {storyData.user.username}
            </Text>
          </Row>
        </TouchableOpacity>
        <StoryModal isVisible={isModalVisible} />
      </View>
    </GestureRecognizer>
  );
};

export const Stories = () => {
  const { data, getMoreData, loadMore } = useInfiniteScroll({
    entity: 'stories',
    limiti: 10,
  });

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Story storyData={item} />}
        keyExtractor={(item) => item._id}
        horizontal
        style={{ paddingHorizontal: SIZE / 2 }}
        onEndReachedThreshold={0.1}
        onEndReached={_.throttle(getMoreData, 400)}
        ListFooterComponent={
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: SIZE * 4.5 }}>{loadMore && <ActivityIndicator />}</View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    height: HEIGHT_DEVICE * 0.9,
    borderRadius: SIZES.xxs,
    width: WIDTH_DEVICE,
  },
  openedStory: {
    width: WIDTH_DEVICE,
    height: HEIGHT_DEVICE * 0.9,
    borderWidth: 0,
    aspectRatio: null
  },
});
