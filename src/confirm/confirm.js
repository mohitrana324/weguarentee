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
        title: 'Invoice',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#51c0c3'
        }
    };
    getAddress() {
        AsyncStorage.getItem('token').then((token) => {
            fetch(env.BASE_URL + "rest/simple_confirm/confirm", {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(token).access_token
                }
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    if (responseData.success == 1) {
                        console.log(responseData.data.products);
                        this.setState({btn: <Button onPress={() => this.props.navigation.navigate('confirmWeb', {data:responseData.data.payment})} raised title='Continue' style={{ width: '100%' }} backgroundColor="#51c0c3" />});
                        this.setState({orderNo:<Text style={{ fontSize: 18, padding: 5, fontWeight: 'bold' }}>Order No:#{responseData.data.order_id}</Text>});
                        var data = responseData.data.products.map(data => {
                            console.log(data);
                            return <View key={data.key}><View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ padding: 5,width:'60%', fontSize: 14 }}>{data.name}</Text>
                                        <Text style={{ padding: 5,width:'10%', fontSize: 14 }}>{data.quantity}</Text>
                                        <Text style={{ padding: 5,width:'30%', fontSize: 14 }}>{data.total}</Text>
                                    </View>
                                </View>;
                        })
                        this.setState({ products: data });
                        var total = responseData.data.totals.map(function(data, key){
                            return <View style={styles.row} key={key}>
                              <View style={styles.col}><Text style={{fontWeight:'bold'}}>{data.title}</Text></View>
                              <View style={styles.col}><Text style={{fontWeight:'bold'}}>{data.text}</Text></View>
                            </View>;
                          });
                          this.setState({total:total});

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
                body: JSON.stringify({ payment_method: value.code, agree: 1, comment: '' })
            }).then((response) => response.json())
                .then((responseData) => {
                    this.setState({ progressVisible: false });
                    // if (responseData.success == 1) {
                        
                    // } else {
                    //     ToastAndroid.show(responseData.error[0], ToastAndroid.SHORT);
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
                            {this.state.orderNo}
                        </View>
                        
                        {/* <Text style={{ padding: 5, fontSize: 14 }}>Default Address</Text> */}
                        {this.state.products}
                        {this.state.total}
                    </View>
                    {this.state.btn}
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
    },
    row:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#f5f5f5',
        justifyContent:'space-between',
        padding:10,
      }
});

export default Page3;
