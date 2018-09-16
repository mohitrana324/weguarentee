import React, { PureComponent } from 'react';
import { ListView, View, Text,YellowBox, StyleSheet, Image,ToastAndroid, AsyncStorage,TouchableOpacity, TouchableHighlight, StatusBar, ScrollView } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HTMLView from 'react-native-htmlview';


export default class WhyOrganic extends PureComponent{
static navigationOptions =({navigation})=>({
    title: 'Why Organic',
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

const HtmlData =`<h3>WHY ORGANIC</h3>
<h5>What is Organic Food?</h5><p>Organic food is produced without the use of synthetic fertilizers, pesticides or ionizing radiation (a form of radiation used to kill bacteria) or biotechnology. These methods are legally defined, and any food sold as ‘organic’ is strictly regulated.</p><h5>Why Buy Organic?</h5><p>Organic is more sustainable and healthier for you, your family and the environment.
Often the pesticides and chemical fertilizers used for cultivation of fruits, vegetables and crops, are found to cause birth disorders, infertility, liver abnormalities, neurological impairment, etc.
Drawback and in this case is the general higher cost of food items in comparison to the non-organic counterparts available in the market
We suggest, instead of changing your entire kitchen pantry with organic items, select the items wisely which you consume reglarly in your daily diet.</p><h5>Benefits of Organic Food</h5><p>Organic foods is rich in beneficial nutrients, antioxidants.
In addition, people with allergies to foods, chemicals, or pre servatives often find their symptoms lessen or go away when they eat only organic foods.
  Organic food contains fewer pesticides
  Organic food is often fresher and tastier
  Organic food farming is harmonious with environment
  Organic food is free of genetic modification
So choose organic and encourage your friends too to go organic!</p>`;