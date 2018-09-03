/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Text,
  View,StatusBar,YellowBox
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
class Page1 extends Component {
  static navigationOptions =({navigation})=>({
    title: 'Page',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    },
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  });
  render () {
    return (
      <View style={{padding: 50}}>
      <StatusBar
            backgroundColor="#51c0c3"
            barStyle="light-content"
          />
        <Text>
          Page1
        </Text>
      </View>
    );
  }
}

export default Page1;
