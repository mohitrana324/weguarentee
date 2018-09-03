/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { ListView, View, Text,YellowBox, StyleSheet, Image,ToastAndroid, AsyncStorage, TouchableHighlight, StatusBar, ScrollView } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { HeaderBackButton } from 'react-navigation';
class Page1 extends Component {
  // static navigationOptions =({navigation})=>({
  //   title: 'Page',
  //   headerTintColor: 'white',
  //   headerStyle: {
  //     backgroundColor: '#51c0c3'
  //   },
  //   headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  // });
  render () {
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
                    <View style={styles.box}>
                      <Image style={styles.image} source={{uri: 'https://weguarantee.in/image/cache/catalog/products/Heart%20Clense%20Pack-600x600.jpg'}}/>
                      <View style={styles.productTitle}>
                        <Text style={styles.productHeading}>Heart Cleanse 1 Month Pack (Apple Cider Vinegar With Heart Remedy)</Text>
                        <View style={styles.footer}>
                              <View style={styles.price}><Text style={{fontWeight:'bold'}}>Rs. 2000/-</Text></View>
                              <View style={styles.cart}>
                                  <TouchableHighlight onPress={()=>alert('add to cart')} underlayColor={'#fff'}><Text style={{fontSize:20}}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                              </View>
                          </View>
                      </View>
                    </View>
  
                    <View style={styles.box}>
                      <Image style={styles.image} source={{uri: 'https://weguarantee.in/image/cache/catalog/products/Heart%20Clense%20Pack-600x600.jpg'}}/>
                      <View style={styles.productTitle}>
                        <Text style={styles.productHeading}>Heart Cleanse 1 Month Pack (Apple Cider Vinegar With Heart Remedy)</Text>
                        <View style={styles.footer}>
                              <View style={styles.price}><Text style={{fontWeight:'bold'}}>Rs. 2000/-</Text></View>
                              <View style={styles.cart}>
                                  <TouchableHighlight onPress={()=>alert('add to cart')} underlayColor={'#fff'}><Text style={{fontSize:20}}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                              </View>
                          </View>
                      </View>
                    </View>
  
                    <View style={styles.box}>
                      <Image style={styles.image} source={{uri: 'https://weguarantee.in/image/cache/catalog/products/Heart%20Clense%20Pack-600x600.jpg'}}/>
                        <View style={styles.productTitle}>
                          <Text style={styles.productHeading}>Heart Cleanse 1 Month Pack (Apple Cider Vinegar With Heart Remedy)</Text>
                          <View style={styles.footer}>
                              <View style={styles.price}><Text style={{fontWeight:'bold'}}>Rs. 2000/-</Text></View>
                              <View style={styles.cart}>
                                  <TouchableHighlight onPress={()=>alert('add to cart')} underlayColor={'#fff'}><Text style={{fontSize:20}}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                              </View>
                          </View>
                        </View>
                    </View>
                    
                    <View style={styles.box}>
                      <Image style={styles.image} source={{uri: 'https://weguarantee.in/image/cache/catalog/products/Heart%20Clense%20Pack-600x600.jpg'}}/>
                        <View style={styles.productTitle}>
                          <Text style={styles.productHeading}>Heart Cleanse 1 Month Pack (Apple Cider Vinegar With Heart Remedy)</Text>
                          <View style={styles.footer}>
                              <View style={styles.price}><Text style={{fontWeight:'bold'}}>Rs. 2000/-</Text></View>
                              <View style={styles.cart}>
                                  <TouchableHighlight onPress={()=>alert('add to cart')} underlayColor={'#fff'}><Text style={{fontSize:20}}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
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
      justifyContent: 'center',
      paddingRight:10
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
export default Page1;
