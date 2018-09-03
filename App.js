/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import Home from './src/Home';
import Category from './src/Category';
import Notifications from './src/Notification';
import Profile from './src/Profile';
import Page1 from './src/Page1/Page1';
import Page2 from './src/Page2/Page2';
import Page3 from './src/Page3/Page3';
import SideMenu from './src/SideMenu/SideMenu';
var SplashScreen = require('@remobile/react-native-splashscreen');


const App = TabNavigator({
  // Main:{screen : Main},
  ScreenOne: { 
      screen: Home, 
      navigationOptions:{
        title: 'Hell',
        tabBarLabel: 'Home',
        headerStyle: {
          backgroundColor: '#000'
        }
      }
    },
    ScreenTwo: { screen: Category},
    ScreenThree: { screen: Notifications},
    ScreenFour : {screen:Profile}
  }, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled:true,
    tabBarOptions: {
      activeTintColor: '#fff',
      labelStyle: {
        fontSize: 9,
      },
      style: {
        backgroundColor: '#000',
      }
    }
});

const sideMenu = DrawerNavigator({
  Page1: {
    screen: Page1
  },
  Page2: {
    screen: Page2
  },
  Page3: {
    screen: Page3
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});

const stack = StackNavigator({
  App:{ screen: App },
  sideMenu:{screen:sideMenu}
});


export default stack;