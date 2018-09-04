/* @flow */

import React, { PureComponent } from 'react';
import { ListView, View, Text,TextInput, Alert, StyleSheet, Image, ToastAndroid, AsyncStorage,TouchableWithoutFeedback, TouchableHighlight, StatusBar, ScrollView } from 'react-native';

var SplashScreen = require('@remobile/react-native-splashscreen');
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Header, Button } from 'react-native-elements';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
import env from './components/env';
import {
  NavigationActions,
  StackNavigator,
} from 'react-navigation';
export default class ListViewExample extends PureComponent<{}, State> {
  // componentDidMount() {
  //   SplashScreen.hide();
  // }
  constructor(props) {
    super(props);
    this.state = {
      views: null,
      changePassword:false
    };
  }

  componentWillMount() {
    this.userAccess();
  }

  static navigationOptions = ({ navigation }) => ({
    title: typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.title) === 'undefined' ? 'Login' : navigation.state.params.title,
    tabBarIcon: ({ tintColor }) => <Text style={{ fontSize: 20 }}><FontAwesome color={tintColor}>{Icons.user}</FontAwesome></Text>,
    headerLeft: <TouchableWithoutFeedback onPress={() => navigation.navigate('DrawerOpen')}><Text style={{
      color: 'white', paddingLeft: 20,
      padding: 5,
      fontFamily: 'WhitneyMedium',
      fontSize: 18
    }}><FontAwesome>{Icons.bars}</FontAwesome></Text></TouchableWithoutFeedback>,
    tabBarLabel: 'Profile',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#51c0c3'
    }
  })

  openPage() {
    const { navigate } = this.props.navigation;
    navigate('Video');
  }

  logout() {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to logout account',
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => this._Logout() },
      ],
      { cancelable: false }
    )
  }
  _Logout() {
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "rest/logout/logout", {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if(responseData.success == 1)
          {
            ToastAndroid.show('Successfully Logout', ToastAndroid.SHORT);
            AsyncStorage.setItem('user', JSON.stringify({ name: 'guest' }));
            
            this.props.navigation.navigate('ScreenOne');
          }
        })
    })
  }

  userAccess() {
    AsyncStorage.getItem('user').then((data) => {
      if (JSON.parse(data).name == 'guest') {
        this.setState({
          views: <View style={styles.row}>
            <Text style={styles.title}>Sign In Your Account to start</Text>
            <Button raised icon={{ name: 'person' }} onPress={() => this.props.navigation.navigate('Login')} title='Login' style={{ width: '100%', backgroundColor: "#51c0c3" }} backgroundColor="#51c0c3" />

            <Text style={styles.title}>Get A Fresh Start with Us</Text>
            <Button onPress={() => this.props.navigation.navigate('Signup')} raised icon={{ name: 'group' }} title='Sign Up' style={{ width: '100%' }} backgroundColor="#51c0c3" />
          </View>
        });
      } else {
        this.props.navigation.setParams({ title: 'Profile' });
        this.setState({
          views: <ScrollView>
            <View style={styles.row_1}>
              <TouchableHighlight style={styles.btnColumn} onPress={() => this.props.navigation.navigate('Wishlist')}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome style={{ fontSize: 30, color: 'white' }}>{Icons.heart}</FontAwesome>
                  <Text style={{ color: 'white' }}>My Wishlist</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.btnColumn} onPress={() => this.props.navigation.navigate('myOrder')}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome style={{ fontSize: 30, color: 'white' }}>{Icons.shoppingBag}</FontAwesome>
                  <Text style={{ color: 'white' }}>My Orders</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.list}>
              <TouchableHighlight onPress={()=>this.props.navigation.navigate('AccountInfo')} underlayColor="white" style={styles.item}><Text>Edit Your Account Information</Text></TouchableHighlight>
              <TouchableHighlight onPress={()=>this.setState({changePassword:true})} underlayColor="white" style={styles.item}><Text>Change Password</Text></TouchableHighlight>
              <TouchableHighlight underlayColor="white" onPress={() => this.logout()} style={styles.item}><Text>Logout</Text></TouchableHighlight>
            </View>
          </ScrollView>
        });
      }
    })
  }

  changePassword(){
    this.setState({progressVisible:true});
      AsyncStorage.getItem('token').then((token) => {
        fetch(env.BASE_URL+"rest/account/password", {
          method:'PUT',
          headers:{
            Authorization: 'Bearer ' + JSON.parse(token).access_token,
            Accept  : 'application/json',
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(this.state)
        }).then((response) => response.json())
        .then((responseData) => {
          this.setState({progressVisible:false});
          if(responseData.success == '1')
          {
            ToastAndroid.show('Successfully Chanage Password', ToastAndroid.SHORT);
            this.setState({changePassword:false});
          }else{
            ToastAndroid.show(responseData.error[0], ToastAndroid.SHORT);
          }
        });
      });
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#51c0c3"
          barStyle="light-content"
        />
         <Dialog
          visible={this.state.changePassword}
          title="Change Password"
          onTouchOutside={() => this.setState({ changePassword: false })} >
          <View style={{height:180}}>
            <View style={styles.row_txt}>
              <Text>New Password</Text>
              <TextInput
                style={{ height: 40, borderColor: '#ccc', borderWidth: 1, width: '100%' }}
                onChangeText={(password) => this.setState({ password })}
                underlineColorAndroid='white'
                placeholder="Enter New Password"
                min={10}
                secureTextEntry={true}
                value={this.state.password}
              />
            </View>
            <View style={[styles.row_txt, { paddingTop: 20 }]}>
              <Text>Confirm Password</Text>
              <TextInput
                style={{ height: 40, borderColor: '#ccc', borderWidth: 1, width: '100%' }}
                onChangeText={(confirm) => this.setState({confirm})}
                placeholder="Enter Confirm Password"
                underlineColorAndroid='white'
                min={10}
                secureTextEntry={true}
                value={this.state.confirm}
              />
            </View>

            <View style={[styles.row, {flexDirection:'row',paddingTop:10, justifyContent: 'flex-end' }]}>
              <TouchableHighlight onPress={() => this.setState({ changePassword: false })} style={{ padding: 10 }}><Text style={{ textAlign: 'center' }}>CANCEL</Text></TouchableHighlight>
              <TouchableHighlight onPress={() => this.changePassword()} style={{ padding: 10 }}><Text style={{ textAlign: 'center', color: '#3c8dbc' }}>CHANGE</Text></TouchableHighlight>
            </View>
          </View>
        </Dialog>

          <ProgressDialog
            visible={this.state.progressVisible}
            message="Please, wait..."
          />
        {this.state.views}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    top: 0,
    height: 400
  },
  row_1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    top: 0,
  },
  list: {
    flexDirection: 'column'
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: 'white'
  },
  btnColumn: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#51c0c3'
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