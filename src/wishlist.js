/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,ImageBackground,Alert,
  ToastAndroid,
  AsyncStorage,Dimensions,
  View,StatusBar,TouchableHighlight
} from 'react-native';
import env from './components/env';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { HeaderBackButton } from 'react-navigation';
import { Button } from 'react-native-elements';
import { ProgressDialog } from 'react-native-simple-dialogs';
var {height, width} = Dimensions.get('window');
class Page1 extends Component {
  constructor(props){
    super(props);
    this.state={
      products:null,
      progressVisible:false
    }
  }
  static navigationOptions =({navigation})=>({
    title: 'Wishlist',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    }
  });

  addCart(product){
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
            ToastAndroid.show('Item added successfully', ToastAndroid.SHORT);
          }
        })
    })
  }
  confirmRemove(id){
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "rest/wishlist/wishlist&id="+id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token,
          Accept  : 'application/json',
              'Content-Type' : 'application/json'
        }
      }).then((response) => response.json())
        .then((responseData) => {
          if(responseData.success == 1)
          {
            this.getProducts();
            ToastAndroid.show('Delete Successfully', ToastAndroid.SHORT);
          }
        })
    })
  }
  remove(id){
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete 1 item',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.confirmRemove(id)},
      ],
      { cancelable: false }
    )
  }

  getProducts(){
    AsyncStorage.getItem('token').then((token) => {
      this.setState({progressVisible:true});
      fetch(env.BASE_URL + "rest/wishlist/wishlist", {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token,
          Accept  : 'application/json',
		      'Content-Type' : 'application/json'
        }
      }).then((response) => response.json())
        .then((responseData) => {
          this.setState({progressVisible:false});
          if(responseData.success == 1)
          {
            if(responseData.data.length > 0)
            {
              var data = responseData.data.map((data) => {
                console.log(data);
                if (data.special != 0) {
                  var price = <View style={{ padding: 10, flexDirection: 'row' }}>
                              <Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.special} </Text>
                              <Text style={{ fontWeight: 'bold', color: '#51c0c3', textDecorationLine: 'line-through', textDecorationStyle: 'double' }}> {data.price}</Text>
                              </View>
                } else {
                    var price = <Text style={{ padding: 10, fontWeight: 'bold', color: '#51c0c3' }}>{data.price}</Text>
                }
                return <View style={styles.card} key={data.product_id}>
                          <View style={styles.content}>
                              <ImageBackground source={{uri:data.thumb}} style={styles.image}>
                              </ImageBackground>
                              <View style={styles.productContent}>
                                <Text style={styles.title}>{data.name}</Text>
                                {price}
                                <TouchableHighlight style={{justifyContent:'flex-end',position:'absolute', right:50,bottom:10}} onPress={()=>this.remove(data.product_id)} underlayColor={'#fff'}><Text style={{fontSize:20, padding:5}}><FontAwesome>{Icons.trash}</FontAwesome></Text></TouchableHighlight>
                                <TouchableHighlight style={{justifyContent:'flex-end',position:'absolute', right:10,bottom:10}} onPress={()=>this.addCart(data.product_id)} underlayColor={'#fff'}><Text style={{fontSize:20, padding:5}}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                              </View>
                          </View>
                      </View>;
              })
              this.setState({products:data});
            }else{
              this.setState({ products: <View style={styles.cartEmpty}>
                <FontAwesome style={{fontSize:100, color:'#ccc'}}>{Icons.shoppingBag}</FontAwesome>
                <Text>No Item Found</Text>
              </View> });
            }
          }else{
            this.setState({ products: <View style={styles.cartEmpty}>
              <FontAwesome style={{fontSize:100, color:'#ccc'}}>{Icons.shoppingBag}</FontAwesome>
              <Text>No Item Found</Text>
            </View> });
          }
        })
        
      });
  }

  componentWillMount(){
    this.getProducts();
  }
  render () {
    
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
          {this.state.products}
        </ScrollView>
        {/* <View style={{width: '100%',backgroundColor:'#51c0c3', height: 50,left:0,right:0,padding:0,paddingTop:3, position: 'absolute',bottom: 0}}><Button title='Add to Cart' buttonStyle={{backgroundColor: '#51c0c3',justifyContent: 'center', width: '100%',  alignItems: 'center' }}/></View>                 */}
      </View>
      
      
    );
  }
}

const styles = StyleSheet.create({  
  container: {
    padding: 0,
    flex:1,
  },
  cartEmpty:{
    flex:1,
    height:height/2+100,
    justifyContent:'center',
    alignItems:'center'
  },
  card:{
    height:130,
    width:'100%',
    backgroundColor:'white',
    marginBottom:10,
    flex:1,
    flexDirection:'column',
  },
  content:{
    height:130,
    width:'100%',
    flex:1,
    flexDirection:'row'
  },
  image:{
    height:130,
    width:'35%',
    backgroundColor:'black'
  },
  productContent:{
    padding:10,
    width:'65%'
  },
  title:{
    fontSize:16,
    fontWeight:'bold'
  },
  footer:{
    backgroundColor:'#fffaf9',
    width:'100%',
    flexDirection:'column'
  },
  unit:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    padding:10,
    paddingTop:5,
    paddingBottom:5
  },
  QTY:{
    flexDirection:'row'
  },
  min:{
    backgroundColor:'#51c0c3',
    height:30,
    width:30,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:2,
  },
  qtyNo:{
    height:30,
    width:30,
    backgroundColor:'#fffaf9',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    paddingTop:5,
  }
});

export default Page1;
