import _ from 'lodash';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { MaterialTabBar, Tabs, MaterialTabItem } from 'react-native-collapsible-tab-view';
import { RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { ListEmptyComponent, MiniEventCard, PostCard, ProfileInfo, Text } from '../components';
import { selectCurrentUserId, selectCurrentUserRole, selectSelectedUser, selectSelectedUserId } from '../store/user';
import { useInfiniteScroll } from '../utils/hooks';
import { formatNumber } from '../utils/numbers';
import { COLORS, FONTS, SIZE, SIZES } from '../utils/theme';

const tabBar = (props) => (
  <MaterialTabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    labelStyle={styles.tabBar}
    activeColor="white"
    inactiveColor={COLORS.gray}
    TabItemComponent={(itemProps) => <MaterialTabItem {...itemProps} inactiveOpacity={1} pressOpacity={1}/>}
  />
);

export const OrganiserTopNavigator = ({ user, account, isLoading }) => {
  const organiserId = useSelector(account ? selectSelectedUserId : selectCurrentUserId);
  const myId = useSelector(selectCurrentUserId);

  const { data, refreshing, getRefreshedData, getMoreData, loadMore } = useInfiniteScroll({
    entity: 'events',
    limit: 7,
    filters: {
      organiserId,
    },
  });

  console.log({ isLoading });

  const {
    data: postData,
    refreshing: postRefreshing,
    getRefreshedData: getRefreshedPostData,
    getMoreData: getMorePostData,
    totalData: postTotalData,
    loadMorePosts,
  } = useInfiniteScroll({
    entity: `users/${organiserId}/posts`,
    limit: 6,
  });

  const MyHeader = ({ isLoading }) => {
    return (
      <View>
        <ProfileInfo myProfile user={user} loading={isLoading} />
      </View>
    );
  };

  const AccountHeader = () => {
    return (
      <View>
        <ProfileInfo user={user} loading={isLoading} />
      </View>
    );
  };

  return (
    <Tabs.Container
      renderHeader={account ? AccountHeader : MyHeader}
      tabStyle={styles.tab}
      renderTabBar={tabBar}
      renderItem={(itemProps) => <MaterialTabItem {...itemProps} inactiveOpacity={0} />}>
      <Tabs.Tab name="Events">
        {isLoading ? (
          <Tabs.ScrollView>
            <ActivityIndicator style={{ marginTop: SIZE * 5 }} />
          </Tabs.ScrollView>
        ) : user?.isBlocked ? (
          <Tabs.ScrollView>
            <Text color={COLORS.gray} style={{ alignSelf: 'center', marginTop: SIZE * 10 }}>
              Unblock this profile to see its contents
            </Text>
          </Tabs.ScrollView>
        ) : user?.hasBlockedYou ? (
          <Tabs.ScrollView>
            <Text color={COLORS.gray} style={{ alignSelf: 'center', marginTop: SIZE * 10 }}>
              This users blocked you
            </Text>
          </Tabs.ScrollView>
        ) : (
          <Tabs.FlatList
            data={data}
            renderItem={({ item }) => <MiniEventCard scan={myId === organiserId && true} data={item} />}
            keyExtractor={(item) => item._id}
            style={{ marginTop: SIZE }}
            showsVerticalScrollIndicator={false}
            onEndReached={_.throttle(getMoreData, 400)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
            ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
            ListEmptyComponent={!refreshing && <ListEmptyComponent text={`The organizer hasn't created any events yet`} />}
          />
        )}
      </Tabs.Tab>

      <Tabs.Tab name={`Moments (${formatNumber(postTotalData)})`}>
        {isLoading ? (
          <Tabs.ScrollView>
            <ActivityIndicator style={{ marginTop: SIZE * 5 }} />
          </Tabs.ScrollView>
        ) : user?.isBlocked ? (
          <Tabs.ScrollView>
            <Text color={COLORS.gray} style={{ alignSelf: 'center', marginTop: SIZE * 10 }}>
              Unblock this profile to see its contents
            </Text>
          </Tabs.ScrollView>
        ) : user?.hasBlockedYou ? (
          <Tabs.ScrollView>
            <Text color={COLORS.gray} style={{ alignSelf: 'center', marginTop: SIZE * 10 }}>
              This users blocked you
            </Text>
          </Tabs.ScrollView>
        ) : (
          <Tabs.FlatList
            data={postData}
            renderItem={({ item }) => <PostCard postData={item} />}
            keyExtractor={(item) => item._id}
            style={{ marginTop: SIZE }}
            showsVerticalScrollIndicator={false}
            onEndReached={_.throttle(getMorePostData, 400)}
            refreshControl={<RefreshControl refreshing={postRefreshing} onRefresh={getRefreshedPostData} />}
            ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMorePosts && <ActivityIndicator />}</View>}
            ListEmptyComponent={!refreshing && <ListEmptyComponent text="There is no post yet" />}
          />
        )}
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export const UserTopNavigator = ({ user, account, isLoading }) => {
  const userId = useSelector(account ? selectSelectedUserId : selectCurrentUserId);
  const currentUserId = useSelector(selectCurrentUserId);
  const currentUserRole = useSelector(selectCurrentUserRole);
  const updatedUser = useSelector(selectSelectedUser);

  const { data, refreshing, getRefreshedData, getMoreData, loadMore, getData, totalData } = useInfiniteScroll({
    entity: `users/${userId}/events`,
    limit: 6,
  });

  console.log('Events', data);

  const {
    data: postData,
    totalData: postTotalData,
    refreshing: postRefreshing,
    getRefreshedData: getRefreshedPostData,
    getMoreData: getMorePostData,
    loadMorePosts,
  } = useInfiniteScroll({
    entity: `users/${userId}/posts`,
    limit: 6,
  });

  console.debug({ postData });

  useEffect(() => {
    getData();
  }, [updatedUser]);

  const MyHeader = ({ isLoading }) => {
    return (
      <View style={{ backgroundColor: COLORS.white }}>
        <ProfileInfo myProfile user={user} loading={isLoading} />
      </View>
    );
  };

  const AccountHeader = () => {
    return (
      <View style={{ backgroundColor: COLORS.white }}>
        <ProfileInfo user={user} loading={isLoading} />
      </View>
    );
  };

  console.log({ postData });

  return (
    <Tabs.Container
      renderHeader={userId !== currentUserId ? () => <AccountHeader isLoading={isLoading} /> : MyHeader}
      tabStyle={styles.tab}
      renderTabBar={tabBar}
      renderItem={(itemProps) => <MaterialTabItem {...itemProps} inactiveOpacity={0} style={{ backgroundColor: 'red' }} />}>
      <Tabs.Tab name={`Moments (${formatNumber(postTotalData)})`}>
        {isLoading ? (
          <Tabs.ScrollView>
            <ActivityIndicator style={{ marginTop: SIZE * 5 }} />
          </Tabs.ScrollView>
        ) : account && userId !== currentUserId && user?.isBlocked ? (
          <Tabs.ScrollView>
            <Text color={COLORS.gray} style={{ alignSelf: 'center', marginTop: SIZE * 10 }}>
              Unblock this profile to see its contents
            </Text>
          </Tabs.ScrollView>
        ) : account && userId !== currentUserId && user?.hasBlockedYou ? (
          <Tabs.ScrollView>
            <Text color={COLORS.gray} style={{ alignSelf: 'center', marginTop: SIZE * 10 }}>
              This user bloked you
            </Text>
          </Tabs.ScrollView>
        ) : account && userId !== currentUserId && currentUserRole !== 'organiser' ? (
          user.isFollowing ? (
            <Tabs.FlatList
              data={postData}
              renderItem={({ item }) => <PostCard postData={item} />}
              keyExtractor={(item) => item._id}
              style={{ marginTop: SIZE }}
              showsVerticalScrollIndicator={false}
              onEndReached={_.throttle(getMorePostData, 400)}
              refreshControl={<RefreshControl refreshing={postRefreshing} onRefresh={getRefreshedPostData} />}
              ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMorePosts && <ActivityIndicator />}</View>}
              ListEmptyComponent={!refreshing && <ListEmptyComponent text="There is no post yet" />}
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
            style={{ marginTop: SIZE }}
            showsVerticalScrollIndicator={false}
            onEndReached={_.throttle(getMorePostData, 400)}
            refreshControl={<RefreshControl refreshing={postRefreshing} onRefresh={getRefreshedPostData} />}
            ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMorePosts && <ActivityIndicator />}</View>}
            ListEmptyComponent={!refreshing && <ListEmptyComponent text="There is no post yet" />}
          />
        )}
      </Tabs.Tab>
      <Tabs.Tab name={`Events (${formatNumber(totalData)})`}>
        {isLoading ? (
          <Tabs.ScrollView>
            <ActivityIndicator style={{ marginTop: SIZE * 5 }} />
          </Tabs.ScrollView>
        ) : account && userId !== currentUserId && user?.isBlocked ? (
          <Tabs.ScrollView>
            <Text color={COLORS.gray} style={{ alignSelf: 'center', marginTop: SIZE * 10 }}>
              Unblock this profile to see its contents
            </Text>
          </Tabs.ScrollView>
        ) : account && userId !== currentUserId && user?.hasBlockedYou ? (
          <Tabs.ScrollView>
            <Text color={COLORS.gray} style={{ alignSelf: 'center', marginTop: SIZE * 10 }}>
              This user blocked you
            </Text>
          </Tabs.ScrollView>
        ) : account && userId !== currentUserId && currentUserRole !== 'organiser' ? (
          user.isFollowing ? (
            <Tabs.FlatList
              data={data}
              renderItem={({ item }) => <MiniEventCard data={item} />}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: SIZE }}
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
            style={{ marginTop: SIZE }}
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
    marginTop: -SIZE / 2,
    paddingTop: SIZE * 1.8,
    backgroundColor: 'black',
    width: '112%',
    flex: 1,
    textAlign: 'center',
  },
});
