/* @flow */

import React, { PureComponent } from 'react';
import { ListView, View, Text, StyleSheet, Image,Picker, ToastAndroid, AsyncStorage, TouchableHighlight,Alert, StatusBar, ScrollView } from 'react-native';

var SplashScreen = require('@remobile/react-native-splashscreen');
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, SearchBar, Header,CheckBox, Button, FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import env from './components/env';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

export default class ListViewExample extends PureComponent<{}, State> {
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      country:null,
      progressVisible:false,
      subscribe:'no'
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL+ "feed/rest_api/countries", {
        method:'get',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
      .then((responseData) => {
        if(responseData.success == 1)
        {
          var data = responseData.data.map((data) => {
            // console.log(data);
            return <Picker.Item label={data.name} value={data.country_id} key={data.country_id}/>
          });
          data.unshift(<Picker.Item key='0' value='0' label='Select Country' />);
          this.setState({country:<Picker
            selectedValue={this.state.country_id}
            style={{ height: 50, width: '100%' }}
            onValueChange={(country_id) => this.getStates(country_id)}>
            {data}
          </Picker>});
        }
      })
    });
  }
  getStates(value){
    this.setState({country_id:value});
    console.log(this.state);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Signup',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    },

  })

  _toggle(event) {
    this.setState({checked: !this.state.checked});
  }

  render() {
    const { navigate } = this.props.navigation
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
            <Text style={styles.heading}>Your Personal Details</Text>
            <FormLabel>First Name</FormLabel>
            <FormInput onChangeText={(firstname) => this.setState({firstname})} placeholder="Enter your first name"/>

            <FormLabel>Last Name</FormLabel>
            <FormInput onChangeText={(lastname) => this.setState({lastname})} placeholder="Enter your last name"/>

            <FormLabel>Email</FormLabel>
            <FormInput keyboardType={'email-address'} onChangeText={(email) => this.setState({email})} placeholder="Enter your email"/>

            <FormLabel>Mobile</FormLabel>
            <FormInput keyboardType={'numeric'} onChangeText={(telephone) => this.setState({telephone})} placeholder="Enter mobile number"/>
            
            {/* <Text style={styles.heading}>Your Address</Text>
            <FormLabel>Company</FormLabel>
            <FormInput onChangeText={(company) => this.setState({company})} placeholder="Enter your company name"/>
            <FormLabel>Address</FormLabel>
            <FormInput onChangeText={(address_1) => this.setState({address_1})} placeholder="Enter address"/>
            <FormLabel>City</FormLabel>
            <FormInput onChangeText={(city) => this.setState({city})} placeholder="Enter City"/>
            <FormLabel>Zip</FormLabel>
            <FormInput keyboardType={'numeric'} onChangeText={(postcode) => this.setState({postcode})} placeholder="Enter zip code"/> */}
            {/* <View style={{paddingLeft:20}}>{this.state.country}</View> */}
            <Text style={styles.heading}>Your Password</Text>
            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry={true} onChangeText={(password) => this.setState({password})} placeholder="Enter your password"/>
            <FormLabel>Confirm Password</FormLabel>
            <FormInput secureTextEntry={true} onChangeText={(confirm) => this.setState({confirm})} placeholder="Enter password again"/>
            <Text style={styles.heading}>Newsletter</Text>
            <View style={{flexDirection:'row',marginBottom:10,marginTop:10}}>
                <FormLabel>Subscribe</FormLabel>
                <RadioGroup color='#51c0c3' highlightColor='#fff' style={{flexDirection:'row'}}
                  onSelect={(index, value) => this.onSelect(index, value)} selectedIndex={1}>
                  <RadioButton value='yes' >
                    <Text>Yes</Text>
                  </RadioButton>
                  <RadioButton value='no'>
                    <Text>No</Text>
                  </RadioButton>
                </RadioGroup>
            </View>
           
            <CheckBox
              title='I have read and agree to the Privacy Policy'
              onPress={(event) => this._toggle(event)}
              checked={this.state.checked}
            />
            <Button onPress={()=>this.submit()} raised icon={{ name: 'group' }} title='Continue' style={{ width: '100%' }} backgroundColor="#51c0c3" />
        </View>
        </ScrollView>
      </View>
    );
  }
  onSelect(i,val){
    this.setState({subscribe:val});

  }
  submit(){
    console.log(this.state);
    if(this.state.checked)
    {
      this.setState({progressVisible:true});
      this.setState({agree:1});
      AsyncStorage.getItem('token').then((token) => {
        fetch(env.BASE_URL+"rest/register/register", {
          method:'POST',
          headers:{
            Authorization: 'Bearer ' + JSON.parse(token).access_token,
            Accept  : 'application/json',
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(this.state)
        }).then((response) => response.json())
        .then((responseData) => {
          this.setState({progressVisible:false});
          console.log(responseData);
          if(responseData.success == 1)
          {
            AsyncStorage.setItem('user', JSON.stringify({ name: responseData.data.firstname }));
            AsyncStorage.setItem('user_detail', JSON.stringify(responseData.data));
            Alert.alert(
              'Congratulations',
              'Your Account Successfully created. click to login continue..',
              [
                {text: 'OK', onPress: () => this.props.navigation.navigate('ScreenOne')},
              ],
              { cancelable: false }
            )
          }else{
            ToastAndroid.show(responseData.error[0], ToastAndroid.SHORT);
          }
        })
      })
    }else{
      ToastAndroid.show('You must agree to the Privacy Policy!', ToastAndroid.SHORT);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
    backgroundColor:'white'
  },
  heading:{
      backgroundColor:'#f5f5f5',
      fontSize:16,
      fontWeight:'bold',
      padding:5,
      borderBottomColor:'#ccc',
      borderBottomWidth:1,
      paddingLeft:20
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