import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import _ from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PastEventsScreen } from '../screens/organiser/events/past/screen';
import { UpcomingEventsScreen } from '../screens/organiser/events/upcoming/screen';
import { AboutAccountScreen } from '../screens/organiser/profile/about/accountAbout/screen';
import { EventsAccountScreen } from '../screens/organiser/profile/events/accoutEvents/screen';
import { FollowingOrganisersScreen } from '../screens/shared/following/organisers/screen';
import { FollowingUsersScreen } from '../screens/shared/following/users/screen';
import { SearchEventScreen } from '../screens/user/search/searchEvents/screen';
import { SearchOrganiserScreen } from '../screens/user/search/searchOrganiser/screen';
import { SearchUserScreen } from '../screens/user/search/searchUsers/screen';
import { COLORS, FONTS, SIZE, SIZES } from '../utils/theme';
import { ROUTES } from './Navigation';

const SearchTopStackNavigator = createMaterialTopTabNavigator();
const OrganiserAccountTopStackNavigator = createMaterialTopTabNavigator();
const OrganiserEventsTopStackNavigator = createMaterialTopTabNavigator();
const FollowingTopStackNavigator = createMaterialTopTabNavigator();

const screenOptions = (tabBarLabel) => ({
  tabBarLabel,
  tabBarLabelStyle: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.sm,
    textTransform: 'none',
    backgroundColor: 'transparent',
    borderBottomWidth: 0.17,
    borderColor: COLORS.lightGray,
  },
  tabBarIndicatorStyle: { backgroundColor: 'white' },
  tabBarStyle: { height: SIZE * 3.3, backgroundColor: COLORS.white },
  tabBarActiveTintColor: 'white'
});

export const SearchTopNavigator = () => {
  const { t } = useTranslation();
  return (
    <SearchTopStackNavigator.Navigator initialRouteName={ROUTES.SearchEventScreen}>
      <SearchTopStackNavigator.Screen name={ROUTES.SearchEventScreen} component={SearchEventScreen} options={screenOptions('Events')} />
      <SearchTopStackNavigator.Screen name={ROUTES.SearchOrganiserScreen} component={SearchOrganiserScreen} options={screenOptions('Organisers')} />
      <SearchTopStackNavigator.Screen name={ROUTES.SearchUserScreen} component={SearchUserScreen} options={screenOptions('Accounts')} />
    </SearchTopStackNavigator.Navigator>
  );
};

export const OrganiserAccountTopNavigator = () => {
  const { t } = useTranslation();
  return (
    <OrganiserAccountTopStackNavigator.Navigator initialRouteName={ROUTES.EventProfileScreen}>
      <OrganiserAccountTopStackNavigator.Screen
        name={ROUTES.EventsAccountScreen}
        component={EventsAccountScreen}
        options={screenOptions(t('event'))}
      />
      <OrganiserAccountTopStackNavigator.Screen name={ROUTES.AboutAccountScreen} component={AboutAccountScreen} options={screenOptions('About')} />
    </OrganiserAccountTopStackNavigator.Navigator>
  );
};

export const OrganiserEventsTopNavigator = () => {
  return (
    <OrganiserEventsTopStackNavigator.Navigator>
      <OrganiserEventsTopStackNavigator.Screen
        name={ROUTES.UpcomingEventsScreen}
        component={UpcomingEventsScreen}
        options={screenOptions('Upcoming events')}
      />
      <OrganiserEventsTopStackNavigator.Screen name={ROUTES.PastEventsScreen} component={PastEventsScreen} options={screenOptions('Past events')} />
    </OrganiserEventsTopStackNavigator.Navigator>
  );
};

export const FollowingTopNavigator = (followingParams) => {
  return (
    <FollowingTopStackNavigator.Navigator>
      <FollowingTopStackNavigator.Screen
        name={ROUTES.FollowingUsersScreen}
        component={FollowingUsersScreen}
        options={screenOptions('Users')}
        initialParams={followingParams}
      />
      <FollowingTopStackNavigator.Screen
        name={ROUTES.FollowingOrganisersScreen}
        component={FollowingOrganisersScreen}
        options={screenOptions('Organisers')}
        initialParams={followingParams}
      />
    </FollowingTopStackNavigator.Navigator>
  );
};
