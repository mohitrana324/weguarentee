/* @flow */

import React, { PureComponent } from 'react';
import { ListView, View, Text, StyleSheet, Image, ToastAndroid, AsyncStorage, TouchableHighlight, StatusBar, ScrollView } from 'react-native';

var SplashScreen = require('@remobile/react-native-splashscreen');
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, SearchBar, Header, Button } from 'react-native-elements';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import env from './components/env';
import { ProgressDialog } from 'react-native-simple-dialogs';
export default class ListViewExample extends PureComponent<{}, State> {
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      progressVisible:false
    }
  }


  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    tabBarLabel: 'Profile',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    },
    header: null

  })

  openPage() {
    const { navigate } = this.props.navigation;
    navigate('Video');
  }

  _handleSearch(value){
    this.setState({search:value});
  }
  _handlePress(value)
  {
    console.log(value);
    this.setState({loading:true});
    AsyncStorage.getItem('token').then((token) => {
        fetch(env.BASE_URL+ "feed/rest_api/products&search="+value.search, {
          method:'get',
          headers: {
            Authorization: 'Bearer ' + JSON.parse(token).access_token
          }
        }).then((response) => response.json())
        .then((responseData) => {
          this.setState({loading:false});
          if (responseData.success == 1) {
            var data = responseData.data.map((data) => {
                if (data.special_formated != 0) {
                    var price = <View style={{ flexDirection: 'row' }}><Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.special_formated}</Text></View>
                } else {
                    var price = <Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.price_formated}</Text>
                }
                return <View style={styles.box} key={data.product_id}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('SingleProduct', { id: data.product_id })}><Image style={styles.image} source={{ uri: data.image }} /></TouchableHighlight>
                    <View style={styles.productTitle}>
                        <Text style={styles.productHeading}>{data.name}</Text>
                        <View style={styles.footer}>
                            <View style={styles.price}>{price}</View>
                            <View style={styles.cart}>
                                <TouchableHighlight onPress={() => this.addWishlist(data.product_id)} underlayColor={'#fff'} style={{ marginRight: 10, }}><Text style={{ fontSize: 20, padding: 5 }}><FontAwesome>{Icons.heart}</FontAwesome></Text></TouchableHighlight>
                                <TouchableHighlight onPress={() => this.addCart(data.product_id)} underlayColor={'#fff'}><Text style={{ fontSize: 20, padding: 5 }}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>;
            })
            this.setState({ products: data });
        }
        })
    });
  }
  addWishlist(product_id){
    this.setState({progressVisible:true});
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "rest/wishlist/wishlist&id="+product_id, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token,
          Accept  : 'application/json',
              'Content-Type' : 'application/json'
        }
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if(responseData.success == 1)
          {this.setState({progressVisible:false});
            ToastAndroid.show('Item added successfully in wishlist', ToastAndroid.SHORT);
          }else
          if(responseData.error[0] == 'You must login or create an account to save item to your wish list'){
            this.setState({progressVisible:false});
            Alert.alert(
              'Login',
              'You must login or create account to save item to your wish list',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Login', onPress: () => this.props.navigation.navigate('ScreenFour')},
              ],
              { cancelable: false }
            )
          }

        })
      })
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
  addCart(product) {
    this.setState({progressVisible:true});
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "rest/cart/cart", {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token,
          Accept  : 'application/json',
              'Content-Type' : 'application/json'
        },
        body:JSON.stringify({product_id:product, quantity:1})
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if(responseData.success == 1)
          {
            this.cartCounter();
            this.setState({progressVisible:false});
            // this.props.navigation.setParams({ cartCount: <Text style={styles.badge}>{responseData.data.total_product_count}</Text> });
            ToastAndroid.show('Item added successfully', ToastAndroid.SHORT);
          }
        })
    })
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView>
        <StatusBar
          backgroundColor="#51c0c3"
          barStyle="light-content"
        />
        <ProgressDialog
          visible={this.state.progressVisible}
          message="Please, wait..."
        />
        <SearchBar
          lightTheme
          placeholder='Type Here...'
          showLoadingIcon={this.state.loading}
          lightTheme
          returnKeyType="search"
          platform="android"
          onSubmitEditing={() => this._handlePress(this.state.search)}
          onChangeText={(search) => this._handleSearch({ search })}
          containerStyle={{ backgroundColor: '#51c0c3', padding: 0, margin: 0, borderWidth: 0, borderTopWidth: 0 }}
          inputStyle={{ color: '#000', backgroundColor: 'white' }}
          cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        />
        <View style={styles.row}>
          
            {this.state.products}
          
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
},
// slider:{
//   height:260,
//   width:100,
// },
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
tabIcon: {
    backgroundColor: 'white',
    marginBottom: 3,
    height: 70,

},
tabItem: {
    width: 72,
    margin: 3,
    height: 64,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
},
tabTitle: {
    fontSize: 10,
    textAlign: 'center',
    height: 26,
},
row: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'

},
box: {
    backgroundColor: 'white',
    width: '48%',
    margin: '1%',
    // height:221,
    // flexDirection:'row'
},
image: {
    height: 180,
},
productTitle: {
    flexDirection: 'column',
    height: 80
},
productHeading: {
    flex: 1, flexWrap: 'wrap',
    padding: 5,
    height: 47,
},
footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
},
price: {
    justifyContent: 'center',
    paddingLeft: 10,
},
cart: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingRight: 10,
    flex: 1,
    flexDirection: 'row',
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