import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeScreen } from '../screens/home/screen';
import { SearchScreen } from '../screens/search/screen';
import { MapScreen } from '../screens/map/screen';
import { ProfileScreen } from '../screens/profile/screen';
import { EventDetails } from '../screens/eventDetails.js/screen';
import { LoginScreen } from '../screens/onboarding/login/screen';
import { UserSingUpScreen } from '../screens/onboarding/register/user/screen';
import { OrganiserSignUpScreen } from '../screens/onboarding/register/organizer/screen';
import { OrganiserHome } from '../screens/organiserHome/screen';

const BottomTabNavigator = createBottomTabNavigator();

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
  OrganiserHome: 'OrganiserHomeScreen'
};

const BottomBarIcons = ({ route }) => ({
  tabBarLabel: '',
  tabBarIcon: ({ focused, size, colour }) => {
    let iconName;
    if (route.name === 'HomeNavigator') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'SearchScreen') {
      iconName = focused ? 'ios-search' : 'search-outline';
    } else if (route.name === 'MapScreen') {
      iconName = focused ? 'map' : 'map-outline';
    } else if (route.name === 'ProfileScreen') {
      iconName = focused ? 'person' : 'person-outline';
    }
    return <Ionicons name={iconName} size={22} colour={colour} />;
  },
});

const HomeStackNavigtor = createStackNavigator(); 

const HomeNavigator = () => {
  return(
  <HomeStackNavigtor.Navigator initialRouteName='HomeScreen'>
    <HomeStackNavigtor.Screen name={ROUTES.HomeScreen} component={HomeScreen} options={{ headerShown: false }}/>
    <HomeStackNavigtor.Screen name={ROUTES.EventDetails} component={EventDetails} options={{ headerShown: false }}/>
  </HomeStackNavigtor.Navigator>
  )
}

export const BottomNavigator = () => {
  return (
    <BottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <BottomTabNavigator.Screen name={ROUTES.HomeNavigator} component={HomeNavigator} options={{ headerShown: false }} />
      <BottomTabNavigator.Screen name={ROUTES.SearchScreen} component={SearchScreen} />
      <BottomTabNavigator.Screen name={ROUTES.MapScreen} component={MapScreen} />
      <BottomTabNavigator.Screen name={ROUTES.ProfileScreen} component={ProfileScreen} />
    </BottomTabNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
  return(
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name={ROUTES.LoginScreen} component={LoginScreen} options={{ headerShown: false }}/>
      <AuthStackNavigator.Screen name={ROUTES.UserSingUpScreen} component={UserSingUpScreen} options={{ headerShown: false }}/>
      <AuthStackNavigator.Screen name={ROUTES.OrganiserSignUpScreen} component={OrganiserSignUpScreen} options={{ headerShown: false }}/>
    </AuthStackNavigator.Navigator>
  )
}
const OrganiserStackNavigator = createStackNavigator()

export const OrganiserNavigator = () => {
  return(
    <OrganiserStackNavigator.Navigator>
      <OrganiserStackNavigator.Screen name={ROUTES.OrganiserHome} component={OrganiserHome}/> 
    </OrganiserStackNavigator.Navigator>
  )
}
