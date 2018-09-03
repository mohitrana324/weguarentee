/* @flow */

import React, { PureComponent } from 'react';
import { ListView, View, Text, StyleSheet, Image, ToastAndroid, AsyncStorage, TouchableHighlight, StatusBar, ScrollView } from 'react-native';

var SplashScreen = require('@remobile/react-native-splashscreen');
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, SearchBar, Header,CheckBox, Button, FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import env from './components/env';
import { ProgressDialog } from 'react-native-simple-dialogs';
export default class ListViewExample extends PureComponent<{}, State> {
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      progressVisible:false
    }
  }


  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
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
            message="Authentication"
          />
        <View style={styles.row}>
           
            <FormLabel>Email</FormLabel>
            <FormInput keyboardType={'email-address'} onChangeText={(email) => this.setState({email})} placeholder="Enter your email"/>

           
            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry={true} onChangeText={(password) => this.setState({password})} placeholder="Enter your password"/>
           
            <Button onPress={()=>this.submit()} raised title='Login' style={{ width: '100%' }} backgroundColor="#51c0c3" />
        </View>
        </ScrollView>
      </View>
    );
  }
  submit(){
      this.setState({progressVisible:true});
      AsyncStorage.getItem('token').then((token) => {
        fetch(env.BASE_URL+"rest/login/login", {
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
            this.props.navigation.navigate('ScreenOne');
          }else if(responseData.error[0] == "User is logged."){
            this.props.navigation.navigate('ScreenOne');
          }else{
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