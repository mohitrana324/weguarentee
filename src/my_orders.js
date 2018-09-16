/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  StyleSheet, AsyncStorage,Image,Alert,Dimensions,
  ScrollView, ActivityIndicator,ImageBackground,ToastAndroid,
  View, StatusBar, TouchableHighlight,FlatList
} from 'react-native';
import env from './components/env';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { HeaderBackButton } from 'react-navigation';
import { Button } from 'react-native-elements';
var {height, width} = Dimensions.get('window');
class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:''
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'My Orders',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    }
  });

  

  getMyorders(id){
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "account/forder&page=1&id="+id, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          console.log('response',responseData);
          this.setState({data:responseData.orders});
        })
    })
  }
  componentWillMount() {
    AsyncStorage.getItem('user_detail').then((data) => {

      id=JSON.parse(data).customer_id;
      console.log(id)
      this.getMyorders(id);
    }).catch((error)=>console.log(error))      
  }

  _renderItem = ({item}) => {
    console.log('item',item)
   return( <View  style={{flexDirection:'row',marginBottom:2,backgroundColor:'#fff',padding:10,
   borderRadius:4,marginLeft:10,marginRight:10}}>
      <View style={{flexDirection:'column',flex:1}}>
        <Text style={{fontSize:10}}>{item.date_added}</Text>
        <Text># {item.order_id}</Text>
      </View>
      <View style={{flexDirection:'column',flex:2,alignItems:'center'}}>
      <Text><Text style={{fontSize:10}}>Status</Text>{item.status}</Text>
        <Text><Text style={{fontSize:10}}>Total</Text>{item.total}</Text>
      </View>
      <View style={{flexDirection:'column',flex:1}}>      
        
      </View>
    </View>
  )};

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar
            backgroundColor="#51c0c3"
            barStyle="light-content"
          />
          <View style={{marginTop:10}}>
          <FlatList
            data={this.state.data}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={this._renderItem}
          />
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
    paddingBottom: 50
  },
  cartEmpty:{
    flex:1,
    height:height/2+100,
    justifyContent:'center',
    alignItems:'center'
  },
  card: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    height: 130,
    width: '100%',
    flex: 1,
    flexDirection: 'row'
  },
  image: {
    height: 130,
    width: '40%',
    backgroundColor: 'black'
  },
  productContent: {
    padding: 10,
    width: '60%'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: '#fffaf9',
    // height: 70,
    width: '100%',
    flexDirection: 'column'
  },
  unit: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  QTY: {
    flexDirection: 'row',
    marginTop: 20
  },
  min: {
    backgroundColor: '#51c0c3',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  qtyNo: {
    height: 30,
    width: 30,
    backgroundColor: '#fffaf9',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 5,
  },
  box:{
    backgroundColor:'white',
  },
  row:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#f5f5f5',
    justifyContent:'space-between',
    padding:10,
  }
});

export default Page1;
