import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeScreen } from '../screens/user/home/screen';
import { SearchScreen } from '../screens/user/search/screen';
import { MapScreen } from '../screens/user/map/screen';
import { ProfileScreen } from '../screens/user/profile/screen';
import { EventDetails } from '../screens/user/eventDetails/screen';
import { LoginScreen } from '../screens/onboarding/login/screen'; 
import { UserSingUpScreen } from '../screens/onboarding/register/user/screen';
import { OrganiserSignUpScreen } from '../screens/onboarding/register/organizer/screen';
import { OrganiserHome } from '../screens/organiser/home/screen';
import { CreateEventScreen } from '../screens/organiser/createEvent/screen';
import { OrganiserProfileScreen } from '../screens/organiser/profile/screen';

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
  OrganiserProfileScreen: 'OrganiserProfileScreen'
};

const BottomBarIcons = ({ route }) => ({
  tabBarLabel: '',
  tabBarIcon: ({ focused, size, colour }) => {
    let iconName;
    if (route.name === 'HomeNavigator' || route.name === 'OrganiserHomeScreen') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'SearchScreen') {
      iconName = focused ? 'ios-search' : 'search-outline';
    } else if (route.name === 'MapScreen') {
      iconName = focused ? 'map' : 'map-outline';
    } else if (route.name === 'ProfileScreen' || route.name === 'OrganiserProfileScreen') {
      iconName = focused ? 'person' : 'person-outline';
    } else if (route.name === 'CreateEventScreen') {
      iconName = focused ? 'add-circle' : 'add-circle-outline';
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

export const UserBottomNavigator = () => {
  return (
    <UserBottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <UserBottomTabNavigator.Screen name={ROUTES.HomeNavigator} component={HomeNavigator} options={{ headerShown: false }} />
      <UserBottomTabNavigator.Screen name={ROUTES.SearchScreen} component={SearchScreen} />
      <UserBottomTabNavigator.Screen name={ROUTES.MapScreen} component={MapScreen} />
      <UserBottomTabNavigator.Screen name={ROUTES.ProfileScreen} component={ProfileScreen} />
    </UserBottomTabNavigator.Navigator>
  );
};

export const OrganiserBottomNavigator = () => {
  return(
    <OrganiserBottomTabNavigator.Navigator screenOptions={BottomBarIcons}>
      <OrganiserBottomTabNavigator.Screen name={ROUTES.OrganiserHome} component={OrganiserHome} options={{ headerShown: false }}/> 
      <OrganiserBottomTabNavigator.Screen name={ROUTES.CreateEventScreen} component={CreateEventScreen} options={{ headerShown: false }}/> 
      <OrganiserBottomTabNavigator.Screen name={ROUTES.OrganiserProfileScreen} component={OrganiserProfileScreen} options={{ headerShown: false }}/> 
    </OrganiserBottomTabNavigator.Navigator>
  )
}

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


