import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';

import { BlueLogo } from '../assets';
import { LoginScreen } from '../screens/onboarding/login/screen';
import { OrganiserSignUpScreen } from '../screens/onboarding/register/organiser/screen';
import { UserSingUpScreen } from '../screens/onboarding/register/user/screen';
import { CreateEventScreen } from '../screens/organiser/events/create/screen';
import { EditEventScreen } from '../screens/organiser/events/edit/screen';
import { PopularEventsScreen } from '../screens/organiser/events/popular/screen';
import { OrganiserHome } from '../screens/organiser/home/screen';
import { AccountOrganiserScreen } from '../screens/organiser/profile/accountProfile/screen';
import { EditOrganiserScreen } from '../screens/organiser/profile/editProfile/screen';
import { OrganiserProfileScreen } from '../screens/organiser/profile/profile/screen';
import { SearchOrganiserEventsScreen } from '../screens/organiser/profile/searchEvents/screen';
import { ScannerScreen } from '../screens/organiser/scanner/screen';
import { AddressAutocompleteScreen } from '../screens/shared/autocompleteAddress/screen';
import { FollowersScreen } from '../screens/shared/followers/screen';
import { FollowingScreen } from '../screens/shared/following/screen';
import { ParticipantsScreen } from '../screens/shared/participants/screen';
import { PrivacyPolicyScreen } from '../screens/shared/privacyPolicy/screen';
import { SettingScreen } from '../screens/shared/settings/screen';
import { EventDetails } from '../screens/user/home/eventDetails/screen';
import { HomeScreen } from '../screens/user/home/home/screen';
import { LikeScreen } from '../screens/user/home/like/screen';
import { NotificationsScreen } from '../screens/user/home/notifications/screen';
import { MapScreen } from '../screens/user/map/screen';
import { CreatePostScreen } from '../screens/user/posts/createPost/screen';
import { NoteFiresScreen } from '../screens/user/posts/noteFires/screen';
import { PostCommentScreen } from '../screens/user/posts/postComments/screen';
import { PostLikesScreen } from '../screens/user/posts/postLikes/screen';
import { PostsFeedScreen } from '../screens/user/posts/postsFeed/screen';
import { AccountUserScreen } from '../screens/user/profile/accountProfile/screen';
import { EditUserScreen } from '../screens/user/profile/editProfile/screen';
import { ProfileScreen } from '../screens/user/profile/userProfile/screen';
import { SearchScreen } from '../screens/user/search/screen';
import { SIZE } from '../utils/theme';

const UserBottomTabNavigator = createBottomTabNavigator();
const OrganiserBottomTabNavigator = createBottomTabNavigator();

export const ROUTES = {
  HomeScreen: 'HomeScreen',
  HomeNavigator: 'HomeNavigator',
  OrganiserHomeNavigator: 'OrganiserHomeNavigator',
  UserBottomNavigator: 'UserBottomNavigator',
  OrganiserStack: 'OrganiserStack',
  UserStack: 'UserStack',
  MapNavigator: 'MapNavigator',
  PostsNavigator: 'PostsNavigator',
  SearchScreen: 'SearchScreen',
  ProfileScreen: 'ProfileScreen',
  ProfileScreenNavigator: 'ProfileScreenNavigator',
  MapScreen: 'MapScreen',
  EventDetails: 'EventDetails',
  LoginScreen: 'LoginScreen',
  UserSingUpScreen: 'UserSignUpScreen',
  OrganiserSignUpScreen: 'OrganiserSignUpScreen',
  OrganiserHome: 'OrganiserHomeScreen',
  CreateEventScreen: 'CreateEventScreen',
  OrganiserProfileScreen: 'OrganiserProfileScreen',
  SearchOrganiserScreen: 'SearchOrganiserScreen',
  SearchEventScreen: 'SearchEventScreen',
  SearchUserScreen: 'SearchUserScreen',
  AddressAutocompleteScreen: 'AddressAutocompleteScreen',
  SettingScreen: 'SettingScreen',
  EditUserScreen: 'EditUserScreen',
  EditOrganiserScreen: 'EditOrganiserScreen',
  LikeScreen: 'LikeScreen',
  NotificationsScreen: 'NotificationsScreen',
  OrganiserProfileNavigator: 'OrganiserProfileNavigator',
  AccountUserScreen: 'AccountUserScreen',
  SearchNavigator: 'SearchNavigator',
  AboutScreen: 'AboutScreen',
  EventProfileScreen: 'EventProfileScreen',
  AccountOrganiserScreen: 'AccountOrganiserScreen',
  FollowersScreen: 'FollowersScreen',
  FollowingScreen: 'FollowingScreen',
  ParticipantsScreen: 'ParticipantsScreen',
  EventsAccountScreen: 'EventsAccountScreen',
  AboutAccountScreen: 'AboutAccountScreen',
  EditEventScreen: 'EditEventScreen',
  UpcomingEventsScreen: 'UpcomingEventsScreen',
  PastEventsScreen: 'PastEventsScreen',
  SearchOrganiserEventsScreen: 'SearchOrganiserEventsScreen',
  OrganiserBottomNavigator: 'OrganiserBottomNavigator',
  FollowingOrganisersScreen: 'FollowingOrganisersScreen',
  FollowingUsersScreen: 'FollowingUsersScreen',
  CreatePostScreen: 'PreatePostScreen',
  PostsFeedScreen: 'PostsFeedScreen',
  ScannerScreen: 'ScannerScreen',
  PostLikesScreen: 'PostLikesScreen',
  NoteFiresScreen: 'NoteFiresScreen',
  PostCommentScreen: 'PostCommentScreen',
  PopularEventsScreen: 'PopularEventsScreen',
  PrivacyPolicyScreen: 'PrivacyPolicyScreen',
};

const BottomBarIcons = ({ route }) => ({
  tabBarLabel: '',
  tabBarHideOnKeyboard: true,
  tabBarIcon: ({ focused, colour }) => {
    let iconName;
    if (route.name === ROUTES.HomeNavigator || route.name === ROUTES.OrganiserHomeNavigator) {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === ROUTES.SearchNavigator) {
      iconName = focused ? 'ios-search' : 'ios-search-outline';
    } else if (route.name === ROUTES.MapNavigator) {
      iconName = focused ? 'map' : 'map-outline';
    } else if (route.name === ROUTES.ProfileScreenNavigator || route.name === ROUTES.OrganiserProfileScreen) {
      iconName = focused ? 'person' : 'person-outline';
    } else if (route.name === ROUTES.CreateEventScreen) {
      iconName = focused ? 'add-circle' : 'add-circle-outline';
    } else if (route.name === ROUTES.PostsNavigator) {
      return <Image source={BlueLogo} style={{ width: SIZE * 2.2, height: SIZE * 2.2, marginTop: SIZE / 2 }} />;
    }
    return <Ionicons name={iconName} size={SIZE * 2} colour={colour} style={{ marginTop: SIZE / 2 }} />;
  },
});

const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator initialRouteName={ROUTES.HomeScreen}>
      <HomeStackNavigator.Screen name={ROUTES.HomeScreen} component={HomeScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.EventDetails} component={EventDetails} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.LikeScreen} component={LikeScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.NotificationsScreen} component={NotificationsScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.ParticipantsScreen} component={ParticipantsScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.AccountUserScreen} component={AccountUserScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.AccountOrganiserScreen} component={AccountOrganiserScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.ProfileScreen} component={ProfileScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.MapScreen} component={MapScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.FollowersScreen} component={FollowersScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.FollowingScreen} component={FollowingScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.SearchOrganiserEventsScreen} component={SearchOrganiserEventsScreen} options={{ headerShown: false }} />
    </HomeStackNavigator.Navigator>
  );
};

export const SearchStackNavigator = createStackNavigator();

export const SearchNavigator = () => {
  return (
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen name={ROUTES.SearchScreen} component={SearchScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.AccountUserScreen} component={AccountUserScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.AccountOrganiserScreen} component={AccountOrganiserScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.EventDetails} component={EventDetails} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.FollowersScreen} component={FollowersScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.FollowingScreen} component={FollowingScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.ParticipantsScreen} component={ParticipantsScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen
        name={ROUTES.SearchOrganiserEventsScreen}
        component={SearchOrganiserEventsScreen}
        options={{ headerShown: false }}
      />
    </SearchStackNavigator.Navigator>
  );
};

const PostsStackNaviagtor = createStackNavigator();

export const PostsNavigator = () => {
  return (
    <PostsStackNaviagtor.Navigator>
      <PostsStackNaviagtor.Screen name={ROUTES.PostsFeedScreen} component={PostsFeedScreen} options={{ headerShown: false }} />
      <PostsStackNaviagtor.Screen name={ROUTES.CreatePostScreen} component={CreatePostScreen} options={{ headerShown: false }} />
      <PostsStackNaviagtor.Screen name={ROUTES.AccountUserScreen} component={AccountUserScreen} options={{ headerShown: false }} />
      <PostsStackNaviagtor.Screen name={ROUTES.PostLikesScreen} component={PostLikesScreen} options={{ headerShown: false }} />
      <PostsStackNaviagtor.Screen name={ROUTES.NoteFiresScreen} component={NoteFiresScreen} options={{ headerShown: false }} />
      <PostsStackNaviagtor.Screen name={ROUTES.FollowersScreen} component={FollowersScreen} options={{ headerShown: false }} />
      <PostsStackNaviagtor.Screen name={ROUTES.FollowingScreen} component={FollowingScreen} options={{ headerShown: false }} />
    </PostsStackNaviagtor.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator initialRouteName={ROUTES.ProfileScreen}>
      <ProfileStackNavigator.Screen name={ROUTES.ProfileScreen} component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.SettingScreen} component={SettingScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.EventDetails} component={EventDetails} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.HomeScreen} component={HomeScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.MapScreen} component={MapScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.AccountUserScreen} component={AccountUserScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.FollowersScreen} component={FollowersScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.FollowingScreen} component={FollowingScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.AccountOrganiserScreen} component={AccountOrganiserScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.PostLikesScreen} component={PostLikesScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.PrivacyPolicyScreen} component={PrivacyPolicyScreen} options={{ headerShown: false }} />
    </ProfileStackNavigator.Navigator>
  );
};

const OrganiserHomeStackNavigator = createStackNavigator();

export const OrganiserHomeNavigator = () => {
  return (
    <OrganiserHomeStackNavigator.Navigator>
      <OrganiserHomeStackNavigator.Screen name={ROUTES.OrganiserHome} component={OrganiserHome} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.EventDetails} component={EventDetails} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.AccountOrganiserScreen} component={AccountOrganiserScreen} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.ParticipantsScreen} component={ParticipantsScreen} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.OrganiserProfileScreen} component={OrganiserProfileScreen} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.ScannerScreen} component={ScannerScreen} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.AccountUserScreen} component={AccountUserScreen} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.FollowersScreen} component={FollowersScreen} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.FollowingScreen} component={FollowingScreen} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.PopularEventsScreen} component={PopularEventsScreen} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen
        name={ROUTES.SearchOrganiserEventsScreen}
        component={SearchOrganiserEventsScreen}
        options={{ headerShown: false }}
      />
    </OrganiserHomeStackNavigator.Navigator>
  );
};

const OrganiserProfileStackNavigator = createStackNavigator();

export const OrganiserProfileNavigator = () => {
  return (
    <OrganiserProfileStackNavigator.Navigator initialRouteName={ROUTES.OrganiserProfileScreen}>
      <OrganiserProfileStackNavigator.Screen
        name={ROUTES.OrganiserProfileNavigator}
        component={OrganiserProfileScreen}
        options={{ headerShown: false }}
      />
      <OrganiserProfileStackNavigator.Screen name={ROUTES.SettingScreen} component={SettingScreen} options={{ headerShown: false }} />
      <OrganiserProfileStackNavigator.Screen name={ROUTES.EventDetails} component={EventDetails} options={{ headerShown: false }} />
      <OrganiserProfileStackNavigator.Screen name={ROUTES.FollowersScreen} component={FollowersScreen} options={{ headerShown: false }} />
      <OrganiserProfileStackNavigator.Screen name={ROUTES.ParticipantsScreen} component={ParticipantsScreen} options={{ headerShown: false }} />
      <OrganiserProfileStackNavigator.Screen name={ROUTES.PrivacyPolicyScreen} component={PrivacyPolicyScreen} options={{ headerShown: false }} />
      <OrganiserProfileStackNavigator.Screen name={ROUTES.NotificationsScreen} component={NotificationsScreen} options={{ headerShown: false }} />
      <OrganiserProfileStackNavigator.Screen
        name={ROUTES.SearchOrganiserEventsScreen}
        component={SearchOrganiserEventsScreen}
        options={{ headerShown: false }}
      />
    </OrganiserProfileStackNavigator.Navigator>
  );
};

const MapStackNavigator = createStackNavigator();

export const MapNavigator = () => {
  return (
    <MapStackNavigator.Navigator initialRouteName={ROUTES.MapScreen}>
      <MapStackNavigator.Screen name={ROUTES.MapScreen} component={MapScreen} options={{ headerShown: false }} />
      <MapStackNavigator.Screen name={ROUTES.EventDetails} component={EventDetails} options={{ headerShown: false }} />
      <MapStackNavigator.Screen name={ROUTES.AccountOrganiserScreen} component={AccountOrganiserScreen} options={{ headerShown: false }} />
      <MapStackNavigator.Screen name={ROUTES.SearchOrganiserEventsScreen} component={SearchOrganiserEventsScreen} options={{ headerShown: false }} />
      <MapStackNavigator.Screen name={ROUTES.FollowersScreen} component={FollowersScreen} options={{ headerShown: false }} />
      <MapStackNavigator.Screen name={ROUTES.AccountUserScreen} component={AccountUserScreen} options={{ headerShown: false }} />
      <MapStackNavigator.Screen name={ROUTES.FollowingScreen} component={FollowingScreen} options={{ headerShown: false }} />
      <MapStackNavigator.Screen name={ROUTES.PostsFeedScreen} component={PostsFeedScreen} options={{ headerShown: false }} />
      <MapStackNavigator.Screen name={ROUTES.ParticipantsScreen} component={ParticipantsScreen} options={{ headerShown: false }} />
    </MapStackNavigator.Navigator>
  );
};

export const UserBottomNavigator = () => {
  return (
    <UserBottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <UserBottomTabNavigator.Screen name={ROUTES.HomeNavigator} component={HomeNavigator} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.SearchNavigator} component={SearchNavigator} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.PostsNavigator} component={PostsNavigator} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.MapNavigator} component={MapNavigator} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.ProfileScreenNavigator} component={ProfileNavigator} options={{ headerShown: false }} />
    </UserBottomTabNavigator.Navigator>
  );
};

export const OrganiserBottomNavigator = () => {
  return (
    <OrganiserBottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <OrganiserBottomTabNavigator.Screen name={ROUTES.OrganiserHomeNavigator} component={OrganiserHomeNavigator} options={{ headerShown: false }} />
      <OrganiserBottomTabNavigator.Screen name={ROUTES.SearchNavigator} component={SearchNavigator} options={{ headerShown: false }} />
      <OrganiserBottomTabNavigator.Screen name={ROUTES.CreateEventScreen} component={CreateEventScreen} options={{ headerShown: false }} />
      <OrganiserBottomTabNavigator.Screen name={ROUTES.MapNavigator} component={MapNavigator} options={{ headerShown: false }} />
      <OrganiserBottomTabNavigator.Screen
        name={ROUTES.OrganiserProfileScreen}
        component={OrganiserProfileNavigator}
        options={{ headerShown: false }}
      />
    </OrganiserBottomTabNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator initialRouteName={ROUTES.LoginScreen}>
      <AuthStackNavigator.Screen name={ROUTES.LoginScreen} component={LoginScreen} options={{ headerShown: false }} />
      <AuthStackNavigator.Screen name={ROUTES.UserSingUpScreen} component={UserSingUpScreen} options={{ headerShown: false }} />
      <AuthStackNavigator.Screen name={ROUTES.OrganiserSignUpScreen} component={OrganiserSignUpScreen} options={{ headerShown: false }} />
      <AuthStackNavigator.Screen name={ROUTES.PrivacyPolicyScreen} component={PrivacyPolicyScreen} options={{ headerShown: false }} />
      <AuthStackNavigator.Group screenOptions={{ presentation: 'modal' }}>
        <AuthStackNavigator.Screen name={ROUTES.AddressAutocompleteScreen} component={AddressAutocompleteScreen} options={{ headerShown: false }} />
      </AuthStackNavigator.Group>
    </AuthStackNavigator.Navigator>
  );
};

const OrganiserStackNavigator = createStackNavigator();

export const OrganiserStack = () => {
  return (
    <OrganiserStackNavigator.Navigator initialRouteName={ROUTES.OrganiserStack} screenOptions={{ headerShown: false }}>
      <OrganiserStackNavigator.Screen name={ROUTES.OrganiserStack} component={OrganiserBottomNavigator} />
      <OrganiserStackNavigator.Group screenOptions={{ presentation: 'modal' }}>
        <OrganiserStackNavigator.Screen name={ROUTES.AddressAutocompleteScreen} component={AddressAutocompleteScreen} />
      </OrganiserStackNavigator.Group>
      <OrganiserStackNavigator.Screen name={ROUTES.EditOrganiserScreen} component={EditOrganiserScreen} />
      <OrganiserStackNavigator.Screen name={ROUTES.EditEventScreen} component={EditEventScreen} />
    </OrganiserStackNavigator.Navigator>
  );
};

const UserStackNavigator = createStackNavigator();

export const UserStack = () => {
  return (
    <UserStackNavigator.Navigator initialRouteName={ROUTES.UserStack} screenOptions={{ headerShown: false }}>
      <UserStackNavigator.Screen name={ROUTES.UserBottomNavigator} component={UserBottomNavigator} />
      <UserStackNavigator.Group>
        <UserStackNavigator.Screen name={ROUTES.EditUserScreen} component={EditUserScreen} />
        <UserStackNavigator.Screen name={ROUTES.PostCommentScreen} component={PostCommentScreen} />
      </UserStackNavigator.Group>
    </UserStackNavigator.Navigator>
  );
};
