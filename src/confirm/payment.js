import React, { Component } from 'react';
import {
  Text, ScrollView,
  View, StatusBar, StyleSheet, AsyncStorage, TouchableHighlight, ToastAndroid
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { CheckBox, Button } from 'react-native-elements';

import env from './../components/env';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { ProgressDialog } from 'react-native-simple-dialogs';
class Page3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: null,
      checked: true,
    }
  }
  static navigationOptions = {
    title: 'Payment Method',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    }
  };
  getAddress() {
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "rest/payment_method/payments", {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.success == 1) {
            console.log(responseData.data.payment_methods.g2apay            );
            this.setState({payment:<RadioGroup color='#51c0c3' highlightColor='#f5f5f5'
              onSelect={(index, value) => this.onSelect(index, value)}
            >
              <RadioButton value={responseData.data.payment_methods.cod_order_fee} >
                <Text>{responseData.data.payment_methods.cod_order_fee.title}</Text>
              </RadioButton>

              <RadioButton value={responseData.data.payment_methods.g2apay}>
                <Text>{responseData.data.payment_methods.g2apay.title}</Text>
              </RadioButton>

            </RadioGroup>});
          //   this.setState({payment:<RadioButton value={'item1'} >
          //   <Text>This is item #1</Text>
          // </RadioButton>});


          }
        });
    });
  }
  componentWillMount() {
    console.log('payment');
    this.getAddress();
  }
  onSelect(index, value) {
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
    console.log(value.code);
    this.setState({ progressVisible: true });

    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "rest/payment_method/payments", {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payment_method: value.code, agree:1,comment:'' })
      }).then((response) => response.json())
        .then((responseData) => {
          this.setState({ progressVisible: false });
          if (responseData.success == 1) {
            
          } else {
            ToastAndroid.show(responseData.error[0], ToastAndroid.SHORT);
          }
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
              <Text style={{ fontSize: 18, padding: 5, fontWeight: 'bold' }}>Choose Method</Text>
            </View>
            {/* <Text style={{ padding: 5, fontSize: 14 }}>Default Address</Text> */}
            {this.state.payment}
          </View>
          <Button onPress={()=>this.props.navigation.navigate('ConfirmPayment')} raised title='Continue' style={{ width: '100%' }} backgroundColor="#51c0c3" />
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
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1
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
