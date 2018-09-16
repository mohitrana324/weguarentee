import React, { PureComponent } from 'react';
import { ListView, View, Text,YellowBox, StyleSheet, Image,ToastAndroid, AsyncStorage,TouchableOpacity, TouchableHighlight, StatusBar, ScrollView } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class AboutUs extends PureComponent{
static navigationOptions =({navigation})=>({
    title: 'About Us',
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
            <Text style={styles.title}>ABOUT US</Text>
            <Text style={styles.textStyle}>           
            Health is wealth’, haven’t you heard this all your life but never bothered to wonder how true it is! Here at Weguarantee we truly believe in this and for your convenience we have made the secrets to health and well-being just a click away!</Text>
            <Text style={styles.textStyle}>
            Weguarantee brings a line of products from organic items to a varied selection of teas and coffees from all over the globe to the finest of confectionery goods. Our aim is to bring a unique blend of health along with taste right at your doorstep, in no time, guaranteed at its best price with assured quality.</Text>
            <Text style={styles.textStyle}>
            Think about this, will you not be happy to relax after a hectic day of work with a hot cup of magnificently blended coffee brewed at its best to suit your personal taste? Doesn’t the thought of waking up every morning to a new kind of tea fills you with the much needed energy for the day? What could be better than knowing what you are consuming is pure and good for you and your family?</Text>
            <Text style={styles.textStyle}>
            Our commitment is simple and straight and it is to deliver exceptional quality to our consumer which assures wellness. This is also our personal little initiative to promote and show solidarity with the cause of sustainable organic farming which requires a little push and recognition from all of us. It is to save, respect and love what we have been blessed with and that’s nothing else but the natural environment around us.</Text>
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