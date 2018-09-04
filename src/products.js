/* @flow */

import React, { PureComponent } from 'react';
import { ListView, View, Text,YellowBox, StyleSheet, Image,ToastAndroid, AsyncStorage,TouchableOpacity,TouchableWithoutFeedback, TouchableHighlight, StatusBar, ScrollView } from 'react-native';

var SplashScreen = require('@remobile/react-native-splashscreen');
import ImageSlider from 'react-native-image-slider';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Header, SearchBar } from 'react-native-elements';
import Tabs from './homeTabs';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
export default class ListViewExample extends PureComponent<{}, State> {
  constructor(props){
    super(props);
    this.state = {
      position: 1,
      height:250,
    };
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  componentWillMount() {
    this.cartCounter();
  }

// _onLayoutDidChange = (e) => {
//   const layout = e.nativeEvent.layout;
//   this.setState({ size: { width: layout.width, height: layout.height } });
// }

 
// componentWillUnmount() {
//   clearInterval(this.state.interval);
// }
static navigationOptions =({navigation})=>({
  title: 'Products',
  headerTintColor: 'white',
  
  headerStyle: {
    backgroundColor: '#51c0c3'
  },
  statusBarStyle: 'light-content',
//   headerLeft: <TouchableHighlight onPress={() => navigation.navigate("DrawerOpen")}><Text style={{color:'white',paddingLeft:20,
//   padding:5,
//   fontFamily:'WhitneyMedium',
//   fontSize:18}}><FontAwesome>{Icons.bars}</FontAwesome></Text></TouchableHighlight>,
  headerRight: <View style={{flex:1,flexDirection:'row'}}>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Search')}>
                  <Text style={{color:'white',paddingLeft:20,padding:5,fontFamily:'WhitneyMedium',fontSize:18}}>
                    <FontAwesome>{Icons.search}</FontAwesome>
                  </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <Text style={{color:'white',paddingLeft:20,padding:5,fontFamily:'WhitneyMedium',fontSize:18}}>
                    <FontAwesome>{Icons.heart}</FontAwesome>
                  </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Cart')}>
                <View>
                {typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.cartCount) === 'undefined' ? <Text style={{position:'absolute'}}></Text> : navigation.state.params.cartCount}
                  <Text style={{color:'white',paddingLeft:20,padding:5,paddingRight:20, fontFamily:'WhitneyMedium', fontSize:18}}>
                    <FontAwesome>{Icons.shoppingBag}</FontAwesome>
                  </Text>
                </View>
                </TouchableWithoutFeedback>
                {/* <TouchableHighlight>
                  <View>1</View>
                  
                </TouchableHighlight> */}
              </View>
})

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
          // this.props.navigation.setParams({ cartCount: <Text style={styles.badge}>{responseData.data.total_product_count}</Text> });
          ToastAndroid.show('Item added successfully', ToastAndroid.SHORT);
        }
      })
  })
}

  openDrawer = () => {
    const { navigate } = this.props.navigation;
    this.props.navigation.navigate('DrawerOpen');
  };
    
  render() {
     const { navigate } = this.props.navigation;

    return (
      <ScrollView>
      <View style={styles.container}>
         <StatusBar
            backgroundColor="#51c0c3"
            barStyle="light-content"
          />
          
          {/* <Header
            leftComponent={{ icon: 'menu', color: '#fff', style:{padding:10}, onPress: () => this.openDrawer()  }}
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            backgroundColor='#51c0c3'
            style={{paddingTop:0}}
            outerContainerStyles={{height: Platform.OS === 'ios' ? 70 :  70 - 24}}
          /> */}
          
          
              
           
              <View style={styles.row}>
              <Tabs />
                  <View style={styles.box}>
                  <TouchableHighlight onPress={()=>navigate('SingleProduct',{slug:'product1'})}><Image style={styles.image} source={{uri: 'https://weguarantee.in/image/cache/catalog/products/Heart%20Clense%20Pack-600x600.jpg'}}/></TouchableHighlight>
                    <View style={styles.productTitle}>
                      <Text style={styles.productHeading}>Heart Cleanse 1 Month Pack (Apple Cider Vinegar With Heart Remedy)</Text>
                      <View style={styles.footer}>
                            <View style={styles.price}><Text style={{fontWeight:'bold',color:'#51c0c3'}}>Rs. 2000/-</Text></View>
                            <View style={styles.cart}>
                                <TouchableHighlight onPress={()=>alert('add to wishlist')} underlayColor={'#fff'} style={{marginRight:10,}}><Text style={{fontSize:20,padding:5}}><FontAwesome>{Icons.heart}</FontAwesome></Text></TouchableHighlight>
                                <TouchableHighlight onPress={()=>alert('add to cart')} underlayColor={'#fff'}><Text style={{fontSize:20, padding:5}}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                            </View>
                        </View>
                    </View>
                  </View>

                  <View style={styles.box}>
                  <TouchableHighlight onPress={()=>navigate('SingleProduct',{slug:'product2'})}><Image style={styles.image} source={{uri: 'https://weguarantee.in/image/cache/catalog/products/Earth%20Loaf%20100%20Organic%20Raw%20Cacao%20Infusion%20Tea1-400x400.jpg'}}/></TouchableHighlight>
                    <View style={styles.productTitle}>
                      <Text style={styles.productHeading}>Earth Loaf 100% Raw Cacao Infusion 100g (Pack Of 2)</Text>
                      <View style={styles.footer}>
                            <View style={styles.price}><Text style={{fontWeight:'bold',color:'#51c0c3'}}>Rs. 380/-</Text></View>
                            <View style={styles.cart}>
                            <TouchableHighlight onPress={()=>alert('add to wishlist')} underlayColor={'#fff'} style={{marginRight:10,}}><Text style={{fontSize:20,padding:5}}><FontAwesome>{Icons.heart}</FontAwesome></Text></TouchableHighlight>
                                <TouchableHighlight onPress={()=>alert('add to cart')} underlayColor={'#fff'}><Text style={{fontSize:20, padding:5}}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                            </View>
                        </View>
                    </View>
                  </View>

                  <View style={styles.box}>
                  <TouchableHighlight onPress={()=>navigate('SingleProduct',{slug:'product3'})}><Image style={styles.image} source={{uri: 'https://weguarantee.in/image/cache/catalog/products/Palm%20Sugar-1-400x400.jpg'}}/></TouchableHighlight>
                      <View style={styles.productTitle}>
                        <Text style={styles.productHeading}>Weguarantee Organics - Organic Palm Sugar (250 Gm)</Text>
                        <View style={styles.footer}>
                            <View style={styles.price}><Text style={{fontWeight:'bold',color:'#51c0c3'}}>Rs. 170/-</Text></View>
                            <View style={styles.cart}>
                            <TouchableHighlight onPress={()=>alert('add to wishlist')} underlayColor={'#fff'} style={{marginRight:10,}}><Text style={{fontSize:20,padding:5}}><FontAwesome>{Icons.heart}</FontAwesome></Text></TouchableHighlight>
                                <TouchableHighlight onPress={()=>alert('add to cart')} underlayColor={'#fff'}><Text style={{fontSize:20, padding:5}}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                            </View>
                        </View>
                      </View>
                  </View>
                  
                  <View style={styles.box}>
                  <TouchableHighlight onPress={()=>navigate('SingleProduct',{slug:'product4'})}><Image style={styles.image} source={{uri: 'https://weguarantee.in/image/cache/catalog/products/Organic%20India/11%20TGT_CLASSIC_FRONT-400x400.jpg'}}/></TouchableHighlight>
                      <View style={styles.productTitle}>
                        <Text style={styles.productHeading}>Organic India Tulsi Green Tea Classic 25 Tea Bags</Text>
                        <View style={styles.footer}>
                            <View style={styles.price}><Text style={{fontWeight:'bold',color:'#51c0c3'}}>Rs. 165.00/-</Text></View>
                            <View style={styles.cart}>
                            <TouchableHighlight onPress={()=>alert('add to wishlist')} underlayColor={'#fff'} style={{marginRight:10,}}><Text style={{fontSize:20,padding:5}}><FontAwesome>{Icons.heart}</FontAwesome></Text></TouchableHighlight>
                                <TouchableHighlight onPress={()=>alert('add to cart')} underlayColor={'#fff'}><Text style={{fontSize:20, padding:5}}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                            </View>
                        </View>
                      </View>
                  </View>
              </View>
        </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({  
  container: {
    padding: 0,
    flex:1,
  },
  // slider:{
  //   height:260,
  //   width:100,
  // },
  badge:{
    position:'absolute',
    backgroundColor:'red',
    height:20,
    textAlign:'center',
    color:'white',
    width:20,
    borderRadius:50,
    right:10,
    top:0,
    zIndex:99,
  },
  tabIcon:{
    backgroundColor:'white',
    marginBottom:3,
    height:70,
    
  },
  tabItem:{
    width:72,
    margin:3,
    height:64,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  tabTitle:{
    fontSize:10,
    textAlign:'center',
    height:26,
  },
  row: {
    width: '100%', 
    flexDirection: 'row', 
    flexWrap: 'wrap'

  },
  box:{
    backgroundColor:'white',
    width: '48%', 
    margin: '1%', 
    // height:221,
    // flexDirection:'row'
  },
  image:{
    height:180,
  },
  productTitle:{
    flexDirection:'column',
    height:80
  },
  productHeading:{
    flex: 1, flexWrap: 'wrap',
    padding:5,
    height:47,
  },
  footer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price:{
    justifyContent: 'center',
    paddingLeft:10,
  },
  cart:{
    alignSelf: 'stretch', 
    justifyContent: 'flex-end',
    paddingRight:10,
    flex:1,
    flexDirection: 'row', 
  },

  button:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    minHeight:150,
    backgroundColor:'#ccc',
    
  },
  button_wrap:{
    marginTop:-20,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:16,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});