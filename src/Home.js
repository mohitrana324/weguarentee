/* @flow */

import React, { PureComponent } from 'react';
import {
  ListView,
  View,
  Text,
  YellowBox,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  Image,
  ToastAndroid,
  AsyncStorage,
  TouchableOpacity,
  Alert, BackAndroid, Dimensions,
  TouchableHighlight,TouchableWithoutFeedback,
  StatusBar,
  ScrollView,ImageBackground
} from 'react-native';
var { height, width } = Dimensions.get('window');
var SplashScreen = require('@remobile/react-native-splashscreen');
import ImageSlider from 'react-native-image-slider';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Header, SearchBar } from 'react-native-elements';
import env from './components/env';
import Tabs from './homeTabs';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Swiper from 'react-native-swiper';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class ListViewExample extends PureComponent<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      height: 250,
      cartCount: 1,
      slideShow: <ActivityIndicator size="large" color="#51c0c3" />
    };
  }


  handleBackButton = () => {

    console.log(this.props.navigation);
    // // if (shouldCloseApp(nav)) return false
    // dispatch({ type: 'Navigation/BACK' });
    // return true;
    // if ((this.props.navigation.state.routeName == 'ScreenOne')) {
    //   Alert.alert(
    //     'Exit App',
    //     'Exiting the application?',
    //     [{
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel'
    //     }, {
    //       text: 'OK',
    //       onPress: () => BackHandler.exitApp()
    //     },], {
    //       cancelable: false
    //     }
    //   )
    //   return true;
    // }
  }

  componentDidMount() {
    SplashScreen.hide();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  cartCounter() {
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
              this.props.navigation.setParams({ cartCount: <Text style={{ position: 'absolute' }}></Text> });
            } else {
              this.props.navigation.setParams({ cartCount: <Text style={styles.badge}>{responseData.data.total_product_count}</Text> });
            }
          }
        })
    })
    // cart counter get end
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.cartCounter();
    this.getSlider();
    this.getCategory();
    this.getProduct();
    AsyncStorage.getItem('token').then((token) => {
      console.log(token);
      if (!token || token == null) {
        console.log('runing');
        fetch(env.BASE_URL + "feed/rest_api/gettoken&grant_type=client_credentials", {
          method: 'post',
          headers: {
            Authorization: 'Basic d2VndWFyYW50ZWU6dGVjaG5vQDA4MTA='
          }
        }).then((response) => response.json())
          .then((responseData) => {
            if (responseData.success == 1) {
              AsyncStorage.setItem('token', JSON.stringify(responseData.data));
              AsyncStorage.setItem('user', JSON.stringify({ name: 'guest' }));
              this.getSlider();
              this.getCategory();
              this.getProduct();
            }
          })
      }
    }); //Guest User Access token end
  }

  getProduct() {
    // get featured products
    AsyncStorage.getItem('token').then((token) => {
      this.setState({ progressVisible: true });
      fetch(env.BASE_URL + "feed/rest_api/featured", {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          this.setState({ progressVisible: false });
          responseData.data.map((data) => {
            if (data.name == "Home Page") {
              var products = data.products.map((product) => {
                if (product.special_formated != 0) {
                  var price = <View style={{ flexDirection: 'row' }}><Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{product.special_formated}</Text></View>
                } else {
                  var price = <Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{product.price_formated}</Text>
                }
                return <View style={styles.box} key={product.product_id}>
                  <TouchableHighlight onPress={() => this.props.navigation.navigate('SingleProduct', { id: product.product_id })}><Image style={styles.image} source={{ uri: product.thumb }} /></TouchableHighlight>
                  <View style={styles.productTitle}>
                    <Text style={styles.productHeading}>{product.name}</Text>
                    <View style={styles.footer}>
                      <View style={styles.price}>{price}</View>
                      <View style={styles.cart}>
                        <TouchableHighlight onPress={() => this.addWishlist(product.product_id)} underlayColor={'#fff'} style={{ marginRight: 10, }}><Text style={{ fontSize: 20, padding: 5 }}><FontAwesome>{Icons.heart}</FontAwesome></Text></TouchableHighlight>
                        <TouchableHighlight onPress={() => this.addCart(product.product_id)} underlayColor={'#fff'}><Text style={{ fontSize: 20, padding: 5 }}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                      </View>
                    </View>
                  </View>
                </View>;
              });
              this.setState({ product: products })
            }
          })
        })
    })
    // get featured products end
  }

  getCategory() {
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
          var data = responseData.data.map(data => {
            var title = data.name.replace(/(<([^>]+)>)/ig, '');
            return <View style={styles.tabItem} key={data.category_id}>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('SubCategory', {data:data})} key={data.category_id} underlayColor={'#fff'}>
                <Image source={require('./images/shirt.png')} style={{ width: 30, height: 30 }} />
              </TouchableHighlight>
              <Text style={styles.tabTitle}>{title.replace('&amp;', '&')}</Text>
            </View>
          });
          this.setState({ category: data });
        })
    })
    // get category end
  }



  getSlider() {
    // get slideshow
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "feed/rest_api/slideshows", {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.success == 1) {
            responseData.data.map((data) => {
              if (data.name == 'Home Page') {
                var slides = data.banners.map((slide) => {
                  return slide.image;
                });
                this.setState({
                  slideShow: <ImageSlider images={slides}
                    autoPlayWithInterval={3000}
                    style={{ height: 170, width:'100%' }}
                    onPosiposition={this.state.position}
                    onPositionChanged={position => this.setState({ position })}
                  />
                });
              }
            })
          }
        })
    })
  }
  // get slideshow end


  static navigationOptions = ({ navigation }) => ({
    title: 'Weguarantee',
    tabBarLabel: 'Home',
    headerTintColor: 'white',
    tabBarIcon: ({ tintColor }) => <Text style={{ fontSize: 20 }}><FontAwesome color={tintColor}>{Icons.home}</FontAwesome></Text>,
    headerStyle: {
      backgroundColor: '#51c0c3'
    },
    statusBarStyle: 'light-content',
    headerLeft: <TouchableWithoutFeedback onPress={() => navigation.navigate('DrawerOpen')}><Text style={{
      color: 'white', paddingLeft: 20,
      padding: 5,
      fontFamily: 'WhitneyMedium',
      fontSize: 18
    }}><FontAwesome>{Icons.bars}</FontAwesome></Text></TouchableWithoutFeedback>,
    headerRight: <View style={{ flex: 1, flexDirection: 'row' }}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
        <Text style={{ color: 'white', paddingLeft: 20, padding: 5, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
          <FontAwesome>{Icons.search}</FontAwesome>
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Wishlist')}>
        <Text style={{ color: 'white', paddingLeft: 20, padding: 5, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
          <FontAwesome>{Icons.heart}</FontAwesome>
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart')}>
        <View>
          {typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.cartCount) === 'undefined' ? <Text style={{ position: 'absolute' }}></Text> : navigation.state.params.cartCount}
          <Text style={{ color: 'white', paddingLeft: 20, padding: 5, paddingRight: 20, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
            <FontAwesome>{Icons.shoppingBag}</FontAwesome>
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {/* <TouchableHighlight>
                  <View>1</View>
                  
                </TouchableHighlight> */}
    </View>
  })

  openDrawer = () => {
    const { navigate } = this.props.navigation;
    this.props.navigation.navigate('DrawerOpen');
  };

  addCart(product) {
    this.setState({progressVisible:true});
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "rest/cart/cart", {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: product, quantity: 1 })
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if (responseData.success == 1) {
            this.cartCounter();
            this.setState({progressVisible:false});
            // this.props.navigation.setParams({ cartCount: <Text style={styles.badge}>{responseData.data.total_product_count}</Text> });
            ToastAndroid.show('Item added successfully', ToastAndroid.SHORT);
          }
        })
    })
  }

  addWishlist(product_id) {
    this.setState({progressVisible:true});
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "rest/wishlist/wishlist&id=" + product_id, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if (responseData.success == 1) {
            this.setState({progressVisible:false});
            ToastAndroid.show('Item added successfully in wishlist', ToastAndroid.SHORT);
          } else
            if (responseData.error[0] == 'You must login or create an account to save item to your wish list') {
              this.setState({progressVisible:false});
              Alert.alert(
                'Login',
                'You must login or create account to save item to your wish list',
                [
                  { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  { text: 'Login', onPress: () => this.props.navigation.navigate('Login') },
                ],
                { cancelable: false }
              )
              
            }

        })
    })
  }

  getTestimonial(){
    return(
        <View style={{padding:20}}>
          <Image source={require('./images/testimonial.jpg')} style={styles.imgBackground}/>
          <Swiper style={styles.wrapper} height={210} autoplayTimeout={25} loop={true} autoplay={true}	 >
            <View style={styles.slide1}>
              <Text style={styles.text}>Dr. Patkar's Apple Cider Vinegar is a magic portion in a bottle. After years my Mother-in-law is able to walk upright and play with her grandchildren. So i am thankful to Weguarantee to introduce me to it!</Text>
              <Text style={styles.nameText}> Jyoti Kumari - (Professional Trained Chef)</Text>
            </View>
            <View style={styles.slide1}>
              <Text style={styles.text}>I am a 70 year old woman suffering from severe joint pain because of excessive weight. Thanks to Organic India Tulsi Green Tea, i was able to reduce a lot of weight therefore my general quality of life is improved. With Weguarantee's online organic store speedy and dependable service i know i will never be let down.</Text>
              <Text style={styles.nameText}> Savitri Singh</Text>
            </View>
            <View style={styles.slide1}>
              <Text style={styles.text}>Weguarantee's service needs due appreciation. I got my parcel well packed and right on time. Plus the people who took my order were friendly and efficient. Now I know where to get my specialized grocery from. Thanks Weguarantee.</Text>
              <Text style={styles.nameText}> Dr. Tara Mahadevan - (Health & Nutrition Specialist)</Text>
            </View>
          </Swiper>
        </View>
    );
  }

  bottomSlider(){
    return(
      <View style={{padding:10,backgroundColor:'#fff'}}>
        <Swiper style={styles.wrapper} showsPagination={false} height={100} autoplayTimeout={15} loop={true} autoplay={true}	 >
          <Image source={require('./images/freeshiping.png')} style={{width:'100%', height:90,alignSelf:'center',justifyContent:'center'}} />
          <Image source={require('./images/customerservice.png')} style={{width:'80%', height:80,alignSelf:'center',justifyContent:'center'}} />
          <Image source={require('./images/nocharge.png')} style={{width:'100%', height:90}} />
        </Swiper>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#51c0c3"
            barStyle="light-content"
          />
          {/* <TouchableHighlight onPress={()=>this.openDrawer()}><Text>Open</Text></TouchableHighlight> */}
          <ProgressDialog
            visible={this.state.progressVisible}
            message="Please, wait..."
          />

          {this.state.slideShow}
          
          <View style={styles.tabIcon}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {this.state.category}
            </ScrollView>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: 'cursive', fontSize: 24, textAlign: 'center', fontWeight: 'bold' }}>Feature Products</Text>
            <Text style={{ textAlign: 'center' }}>Weguarantee brings a line of products from organic items, health vinegars, to a varied selection of teas and coffees. Our aim is to bring a unique blend of health along with taste right at your doorstep, in no time, guaranteed at its best price with assured quality.</Text>
          </View>
          <View style={styles.row}>
            {this.state.product}
          </View>
          <View style={{ backgroundColor: 'white',marginTop:6 }}>
            <View style={{ padding: 10, marginTop: 5, backgroundColor: 'white' }}>
              <Text style={{ fontFamily: 'cursive', fontSize: 24, textAlign: 'center', fontWeight: 'bold' }}>Featured Brands</Text>
              <Text style={{ textAlign: 'center' }}>"There is no diet that will do what eating healthy does. Skip the Diet. Just Eat Healthy."</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Image source={require('./images/f1.png')} />
                <Image source={require('./images/f2.png')} />
                <Image source={require('./images/f3.png')} />
                <Image source={require('./images/f4.png')} />
              </ScrollView>
            </View>
          </View>
          <View style={{ backgroundColor: 'white', marginTop:10, paddingBottom:10 }}>
            <View style={{ padding: 10, marginTop: 5, backgroundColor: 'white' }}>
              <Text style={{ fontFamily: 'cursive', fontSize: 24, textAlign: 'center', fontWeight: 'bold' }}>Top Categories</Text>
              <Text style={{ textAlign: 'center' }}>" Take care of your body. It's the only place you have to live in."</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Image source={require('./images/cat1.png')} style={{width:width/2, height:width/2}} />
                <Image source={require('./images/cat2.png')} style={{width:width/2, height:width/2}} />
                <Image source={require('./images/cat3.png')} style={{width:width/2, height:width/2}} />
                <Image source={require('./images/cat4.png')} style={{width:width/2, height:width/2}} />
              </ScrollView>
            </View>
            
          </View>
          {this.getTestimonial()}
          {this.bottomSlider()}
        </View>
      </ScrollView>
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
    width: 70,
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
  wrapper: {    
  },
  slide1: {
    flex: 1,
    backgroundColor: 'transparent'
    
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign:'justify'
  },
  nameText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'bold',
    textAlign:'center'
  },
  imgBackground: {
    width,
    height:250,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
});