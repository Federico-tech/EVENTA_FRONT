import _ from 'lodash';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import { RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { ListEmptyComponent, MiniEventCard, PostCard, ProfileInfo, Text } from '../components';
import { AboutScreen } from '../screens/organiser/profile/about/profileAbout/screen';
import { selectCurrentUserId, selectSelectedUser, selectSelectedUserId } from '../store/user';
import { useInfiniteScroll } from '../utils/hooks';
import { COLORS, FONTS, SIZE, SIZES } from '../utils/theme';

const tabBar = (props) => (
  <MaterialTabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'black' }}
    activeColor="black"
    inactiveColor={COLORS.darkGray}
    labelStyle={styles.tabBar}
  />
);

export const OrganiserTopNavigator = ({ user, account }) => {
  const organiserId = useSelector(account ? selectSelectedUserId : selectCurrentUserId);

  const { data, refreshing, getRefreshedData, getMoreData, loadMore } = useInfiniteScroll({
    entity: 'events',
    limit: 7,
    filters: {
      organiserId,
    },
  });

  // const { data: postData, refreshing: refreshingPost, getRefreshedData: getRefreshedPostData, getMoreData: getMorePostData, loadMore: loadMorePost } = useInfiniteScroll({
  //   entity: 'posts',
  //   limit: 7,
  //   filters: {
  //     organiserId,
  //   },
  // });

  const MyHeader = () => {
    return (
      <View>
        <ProfileInfo myProfile user={user} />
      </View>
    );
  };

  const AccountHeader = () => {
    return (
      <View>
        <ProfileInfo user={user} />
      </View>
    );
  };

  return (
    <Tabs.Container renderHeader={account ? AccountHeader : MyHeader} tabStyle={styles.tab} renderTabBar={tabBar}>
      <Tabs.Tab name="Events ">
        <Tabs.FlatList
          data={data}
          renderItem={({ item }) => <MiniEventCard data={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          onEndReached={_.throttle(getMoreData, 400)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
          ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
          ListEmptyComponent={!refreshing && <ListEmptyComponent text={`The organizer hasn't created any events yet`} />}
        />
      </Tabs.Tab>
      <Tabs.Tab name="About">
        <Tabs.ScrollView showsVerticalScrollIndicator={false}>
          <AboutScreen account={account} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export const UserTopNavigator = ({ user, account, isLoading }) => {
  const userId = useSelector(account ? selectSelectedUserId : selectCurrentUserId);
  const currentUserId = useSelector(selectCurrentUserId)
  const updatedUser = useSelector(selectSelectedUser);

  const { data, refreshing, getRefreshedData, getMoreData, loadMore, getData } = useInfiniteScroll({
    entity: `users/${userId}/events`,
    limit: 6,
  });

  const {
    data: postData,
    refreshing: postRefreshing,
    getRefreshedData: getRefreshedPostData,
    getMoreData: getMorePostData,
    loadMorePosts,
  } = useInfiniteScroll({
    entity: `users/${userId}/posts`,
    limit: 6,
  });

  useEffect(() => {
    getData();
  }, [updatedUser]);

  const MyHeader = ({ isLoading }) => {
    return (
      <View>
        <ProfileInfo myProfile user={user} loading={isLoading}/>
      </View>
    ); 
  };

  const AccountHeader = () => {
    return (
      <View>
        <ProfileInfo user={user} loading={isLoading}/>
      </View>
    );
  };

  return (
    <Tabs.Container renderHeader={userId !== currentUserId ? () => (<AccountHeader isLoading={isLoading}/>) : MyHeader} tabStyle={styles.tab} renderTabBar={tabBar}>
      <Tabs.Tab name="Posts">
        {isLoading ? (
          <Tabs.ScrollView>
            <ActivityIndicator style={{ marginTop: SIZE * 5 }} />
          </Tabs.ScrollView>
        ) : account && userId !== currentUserId ? (
          user.isFollowing ? (
            <Tabs.FlatList
              data={postData}
              renderItem={({ item }) => <PostCard postData={item} />}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              onEndReached={_.throttle(getMorePostData, 400)}
              refreshControl={<RefreshControl refreshing={postRefreshing} onRefresh={getRefreshedPostData} />}
              ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMorePosts && <ActivityIndicator />}</View>}
              ListEmptyComponent={!refreshing && <ListEmptyComponent text={'There is no post yet'} />}
            />
          ) : (
            <Tabs.ScrollView>
              <Text color={COLORS.gray} style={{ alignSelf: 'center', marginTop: SIZE * 10 }}>
                Follow this profile to see its content
              </Text>
            </Tabs.ScrollView>
          )
        ) : (
          <Tabs.FlatList
            data={postData}
            renderItem={({ item }) => <PostCard postData={item} />}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            onEndReached={_.throttle(getMorePostData, 400)}
            refreshControl={<RefreshControl refreshing={postRefreshing} onRefresh={getRefreshedPostData} />}
            ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMorePosts && <ActivityIndicator />}</View>}
            ListEmptyComponent={!refreshing && <ListEmptyComponent text={'There is no post yet'} />}
          />
        )}
      </Tabs.Tab>
      <Tabs.Tab name="Events">
        {account && userId !== currentUserId ? (
          user.isFollowing ? (
            <Tabs.FlatList
              data={data}
              renderItem={({ item }) => <MiniEventCard data={item} />}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              onEndReached={_.throttle(getMoreData, 400)}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
              ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
              ListEmptyComponent={!refreshing && <ListEmptyComponent text={`The user hasn't particited to any events yet`} />}
            />
          ) : (
            <Tabs.ScrollView>
              <Text color={COLORS.gray} style={{ alignSelf: 'center', marginTop: SIZE * 10 }}>
                Follow this profile to see its content
              </Text>
            </Tabs.ScrollView>
          )
        ) : (
          <Tabs.FlatList
            data={data}
            renderItem={({ item }) => <MiniEventCard data={item} />}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            onEndReached={_.throttle(getMoreData, 400)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
            ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
            ListEmptyComponent={!refreshing && <ListEmptyComponent text={`The user hasn't particited to any events yet`} />}
          />
        )}
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.sm,
    marginBottom: -SIZE / 2,
    textTransform: 'capitalize',
    marginTop: SIZE / 2,
  },
});
