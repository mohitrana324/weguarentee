import React, { PureComponent } from 'react';
import { ListView, View, Text,YellowBox, StyleSheet, Image,ToastAndroid, AsyncStorage,TouchableOpacity, TouchableHighlight, StatusBar, ScrollView } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HTMLView from 'react-native-htmlview';


export default class ReturnRefundExchange extends PureComponent{
static navigationOptions =({navigation})=>({
    title: 'Return policy',
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

const HtmlData =`<h3>RETURNS, REFUND & EXCHANGE</h3><h5>How To Return An Item</h5><p>Your item must be in its original unused condition to be returned, unless there is a manufacturing defect, or damaged or a wrong item has been shipped. It must also be in its original packaging, price tag and labels should be intact. You must return the item within 15 days of your purchase. Return shipping charges for the orders less than Rs. 500 has to be paid by the user. To complete your return, we will require a receipt of your purchase.

Please E-mail on care@weguarantee.in to request a return and refund and we will assist you.</p><h5>Refund</h5><p>Once your return is received and inspected, we will send you an E-mail to notify you that we have received your returned item and then your return will be processed and a credit will automatically be applied to your credit card or original method of payment within 10 to 15 working days.</p><h5>Return Exceptions</h5><p>Items that are not in original condition or have been opened, or forcibly been tampered with will not be returned. Items that are used, or altered will not be accepted for return or exchange. We will not refund the shipping charges that you paid on the order for less than Rs. 500, however rest of the amount will be refunded.<p><h5>Exchanges</h5><p>If your packaged item is in new condition, you may exchange your item for a different size or quantity. But you will still have to pay return shipping charges for the orders less than Rs. 500. If the exchange order is more than this amount then you will be able to avail free shipping services. You must exchange the item within 15 days of your purchase.

Please Email on care@weguarantee.in to request an exchange and we will assist you</p><h5>Cancellation</h5><p>Once you confirm payment of your order, your order cannot be changed or cancelled. In case a user wants to cancel the order he/she should cancel the order within 10 hours from the time the order was placed. For cancellation please contact on care@weguarantee.in</p>`;