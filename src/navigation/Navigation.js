import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginScreen } from '../screens/onboarding/login/screen';
import { OrganiserSignUpScreen } from '../screens/onboarding/register/organiser/screen';
import { UserSingUpScreen } from '../screens/onboarding/register/user/screen';
import { CreateEventScreen } from '../screens/organiser/events/create/screen';
import { EditEventScreen } from '../screens/organiser/events/edit/screen';
import { OrganiserHome } from '../screens/organiser/home/screen';
import { AccountOrganiserScreen } from '../screens/organiser/profile/accountProfile/screen';
import { EditOrganiserScreen } from '../screens/organiser/profile/editProfile/screen';
import { OrganiserProfileScreen } from '../screens/organiser/profile/screen';
import { AddressAutocompleteScreen } from '../screens/shared/autocompleteAddress/screen';
import { FollowersScreen } from '../screens/shared/followers/screen';
import { FollowingScreen } from '../screens/shared/following/screen';
import { ParticipantsScreen } from '../screens/shared/participants/screen';
import { SettingScreen } from '../screens/shared/settings/screen';
import { EventDetails } from '../screens/user/home/eventDetails/screen';
import { HomeScreen } from '../screens/user/home/home/screen';
import { LikeScreen } from '../screens/user/home/like/screen';
import { NotificationsScreen } from '../screens/user/home/notifications/screen';
import { MapScreen } from '../screens/user/map/screen';
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
  SearchScreen: 'SearchScreen',
  ProfileScreen: 'ProfileScreen',
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
    } else if (route.name === ROUTES.MapScreen) {
      iconName = focused ? 'map' : 'map-outline';
    } else if (route.name === ROUTES.ProfileScreen || route.name === ROUTES.OrganiserProfileScreen) {
      iconName = focused ? 'person' : 'person-outline';
    } else if (route.name === ROUTES.CreateEventScreen) {
      iconName = focused ? 'add-circle' : 'add-circle-outline';
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
    </SearchStackNavigator.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator initialRouteName="ProfileHome">
      <ProfileStackNavigator.Screen name="ProfileHome" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.EditUserScreen} component={EditUserScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.FollowersScreen} component={FollowersScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.FollowingScreen} component={FollowingScreen} options={{ headerShown: false }} />
    </ProfileStackNavigator.Navigator>
  );
};

const OrganiserHomeStackNavigator = createStackNavigator();

export const OrganiserHomeNavigator = () => {
  return (
    <OrganiserHomeStackNavigator.Navigator>
      <OrganiserHomeStackNavigator.Screen name={ROUTES.OrganiserHome} component={OrganiserHome} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.EventDetails} component={EventDetails} options={{ headerShown: false }} />
      <OrganiserHomeStackNavigator.Screen name={ROUTES.EditEventScreen} component={EditEventScreen} options={{ headerShown: false }} />
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
      <OrganiserProfileStackNavigator.Screen name={ROUTES.EditOrganiserScreen} component={EditOrganiserScreen} options={{ headerShown: false }} />
      <OrganiserProfileStackNavigator.Screen name={ROUTES.EditEventScreen} component={EditEventScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.EventDetails} component={EventDetails} options={{ headerShown: false }} />
    </OrganiserProfileStackNavigator.Navigator>
  );
};

export const UserBottomNavigator = () => {
  return (
    <UserBottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <UserBottomTabNavigator.Screen name={ROUTES.HomeNavigator} component={HomeNavigator} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.SearchNavigator} component={SearchNavigator} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.MapScreen} component={MapScreen} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.ProfileScreen} component={ProfileNavigator} options={{ headerShown: false }} />
    </UserBottomTabNavigator.Navigator>
  );
};

export const OrganiserBottomNavigator = () => {
  return (
    <OrganiserBottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <OrganiserBottomTabNavigator.Screen name={ROUTES.OrganiserHomeNavigator} component={OrganiserHomeNavigator} options={{ headerShown: false }} />
      <OrganiserBottomTabNavigator.Screen name={ROUTES.SearchNavigator} component={SearchNavigator} options={{ headerShown: false }} />
      <OrganiserBottomTabNavigator.Screen name={ROUTES.CreateEventScreen} component={CreateEventScreen} options={{ headerShown: false }} />
      <OrganiserBottomTabNavigator.Screen name={ROUTES.MapScreen} component={MapScreen} options={{ headerShown: false }} />
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
      <AuthStackNavigator.Screen name={ROUTES.AddressAutocompleteScreen} component={AddressAutocompleteScreen} options={{ headerShown: false }} />
    </AuthStackNavigator.Navigator>
  );
};

const OrganiserStackNavigator = createStackNavigator();

export const OrganiserStack = () => {
  return (
    <OrganiserStackNavigator.Navigator initialRouteName="organiserStack" screenOptions={{ headerShown: false }}>
      <OrganiserStackNavigator.Screen name="organiserStack" component={OrganiserBottomNavigator} />
      <OrganiserStackNavigator.Group screenOptions={{ presentation: 'modal' }}>
        <OrganiserStackNavigator.Screen name={ROUTES.AddressAutocompleteScreen} component={AddressAutocompleteScreen} />
      </OrganiserStackNavigator.Group>
    </OrganiserStackNavigator.Navigator>
  );
};
