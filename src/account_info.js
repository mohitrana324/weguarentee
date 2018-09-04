/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Text,Alert,
  View,StatusBar,YellowBox,StyleSheet, ScrollView,Picker, ToastAndroid,AsyncStorage,TouchableHighlight,TouchableWithoutFeedback
} from 'react-native';
import env from './components/env';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { ListItem, SearchBar, Header,CheckBox, Button, FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';
import { HeaderBackButton } from 'react-navigation';
import FontAwesome, { Icons } from 'react-native-fontawesome';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
class Page1 extends Component {
  constructor(props){
    super(props);
    this.state={
      progressVisible:false,
      country_id:8
    }
  }
    static navigationOptions = {
        title: 'Account Information',
        headerTintColor: 'white',
        headerLeft: <TouchableWithoutFeedback onPress={() => navigation.navigate('DrawerOpen')}><Text style={{
          color: 'white', paddingLeft: 20,
          padding: 5,
          fontFamily: 'WhitneyMedium',
          fontSize: 18
        }}><FontAwesome>{Icons.bars}</FontAwesome></Text></TouchableWithoutFeedback>,
        headerStyle: {
          backgroundColor: '#51c0c3'
        }
      };
      setCountry = (value) => {
        this.state.country_id = value;
        console.log(value, this.state.country_id);
        AsyncStorage.getItem('token').then((token) => {
          fetch(env.BASE_URL+ "feed/rest_api/countries&id="+value, {
            method:'get',
            headers: {
              Authorization: 'Bearer ' + JSON.parse(token).access_token
            }
          }).then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            if(responseData.success == 1)
            {
              var data = responseData.data.zone.map((data) => {
                
                return <Picker.Item label={data.name} value={JSON.stringify(data.zone_id)} key={data.zone_id}/>
              });
              data.unshift(<Picker.Item key='0' value='0' label='Select State' />);
              this.setState({state:<Picker
                selectedValue={this.state.zone_id}
                style={{ height: 50, width: '100%' }}
                onValueChange={(zone_id) => this.setState({zone_id})}>
                {data}
              </Picker>});
            }
          })
        });
      }
      componentDidMount(){
        // setInterval(() => {
        //   this.setState({country_id: this.state.country_id === undefined ? 0 : this.state.country_id});
        // }, 3000)
      }

      componentWillMount(){
        AsyncStorage.getItem('token').then((token) => {
            this.setState({progressVisible:true});
          fetch(env.BASE_URL+ "rest/account/account", {
            method:'get',
            headers: {
              Authorization: 'Bearer ' + JSON.parse(token).access_token
            }
          }).then((response) => response.json())
          .then((responseData) => {
            this.setState({progressVisible:false});
            if(responseData.success == 1)
            {
              console.log(responseData);
              this.setState(responseData.data);
            }
          })
        });
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
        <View style={styles.row}>
            {/* <Text style={styles.heading}>Your Personal Details</Text> */}
            <FormLabel>First Name</FormLabel>
            <FormInput value={this.state.firstname} onChangeText={(firstname) => this.setState({firstname})} placeholder="Enter your first name"/>

            <FormLabel>Last Name</FormLabel>
            <FormInput value={this.state.lastname} onChangeText={(lastname) => this.setState({lastname})} placeholder="Enter your last name"/>

            <FormLabel>Email</FormLabel>
            <FormInput value={this.state.email} keyboardType={'email-address'} onChangeText={(email) => this.setState({email})} placeholder="Enter your email"/>

            <FormLabel>Telephone</FormLabel>
            <FormInput value={this.state.telephone} keyboardType={'numeric'} onChangeText={(telephone) => this.setState({telephone})} placeholder="Enter Telephone number"/>
            
            <FormLabel>Fax</FormLabel>
            <FormInput value={this.state.fax} keyboardType={'numeric'} onChangeText={(fax) => this.setState({fax})} placeholder="Enter fax number"/>
           
            
            <Button onPress={()=>this.submit()} raised  title='Submit' icon={{ name: 'send' }} style={{ width: '100%' }} backgroundColor="#51c0c3" />
        </View>
        </ScrollView>
      </View>
    );
  }
  submit(){
      this.setState({zone_id:'22'});
      this.setState({progressVisible:true});
      this.setState({agree:1});
      AsyncStorage.getItem('token').then((token) => {
        
        fetch(env.BASE_URL+"rest/account/account", {
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
          console.log(responseData);
          if(responseData.success == 1)
          {
              ToastAndroid.show('Your Account Information Successfully update.', ToastAndroid.SHORT);
              this.props.navigation.navigate('ScreenFour');
            // Alert.alert(
            //     'Congratulations',
            //     'Your Account Information Successfully update. click to login continue..',
            //     [
            //       {text: 'OK', onPress: () => this.props.navigation.navigate('ScreenOne')},
            //     ],
            //     { cancelable: false }
            //   )
            AsyncStorage.setItem('user', JSON.stringify({ name: this.state.firstname+' '+this.state.lastname }));
            AsyncStorage.setItem('user_detail', JSON.stringify(responseData.data));
            
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
export default Page1;
