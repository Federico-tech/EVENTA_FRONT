import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LoginScreen } from '../screens/onboarding/login/screen';
import { OrganiserSignUpScreen } from '../screens/onboarding/register/organiser/screen';
import { UserSingUpScreen } from '../screens/onboarding/register/user/screen';
import { EditOrganiserScreen } from '../screens/organiser/editProfile/screen';
import { CreateEventScreen } from '../screens/organiser/events/create/screen';
import { OrganiserHome } from '../screens/organiser/home/screen';
import { OrganiserProfileScreen } from '../screens/organiser/profile/screen';
import { AddressAutocompleteScreen } from '../screens/shared/autocompleteAddress/screen';
import { SettingScreen } from '../screens/shared/settings/screen';
import { EditUserScreen } from '../screens/user/editProfile/screen';
import { EventDetails } from '../screens/user/eventDetails/screen';
import { HomeScreen } from '../screens/user/home/screen';
import { MapScreen } from '../screens/user/map/screen';
import { ProfileScreen } from '../screens/user/profile/screen';
import { SearchScreen } from '../screens/user/search/screen';
import { SearchEventScreen } from '../screens/user/search/searchEvents/screen';
import { SearchOrganiserScreen } from '../screens/user/search/searchOrganiser/screen';
import { SearchUserScreen } from '../screens/user/search/searchUsers/screen';
import { COLORS, FONTS, SIZE, SIZES } from '../utils/theme';

const UserBottomTabNavigator = createBottomTabNavigator();
const OrganiserBottomTabNavigator = createBottomTabNavigator();

export const ROUTES = {
  HomeScreen: 'HomeScreen',
  HomeNavigator: 'HomeNavigator',
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
};

const BottomBarIcons = ({ route }) => ({
  tabBarLabel: '',
  tabBarIcon: ({ focused, colour }) => {
    let iconName;
    if (route.name === ROUTES.HomeNavigator || route.name === ROUTES.OrganiserHome) {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === ROUTES.SearchScreen) {
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

const screenOptions = (tabBarLabel) => ({
  tabBarLabel,
  tabBarLabelStyle: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.sm,
    textTransform: 'none',
    backgroundColor: 'transparent',
    borderBottomWidth: 0.17,
    borderColor: COLORS.lightGray,
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: COLORS.darkGray,
  },
  tabBarIndicatorStyle: { backgroundColor: 'black' },
  tabBarStyle: { height: SIZE * 3.3 },
});

const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator initialRouteName={ROUTES.HomeScreen}>
      <HomeStackNavigator.Screen name={ROUTES.HomeScreen} component={HomeScreen} options={{ headerShown: false }} />
      <HomeStackNavigator.Screen name={ROUTES.EventDetails} component={EventDetails} options={{ headerShown: false }} />
    </HomeStackNavigator.Navigator>
  );
};

const SearchTopStackNavigator = createMaterialTopTabNavigator();

export const SearchTopNavigator = () => {
  const { t } = useTranslation();
  return (
    <SearchTopStackNavigator.Navigator initialRouteName={ROUTES.SearchEventScreen}>
      <SearchTopStackNavigator.Screen name={ROUTES.SearchEventScreen} component={SearchEventScreen} options={screenOptions(t('event'))} />
      <SearchTopStackNavigator.Screen name={ROUTES.SearchOrganiserScreen} component={SearchOrganiserScreen} options={screenOptions(t('organiser'))} />
      <SearchTopStackNavigator.Screen name={ROUTES.SearchUserScreen} component={SearchUserScreen} options={screenOptions('Account')} />
    </SearchTopStackNavigator.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator initialRouteName="ProfileHome">
      <ProfileStackNavigator.Screen name="ProfileHome" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
      <ProfileStackNavigator.Screen name={ROUTES.EditUserScreen} component={EditUserScreen} options={{ headerShown: false }} />
    </ProfileStackNavigator.Navigator>
  );
};

const OrganiserProfileStackNavigator = createStackNavigator();

export const OrganiserProfileNavigator = () => {
  return (
    <OrganiserProfileStackNavigator.Navigator initialRouteName={ROUTES.OrganiserProfileScreen}>
      <OrganiserProfileStackNavigator.Screen
        name={ROUTES.OrganiserProfileScreen}
        component={OrganiserProfileScreen}
        options={{ headerShown: false }}
      />
      <OrganiserProfileStackNavigator.Screen name={ROUTES.SettingScreen} component={SettingScreen} options={{ headerShown: false }} />
      <OrganiserProfileStackNavigator.Screen name={ROUTES.EditOrganiserScreen} component={EditOrganiserScreen} options={{ headerShown: false }} />
    </OrganiserProfileStackNavigator.Navigator>
  );
};

export const UserBottomNavigator = () => {
  return (
    <UserBottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <UserBottomTabNavigator.Screen name={ROUTES.HomeNavigator} component={HomeNavigator} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.SearchScreen} component={SearchScreen} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.MapScreen} component={MapScreen} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.ProfileScreen} component={ProfileNavigator} options={{ headerShown: false }} />
    </UserBottomTabNavigator.Navigator>
  );
};

export const OrganiserBottomNavigator = () => {
  return (
    <OrganiserBottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <OrganiserBottomTabNavigator.Screen name={ROUTES.OrganiserHome} component={OrganiserHome} options={{ headerShown: false }} />
      <OrganiserBottomTabNavigator.Screen name={ROUTES.CreateEventScreen} component={CreateEventScreen} options={{ headerShown: false }} />
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
