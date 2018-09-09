import React, { Component } from 'react';
import {
  Text, ScrollView,ToastAndroid,
  View, StatusBar, StyleSheet, AsyncStorage, TouchableHighlight,TouchableOpacity
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { CheckBox } from 'react-native-elements';
import env from './components/env';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { ProgressDialog } from 'react-native-simple-dialogs';
class Page3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      checked: true,
    }
  }
  static navigationOptions =({navigation}) => ({
    title: 'Checkout',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    },
    headerRight:<TouchableOpacity onPress={()=>navigation.navigate('Payment')}><Text style={{color:'white', fontSize:18, padding:10}}><FontAwesome>{Icons.check}</FontAwesome></Text></TouchableOpacity>
  })
  
  getAddress() {
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "rest/payment_address/paymentaddress", {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.success == 1) {
            console.log(responseData);
            
            var data = responseData.data.addresses.map((data, index) => {
                if(data.address_id == responseData.data.address_id)
                {
                  this.setState({selected:index});
                }
              // return <View style={styles.AddBox} key={data.address_id}>
              //   <Text style={styles.text}>{data.firstname} {data.lastname}</Text>
              //   <Text style={styles.text}>21-M-G-Satyam Nagar, Sri Ganganagar, Rajasthan, 335001</Text>
              // </View>;
              return <RadioButton value={data.address_id} style={styles.AddBox} key={data.address_id}>
                <View key={data.address_id}>
                  <Text style={styles.text}>{data.firstname} {data.lastname}</Text>
                  <Text style={styles.text}>{data.address_1}, {data.city}, {data.zone}, {data.postcode}</Text>
                </View>
              </RadioButton>
            });
            this.setState({
              address: <RadioGroup color='#51c0c3' selectedIndex={this.state.selected} highlightColor='#f5f5f5'
                onSelect={(index, value) => this.onSelect(index, value)}
              >{data}</RadioGroup>
            });
          }
        });
    });
  }
  componentWillMount() {
    this.getAddress();
  }
  onSelect(index, value) {
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
    console.log(value);
    this.setState({progressVisible:true});
    
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL+"rest/payment_address/paymentaddress&existing=1", {
        method:'POST',
        headers:{
          Authorization: 'Bearer ' + JSON.parse(token).access_token,
          Accept  : 'application/json',
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({address_id:value})
      }).then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({progressVisible:false});
          this.props.navigation.navigate('Payment');
        // }else{
        //   ToastAndroid.show(responseData.error[0], ToastAndroid.SHORT);
        // }
      })
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#51c0c3"
            barStyle="light-content"
          />
        <ProgressDialog
            visible={this.state.progressVisible}
            message="Please, wait..."
          />
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18, padding: 5, fontWeight: 'bold' }}>Billing Address</Text>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('AddAddress')} style={{ padding: 10 }}><Text><FontAwesome>{Icons.plus}</FontAwesome></Text></TouchableHighlight>
            </View>
            {/* <Text style={{ padding: 5, fontSize: 14 }}>Default Address</Text> */}

            {this.state.address}
          </View>

        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
    paddingBottom: 50
  },
  AddBox: {
    borderBottomColor:'#f5f5f5',
    borderBottomWidth:1
  },
  text: {
    paddingLeft: 5
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 4,
  }
});

export default Page3;
