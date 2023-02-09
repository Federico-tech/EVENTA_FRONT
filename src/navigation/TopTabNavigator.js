import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AboutScreen } from '../screens/organiser/profile/about/screen';
import { EventProfileScreen } from '../screens/organiser/profile/events/screen';
import { SearchEventScreen } from '../screens/user/search/searchEvents/screen';
import { SearchOrganiserScreen } from '../screens/user/search/searchOrganiser/screen';
import { SearchUserScreen } from '../screens/user/search/searchUsers/screen';
import { COLORS, FONTS, SIZE, SIZES } from '../utils/theme';
import { ROUTES } from './Navigation';

const SearchTopStackNavigator = createMaterialTopTabNavigator();
const OrganiserTopStackNavigator = createMaterialTopTabNavigator();

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

export const OrganiserTopNavigator = ({ data }) => {
  const { t } = useTranslation();
  console.log('DataOrganiser', data)
  return (
    <OrganiserTopStackNavigator.Navigator initialRouteName={ROUTES.EventProfileScreen}>
      <OrganiserTopStackNavigator.Screen name={ROUTES.EventProfileScreen} component={EventProfileScreen} options={screenOptions(t('event'))} />
      <OrganiserTopStackNavigator.Screen name={ROUTES.AboutScreen} component={AboutScreen} options={screenOptions('About')} initialParams={{data}}/>
    </OrganiserTopStackNavigator.Navigator>
  );
};
