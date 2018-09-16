/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,Alert,
  View, StatusBar, YellowBox, StyleSheet, ScrollView, Picker, ToastAndroid, AsyncStorage
} from 'react-native';
import env from './../components/env';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { ListItem, SearchBar, Header, CheckBox, Button, FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';
import { HeaderBackButton } from 'react-navigation';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressVisible: false,
      country_id: 8,
      checked:false
    }
  }

  static navigationOptions = {
    title: 'Add Address',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    }
  };
  setCountry = (value) => {
    this.state.country_id = value;
    this.setState({ country_id: `${value}` })
    console.log(value, this.state.country_id);
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "feed/rest_api/countries&id=" + value, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if (responseData.success == 1) {
            this.setState({states:responseData.data});
          }
        })
    });
  }
  componentDidMount() {
    // setInterval(() => {
    //   this.setState({country_id: this.state.country_id === undefined ? 0 : this.state.country_id});
    // }, 3000)
  }

  componentWillMount() {
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "feed/rest_api/countries", {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if (responseData.success == 1) {
            this.setState({ countries: responseData.data });
          }
        })
    });
  }
  country() {
    if (this.state.countries) {
      var data = this.state.countries.map((data) => {
        return <Picker.Item label={data.name} value={JSON.stringify(data.country_id)} key={data.country_id} />
      });
      data.unshift(<Picker.Item key='0' value='0' label='Select Country' />);
      return (<Picker
        selectedValue={this.state.country_id}
        underlineColorAndroid='#999'
        style={{ height: 50, width: '100%', borderBottomColor:'#ccc', borderBottomWidth:1 }}
        onValueChange={(country_id) => this.setCountry(country_id)}>
        {data}
      </Picker>)
    }
  }

  doState() {
    console.log(this.state);
    if (this.state.states) {
      var data = this.state.states.zone.map((data) => {
        return <Picker.Item label={data.name} value={JSON.stringify(data.zone_id)} key={data.zone_id} />
      });
      data.unshift(<Picker.Item key='0' value='0' label='Select State' />);
      return (<Picker
        selectedValue={this.state.zone_id}
        style={{ height: 50, width: '100%' }}
        onValueChange={(zone_id) => this.setState({zone_id})}>
        {data}
      </Picker>)
    }
  }
  render() {
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
          <View style={styles.row}>
            {/* <Text style={styles.heading}>Your Personal Details</Text> */}
            <FormLabel>First Name</FormLabel>
            <FormInput onChangeText={(firstname) => this.setState({ firstname })} placeholder="Enter your first name" />

            <FormLabel>Last Name</FormLabel>
            <FormInput onChangeText={(lastname) => this.setState({ lastname })} placeholder="Enter your last name" />

            {/* <FormLabel>Email</FormLabel>
            <FormInput keyboardType={'email-address'} onChangeText={(email) => this.setState({email})} placeholder="Enter your email"/>

            <FormLabel>Mobile</FormLabel>
            <FormInput keyboardType={'numeric'} onChangeText={(telephone) => this.setState({telephone})} placeholder="Enter mobile number"/> */}

            {/* <Text style={styles.heading}>Your Address</Text> */}
            {/* <FormLabel>Company</FormLabel>
            <FormInput onChangeText={(company) => this.setState({company})} placeholder="Enter your company name"/> */}
            <FormLabel>Billing Address</FormLabel>
            <FormInput onChangeText={(address_1) => this.setState({ address_1 })} placeholder="Enter address" />
            <FormLabel>Check if Billing and Shipping address are same</FormLabel>
            <View style={{paddingLeft:10,paddingRight:10}}><CheckBox
              containerStyle={{backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#000',borderLeftWidth:0,borderRightWidth:0,borderTopWidth:0}}
              checked={this.state.checked}
              onPress={()=>this.setState({checked:!this.state.checked},()=>{
                if(this.state.checked){
                  this.setState({address_2:this.state.address_1})
                }else{
                  this.setState({address_2:''})
                }
              })}
            /></View>
            <FormLabel>Shipping Address</FormLabel>
            <FormInput value={this.state.address_2} onChangeText={(address_2) => this.setState({ address_2 })} placeholder="Enter address" />
            <FormLabel>City</FormLabel>
            <FormInput onChangeText={(city) => this.setState({ city })} placeholder="Enter City" />
            <FormLabel>Zip</FormLabel>
            <FormInput keyboardType={'numeric'} onChangeText={(postcode) => this.setState({ postcode })} placeholder="Enter zip code" />

            <View style={{ paddingLeft: 20 }}>{this.country()}</View>
            <View style={{ paddingLeft: 20 }}>{this.doState()}</View>

            <Button onPress={() => this.submit()} raised title='Submit' icon={{ name: 'send' }} style={{ width: '100%' }} backgroundColor="#51c0c3" />
          </View>
        </ScrollView>
      </View>
    );
  }
  submit() {
    this.setState({ zone_id: '22' });
    this.setState({ progressVisible: true });
    this.setState({ agree: 1 });
    AsyncStorage.getItem('token').then((token) => {
      console.log(env.BASE_URL + "rest/payment_address/paymentaddress", JSON.parse(token).access_token);
      fetch(env.BASE_URL + "rest/payment_address/paymentaddress", {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      }).then((response) => response.json())
        .then((responseData) => {
          this.setState({ progressVisible: false });
          console.log(responseData);
          if (responseData.success == 1) {
            AsyncStorage.setItem('user', JSON.stringify({ name: responseData.data.firstname }));
            AsyncStorage.setItem('user_detail', JSON.stringify(responseData.data));
            Alert.alert(
              'Congratulations',
              'Your Address Successfully submitted.',
              [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Cart') },
              ],
              { cancelable: false }
            )
          } else {
            ToastAndroid.show(responseData.error[0], ToastAndroid.SHORT);
          }
        })
    })

  }
}
const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
    backgroundColor: 'white'
  },
  heading: {
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 20
  },
  row: {
    flex: 30,
    flexDirection: 'column',
    top: 0,
  },
  title: {
    color: '#999',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 30,
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
});
export default Page1;
