import React, { PureComponent } from 'react';
import { ListView, View, Text,YellowBox, StyleSheet, Image,ToastAndroid, AsyncStorage,TouchableOpacity, TouchableHighlight, StatusBar, ScrollView } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HTMLView from 'react-native-htmlview';


export default class ShopingDelivery extends PureComponent{
static navigationOptions =({navigation})=>({
    title: 'Shipping & Delivery',
    headerTintColor: 'white',
    
    headerStyle: {
      backgroundColor: '#51c0c3'
    },
    statusBarStyle: 'light-content',
    headerRight: <View style={{flex:1,flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                    <Text style={{color:'white',paddingLeft:20,padding:5,fontFamily:'WhitneyMedium',fontSize:18}}>
                      <FontAwesome>{Icons.search}</FontAwesome>
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate('Wishlist')}>
                    <Text style={{color:'white',paddingLeft:20,padding:5,fontFamily:'WhitneyMedium',fontSize:18}}>
                      <FontAwesome>{Icons.heart}</FontAwesome>
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                  <View>
                  {typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.cartCount) === 'undefined' ? <Text style={{position:'absolute'}}></Text> : navigation.state.params.cartCount}
                    <Text style={{color:'white',paddingLeft:20,padding:5,paddingRight:20, fontFamily:'WhitneyMedium', fontSize:18}}>
                      <FontAwesome>{Icons.shoppingBag}</FontAwesome>
                    </Text>
                  </View>
                  </TouchableOpacity>
                </View>
  })

  render(){
    return(<ScrollView>
        <View style={styles.container}>
            <StatusBar
            backgroundColor="#51c0c3"
            barStyle="light-content"
            />
            <View style={{ padding:20,marginTop:10}}>
                <HTMLView
                value={HtmlData}
                />
        
            </View>
        </View>
    </ScrollView>);
  }
}

const styles = StyleSheet.create({ 
    container: {
        padding: 0,
        flex:1,
      },
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
      title:{
          fontSize:20,
          fontWeight:'bold'
          ,marginBottom:20
        },
        textStyle:{
            marginBottom:10
        }
});

const HtmlData =`<h3>SHIPPING & DELIVERY</h3><h5>TIME FRAME</h5><p>All orders are shipped within 2 – 3 working days, Monday – Saturday and will be delivered within 7 working days maximum from the date of shipping excluding public holidays. For deliveries in Lucknow maximumof 5 hours and for Delhi within 3 days unless we are exceptionally out of stock, in such cases we will inform you well in advance.</p><h5>Shipping Rates</h5><p>A nominal rate is charged for the shipping of your order if the order is less than Rs. 500. Before the final checkout page the estimated shipping cost will be calculated for your convenience.  Please note that a convenience charge of Rs. 50 will be charged on orders for cash on delivery, and this charge will not be refunded in return and exchange cases, as these are non-refundable charges.</p><h5>Back Orders</h5><p>If an item goes on back order we will ship you the part of your order that is in stock. When the item becomes available we will ship you the rest of your order. You will not be charged any additional shipping and handling for the second shipment.</p><h5>International Shipping</h5><p>For international orders shipping charges will depend on the chosen destination, weight and custom duty of the shipping country. Amount of the order will be charged in Indian currency. For international orders please contact on care@weguarantee.in</p>`;