/* @flow */

import React, { PureComponent } from 'react';
import { ListView, View,Dimensions, Text, StyleSheet, Image, ToastAndroid, AsyncStorage, TouchableHighlight, StatusBar, ScrollView } from 'react-native';

var SplashScreen = require('@remobile/react-native-splashscreen');
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { ListItem, Header } from 'react-native-elements';
var { height, width } = Dimensions.get('window');

export default class ListViewExample extends PureComponent<{}, State> {
  componentDidMount() {
    SplashScreen.hide();
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Notification',
    tabBarLabel: 'Notification',
    tabBarIcon: ({ tintColor }) => <Text style={{ fontSize: 20 }}><FontAwesome color={tintColor}>{Icons.bell}</FontAwesome></Text>,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    },
    headerLeft: <TouchableHighlight onPress={() => navigation.navigate("DrawerOpen")}><Text style={{
      color: 'white', paddingLeft: 20,
      padding: 5, fontSize: 18
    }}><FontAwesome>{Icons.bars}</FontAwesome></Text></TouchableHighlight>,
    headerRight: <View style={{ flex: 1, flexDirection: 'row' }}>
      <TouchableHighlight onPress={() => navigation.navigate('Search')}>
        <Text style={{ color: 'white', paddingLeft: 20, padding: 5, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
          <FontAwesome>{Icons.search}</FontAwesome>
        </Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text style={{ color: 'white', paddingLeft: 20, padding: 5, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
          <FontAwesome>{Icons.heart}</FontAwesome>
        </Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate('Cart')}>
        <View>
          <Text style={styles.badge}>1</Text>
          <Text style={{ color: 'white', paddingLeft: 20, padding: 5, paddingRight: 20, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
            <FontAwesome>{Icons.shoppingBag}</FontAwesome>
          </Text>
        </View>
      </TouchableHighlight>
      {/* <TouchableHighlight>
                  <View>1</View>
                  
                </TouchableHighlight> */}
    </View>
  })

  openPage() {
    const { navigate } = this.props.navigation;
    navigate('Video');
  }

  render() {
    const { navigate } = this.props.navigation
    //  const list = [
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category',
    //     subtitle: 'Category Sub Title'
    //   },
    //   {
    //     name: 'Category--',
    //     subtitle: 'Category Sub Title'
    //   },
    // ]
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#51c0c3"
          barStyle="light-content"
        />
        <ScrollView>
          <View style={styles.cartEmpty}>
            <FontAwesome style={{ fontSize: 100, color: '#ccc' }}>{Icons.bell}</FontAwesome>
            <Text>No Notification</Text>
          </View>
          {/* <View>
            {
              list.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.name}
                  subtitle={l.subtitle}
                />
              ))
            }
          </View> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
  },
  row: {
    flex: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
  },
  cartEmpty: {
    flex: 1,
    height: height / 2 + 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
    backgroundColor: '#ccc',

  },
  badge: {
    position: 'absolute',
    backgroundColor: 'red',
    height: 20,
    textAlign: 'center',
    color: 'white',
    width: 20,
    borderRadius: 50,
    right: 10,
    top: 0,
    zIndex: 99,
  },
  button_wrap: {
    marginTop: -20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});