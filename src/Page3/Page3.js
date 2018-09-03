/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Text,
  View,StatusBar
} from 'react-native';

class Page3 extends Component {
  // static navigationOptions = {
  //   title: 'Page',
  //   headerTintColor: 'white',
  //   headerStyle: {
  //     backgroundColor: '#51c0c3'
  //   }
  // };
  render () {
    return (
      <View style={{padding: 50}}>
      <StatusBar
            backgroundColor="#51c0c3"
            barStyle="light-content"
          />
        <Text>
          Page3
        </Text>
      </View>
    );
  }
}

export default Page3;
