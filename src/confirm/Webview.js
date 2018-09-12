import React, { Component } from 'react';
import {
    Text, ScrollView,WebView,
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

    componentWillMount() {

    }


    render() {
        const { params } = this.props.navigation.state;
alert(JSON.stringify(params));
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#51c0c3"
                    barStyle="light-content"
                />
                <WebView
                    source={{ html: params.data }}
                    style={{ marginTop: 20 }}
                />
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
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        justifyContent: 'space-between',
        padding: 10,
    }
});

export default Page3;
