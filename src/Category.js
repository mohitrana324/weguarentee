/* @flow */

import React, { PureComponent } from 'react';
import { ListView, View, Text, ActivityIndicator, ImageBackground,BackHandler, StyleSheet, Image, ToastAndroid, AsyncStorage, TouchableHighlight, StatusBar, ScrollView } from 'react-native';

var SplashScreen = require('@remobile/react-native-splashscreen');
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { ListItem, Header } from 'react-native-elements';
import env from './components/env';
import HTMLView from 'react-native-htmlview';
export default class ListViewExample extends PureComponent<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      category: <ActivityIndicator size="large" color="#51c0c3" />
    }
  }
  componentDidMount() {
    SplashScreen.hide();
  }

  cartCounter(){
    // cart counter get
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "rest/cart/cart", {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.success == 1) {
            if (responseData.data.length === 0) {
              this.props.navigation.setParams({ cartCount: <Text style={{position:'absolute'}}></Text> });
            } else {
              this.props.navigation.setParams({ cartCount: <Text style={styles.badge}>{responseData.data.total_product_count}</Text> });
            }
          }
        })
    })
    // cart counter get end
  }

  componentWillMount() {
    
    this.cartCounter();
    // get category
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "feed/rest_api/categories", {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if (responseData.success == 1) {
            var resp = responseData.data.map((data) => {
              data.name = "<p style='color:white;'>"+data.name+"</p>";
              console.log(data.name);
              return <TouchableHighlight onPress={() => this.props.navigation.navigate('SubCategory', {data:data})} key={data.category_id}>
                <View style={styles.card}>
                  <ImageBackground source={{ uri: data.original_image }} style={styles.backgroundImage}>

                    <View style={styles.card_footer}>
                      <HTMLView
                        value={data.name}
                        stylesheet={styles}
                        style={{ padding: 10, margin: 0}}
                      />
                      {/* <Text style={styles.category_title}></Text> */}
                    </View>
                  </ImageBackground>
                </View>
              </TouchableHighlight>;
            });
            this.setState({ category: resp });
          }
        })
    })
    // get category end
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Category',
    tabBarLabel: 'Category',
    tabBarIcon: ({ tintColor }) => <Text style={{ fontSize: 20 }}><FontAwesome color={tintColor}>{Icons.braille}</FontAwesome></Text>,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    },
    headerLeft: <TouchableHighlight onPress={() => navigation.navigate("DrawerOpen")}><Text style={{color:'white',paddingLeft:20,
    padding:5,fontSize:18}}><FontAwesome>{Icons.bars}</FontAwesome></Text></TouchableHighlight>,
    headerRight: <View style={{ flex: 1, flexDirection: 'row' }}>
      <TouchableHighlight onPress={() => navigation.navigate('Search')}>
        <Text style={{ color: 'white', paddingLeft: 20, padding: 5, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
          <FontAwesome>{Icons.search}</FontAwesome>
        </Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate('Wishlist')}>
        <Text style={{ color: 'white', paddingLeft: 20, padding: 5, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
          <FontAwesome>{Icons.heart}</FontAwesome>
        </Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate('Cart')}>
        <View>
        {typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.cartCount) === 'undefined' ? <Text style={{position:'absolute'}}></Text> : navigation.state.params.cartCount}
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


  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#51c0c3"
          barStyle="light-content"
        />
        <ScrollView>
          <View>
            {this.state.category}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  p:{
    color:'white',
    fontWeight:'bold'
  },
  row: {
    flex: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
  },
  card: {
    borderColor: 'gainsboro',
    borderWidth: 1,
    flex: 1,
    backgroundColor: 'white',
    shadowOffset: { width: 10, height: 5, },
    shadowColor: 'black',
    shadowOpacity: 1,
    borderRadius: 5,
    position: 'relative',
    margin: 10,
    height: 180,
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
  backgroundImage: {
    flex: 1,
    borderRadius: 5,

  },
  card_footer: {
    backgroundColor: '#51c0c3',
    height: 40,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  category_title: {
    color: 'white'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
    backgroundColor: '#ccc',

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