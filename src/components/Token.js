import React, { PureComponent } from 'react';
import {
    ListView,
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    Picker, PixelRatio, Button,
    ToastAndroid,
    AsyncStorage,
    TouchableHighlight,
    StatusBar, ScrollView
} from 'react-native';
import env from './env';
const GET = {
    balance: () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then((token) => {
                console.log(token);
                if (!token || token == null) {
                  console.log('runing');
                  fetch(env.BASE_URL + "feed/rest_api/gettoken&grant_type=client_credentials", {
                    method: 'post',
                    headers: {
                      Authorization: 'Basic d2VndWFyYW50ZWU6dGVjaG5vQDA4MTA='
                    }
                  }).then((response) => response.json())
                    .then((responseData) => {
                      if (responseData.success == 1) {
                        AsyncStorage.setItem('token', JSON.stringify(responseData.data));
                        AsyncStorage.setItem('user', JSON.stringify({ name: 'guest' }));
                        resolve(responseData);
                      }
                    })
                }
              }); //Guest User Access token end
            // AsyncStorage.getItem('user').then((user) => {
            //     AsyncStorage.getItem('token').then((token) => {
            //         fetch(env.BASE_URL + "/balance/" + JSON.parse(user).id, {
            //             method: 'GET',
            //             header: {
            //                 'Accept': 'application/json',
            //                 'Content-Type': 'application/json',
            //                 'Authorization': 'Bearer ' + JSON.parse(token)
            //             }
            //         }).then((response) => response.json())
            //             .then((responseData) => {
            //                 console.log(responseData);
            //                 AsyncStorage.setItem('balance', JSON.stringify(responseData));
            //                 resolve(responseData);
            //             })
            //     })
            // })
        })
    }

}
export default GET;
