import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { useSelector } from "react-redux";
import { MiniEventCard, ProfileInfo, Text } from "../components";
import { selectCurrentUserId, selectSelectedUserId } from "../store/user";
import { useInfiniteScroll } from "../utils/hooks";
import _ from 'lodash'
import { RefreshControl } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZE, SIZES } from "../utils/theme";
import { AboutScreen } from "../screens/organiser/profile/about/profileAbout/screen";

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
  }

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
        />
      </Tabs.Tab>
      <Tabs.Tab name="About">
        <Tabs.ScrollView showsVerticalScrollIndicator={false}>
          <AboutScreen account={account}/>
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export const UserTopNavigator = ({ user, account }) => {
  const userId = useSelector(account ? selectSelectedUserId : selectCurrentUserId);
  
  const { data, refreshing, getRefreshedData, getMoreData, loadMore } = useInfiniteScroll({
    entity: `users/${userId}/events`,
    limit: 6,
  });

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
  }

  return (
    <Tabs.Container renderHeader={account ? AccountHeader : MyHeader} tabStyle={styles.tab} renderTabBar={tabBar}>
        <Tabs.Tab name="Posts">
        <Tabs.ScrollView showsVerticalScrollIndicator={false}>
          <Text>Qui ci saranno i post</Text>
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Events">
        <Tabs.FlatList
            data={data}
            renderItem={({ item }) => <MiniEventCard data={item} />}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            onEndReached={_.throttle(getMoreData, 400)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
            ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
          />
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