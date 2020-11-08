import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DiscoveryScreen from '../Screens/DiscoveryScreen';
import {StackNavigationOptions} from '@react-navigation/stack/lib/typescript/src/types';
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import * as Colors from '../../Util/colors';
import DetailScreen from '../Screens/DetailScreen';
import Icon from 'react-native-dynamic-vector-icons';
import FavoritesScreen from '../Screens/FavoritesScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import ReaderScreen from '../Screens/ReaderScreen';

const Navigator = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const options: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: Colors.hRed,
    },
    headerTintColor: 'white',
  };

  const tabBarOptions: BottomTabBarOptions = {
    activeTintColor: 'white',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: Colors.hRed,
    },
  };

  function DiscoverTab() {
    return (
      <Stack.Navigator initialRouteName={'Front Page'} screenOptions={options}>
        <Stack.Screen name={'Front Page'} component={DiscoveryScreen} />
        <Stack.Screen
          name={'Detail'}
          component={DetailScreen}
          options={{headerTitle: 'Loading...'}}
        />
        <Stack.Screen
          name={'Reader'}
          component={ReaderScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    );
  }

  function FavoritesTab() {
    return (
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen name={'Favorites'} component={FavoritesScreen} />
      </Stack.Navigator>
    );
  }

  function SettingsTab() {
    return (
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen name={'Settings'} component={SettingsScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen
          name={'Discovery'}
          component={DiscoverTab}
          options={{
            tabBarIcon: ({color}) => (
              <Icon
                name={'book'}
                type={'MaterialCommunityIcons'}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name={'Favorites'}
          component={FavoritesTab}
          options={{
            tabBarIcon: ({color}) => (
              <Icon
                name={'heart'}
                type={'MaterialCommunityIcons'}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name={'Settings'}
          component={SettingsTab}
          options={{
            tabBarIcon: ({color}) => (
              <Icon
                name={'cog'}
                type={'MaterialCommunityIcons'}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
