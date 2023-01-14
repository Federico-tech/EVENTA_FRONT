import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginScreen } from '../screens/onboarding/login/screen';
import { OrganiserSignUpScreen } from '../screens/onboarding/register/organizer/screen';
import { UserSingUpScreen } from '../screens/onboarding/register/user/screen';
import { CreateEventScreen } from '../screens/organiser/events/create/screen';
import { OrganiserHome } from '../screens/organiser/home/screen';
import { OrganiserProfileScreen } from '../screens/organiser/profile/screen';
import { AddressAutocompleteScreen } from '../screens/shared/autocompleteAddress/screen';
import { EventDetails } from '../screens/user/eventDetails/screen';
import { HomeScreen } from '../screens/user/home/screen';
import { MapScreen } from '../screens/user/map/screen';
import { ProfileScreen } from '../screens/user/profile/screen';
import { SearchScreen } from '../screens/user/search/screen';
import { SearchEventScreen } from '../screens/user/search/searchEvents/screen';
import { SearchOrganiserScreen } from '../screens/user/search/searchOrganiser/screen';
import { SearchUserScreen } from '../screens/user/search/searchUsers/screen';
import { COLORS, FONTS, SIZE, SIZES, TAB_BAR_HEIGHT } from '../utils/theme';

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
    return <Ionicons name={iconName} size={22} colour={colour} />;
  },
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
  return (
    <SearchTopStackNavigator.Navigator
      tabBarOptions={{ style: { backgroundColor: 'transparent', height: TAB_BAR_HEIGHT, borderBottomWidth: 0.17, borderColor: COLORS.lightGray } }}>
      <SearchTopStackNavigator.Screen
        name={ROUTES.SearchEventScreen}
        component={SearchEventScreen}
        options={{
          tabBarLabel: 'Event',
          tabBarLabelStyle: { color: 'black', fontFamily: FONTS.semiBold, fontSize: SIZES.sm, textTransform: 'none', marginBottom: SIZE },
          tabBarIndicatorStyle: { backgroundColor: 'black' },
        }}
      />
      <SearchTopStackNavigator.Screen
        name={ROUTES.SearchOrganiserScreen}
        component={SearchOrganiserScreen}
        options={{
          tabBarLabel: 'Organiser',
          tabBarLabelStyle: { color: 'black', fontFamily: FONTS.semiBold, fontSize: SIZES.sm, textTransform: 'none', marginBottom: SIZE },
          tabBarIndicatorStyle: { backgroundColor: 'black' },
        }}
      />
      <SearchTopStackNavigator.Screen
        name={ROUTES.SearchUserScreen}
        component={SearchUserScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarLabelStyle: { color: 'black', fontFamily: FONTS.semiBold, fontSize: SIZES.sm, textTransform: 'none', marginBottom: SIZE },
          tabBarIndicatorStyle: { backgroundColor: 'black' },
        }}
      />
    </SearchTopStackNavigator.Navigator>
  );
};

export const UserBottomNavigator = () => {
  return (
    <UserBottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <UserBottomTabNavigator.Screen name={ROUTES.HomeNavigator} component={HomeNavigator} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.SearchScreen} component={SearchScreen} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.MapScreen} component={MapScreen} />
      <UserBottomTabNavigator.Screen name={ROUTES.ProfileScreen} component={ProfileScreen} />
    </UserBottomTabNavigator.Navigator>
  );
};

export const OrganiserBottomNavigator = () => {
  return (
    <OrganiserBottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <OrganiserBottomTabNavigator.Screen name={ROUTES.OrganiserHome} component={OrganiserHome} options={{ headerShown: false }} />
      <OrganiserBottomTabNavigator.Screen name={ROUTES.CreateEventScreen} component={CreateEventScreen} options={{ headerShown: false }} />
      <OrganiserBottomTabNavigator.Screen name={ROUTES.OrganiserProfileScreen} component={OrganiserProfileScreen} options={{ headerShown: false }} />
    </OrganiserBottomTabNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name={ROUTES.LoginScreen} component={LoginScreen} options={{ headerShown: false }} />
      <AuthStackNavigator.Screen name={ROUTES.UserSingUpScreen} component={UserSingUpScreen} options={{ headerShown: false }} />
      <AuthStackNavigator.Screen name={ROUTES.OrganiserSignUpScreen} component={OrganiserSignUpScreen} options={{ headerShown: false }} />
    </AuthStackNavigator.Navigator>
  );
};

const OrganizerStackNavigator = createStackNavigator();

export const OrganizerStack = () => {
  return (
    <OrganizerStackNavigator.Navigator initialRouteName="organizerStack" screenOptions={{ headerShown: false }}>
      <OrganizerStackNavigator.Screen name="organizerStack" component={OrganiserBottomNavigator} />
      <OrganizerStackNavigator.Group screenOptions={{ presentation: 'modal' }}>
        <OrganizerStackNavigator.Screen name={ROUTES.AddressAutocompleteScreen} component={AddressAutocompleteScreen} />
      </OrganizerStackNavigator.Group>
    </OrganizerStackNavigator.Navigator>
  );
};
