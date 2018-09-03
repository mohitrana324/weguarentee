/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Router from './routes';
import {AppRegistry, StatusBar} from 'react-native';
var SplashScreen = require('@remobile/react-native-splashscreen');
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

export default class CustomDrawer extends Component {
  
  componentDidMount() {
      SplashScreen.hide();
    }
    
  render () {
    return (
      <Router/>
    );
  }
}

AppRegistry.registerComponent('weguarentee', () => CustomDrawer);

