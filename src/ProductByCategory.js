/* @flow */

import React, { PureComponent } from 'react';
import { ListView, View, Text, YellowBox, Modal, Dimensions, StyleSheet, Alert, ActivityIndicator, Image,
     ToastAndroid, AsyncStorage, TouchableOpacity, TouchableHighlight, StatusBar, ScrollView } from 'react-native';

var SplashScreen = require('@remobile/react-native-splashscreen');
import ImageSlider from 'react-native-image-slider';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Header, SearchBar, CheckBox } from 'react-native-elements';
import env from './components/env';
import Tabs from './homeTabs';
import { ProgressDialog } from 'react-native-simple-dialogs';
import SelectMultiple from 'react-native-select-multiple';

const fruits = ['Apples', 'Oranges', 'Pears']
const renderLabel = (label, style) => {
    console.log(label, style);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginLeft: 10 }}>
                <Text style={style}>{label}</Text>
            </View>
        </View>
    )
}
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
export default class ListViewExample extends PureComponent<{}, State> {
    constructor(props) {
        super(props);
        global.page = 1;
        global.products = [];

        this.state = {
            position: 1,
            height: 250,
            page: 1,
            selectedFruits: [],
            progressVisible: false,
            modalVisible: false,
        };
    }

    cartCounter() {
        // cart counter get
        AsyncStorage.getItem('token').then((token) => {
            fetch(env.BASE_URL + "rest/cart/cart", {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(token).access_token
                }
            }).then((response) => response.json())
                .then((responseData) => {
                    if (responseData.success == 1) {
                        if (responseData.data.length === 0) {
                            this.props.navigation.setParams({ cartCount: <Text style={{ position: 'absolute' }}></Text> });
                        } else {
                            this.props.navigation.setParams({ cartCount: <Text style={styles.badge}>{responseData.data.total_product_count}</Text> });
                        }
                    }
                })
        })
        // cart counter get end
    }
    addCart(product) {
        this.setState({progressVisible:true});
        AsyncStorage.getItem('token').then((token) => {
            fetch(env.BASE_URL + "rest/cart/cart", {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(token).access_token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ product_id: product, quantity: 1 })
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    if (responseData.success == 1) {
                        this.cartCounter();
                        this.setState({progressVisible:false});
                        // this.props.navigation.setParams({ cartCount: <Text style={styles.badge}>{responseData.data.total_product_count}</Text> });
                        ToastAndroid.show('Item added successfully', ToastAndroid.SHORT);
                    }
                })
        })
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    filterApply() {
        console.log(this.state.selectedFruits);
        var str = '';
        for (var f = 0; f < this.state.selectedFruits.length; f++) {
            if (this.state.selectedFruits.length == (f + 1)) {
                str += this.state.selectedFruits[f].value;
            } else {
                str += this.state.selectedFruits[f].value + ',';
            }
        }

        this.setState({ filter: str });
        this.setState({ progressVisible: true });
        global.products = [];
        AsyncStorage.getItem('token').then((token) => {
            fetch(env.BASE_URL + "feed/rest_api/products&category=" + this.props.navigation.state.params.data.category_id + "&filters=" + str, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(token).access_token
                }
            }).then((response) => response.json())
                .then((responseData) => {
                    this.setState({ loading: <Text></Text> });
                    this.setModalVisible(!this.state.modalVisible);
                    this.setState({ progressVisible: false });
                    responseData.data.map((product) => {
                        global.products.push(product);
                    });
                    var data = global.products.map((data) => {
                        if (data.special_formated != 0) {
                            var price = <View style={{ flexDirection: 'row' }}><Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.special_formated}</Text></View>
                        } else {
                            var price = <Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.price_formated}</Text>
                        }
                        return <View style={styles.box} key={data.product_id}>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('SingleProduct', { id: data.product_id })}><Image style={styles.image} source={{ uri: data.image }} /></TouchableHighlight>
                            <View style={styles.productTitle}>
                                <Text style={styles.productHeading}>{data.name}</Text>
                                <View style={styles.footer}>
                                    <View style={styles.price}>{price}</View>
                                    <View style={styles.cart}>
                                        <TouchableHighlight onPress={() => this.addWishlist(data.product_id)} underlayColor={'#fff'} style={{ marginRight: 10, }}><Text style={{ fontSize: 20, padding: 5 }}><FontAwesome>{Icons.heart}</FontAwesome></Text></TouchableHighlight>
                                        <TouchableHighlight onPress={() => this.addCart(data.product_id)} underlayColor={'#fff'}><Text style={{ fontSize: 20, padding: 5 }}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        </View>;
                    })
                    this.setState({ products: data });
                })
        })
    }
    componentWillMount() {
        this.cartCounter();
        console.log(this.props.navigation.state);
        const {params} = this.props.navigation.state;
        if (params.data.filters) {
            if (params.data.filters.filter_groups.length > 0) {
                this.setState({
                    filterBtn: <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, backgroundColor: 'white', alignItems: 'stretch' }}>
                        <TouchableHighlight onPress={() => { this.setModalVisible(true); }} style={{ flex: 1, padding: 15, alignItems: 'center' }}><Text style={{ fontSize: 16 }}><FontAwesome>{Icons.filter}</FontAwesome> Filter</Text></TouchableHighlight>
                    </View>
                });
            }
        }
        AsyncStorage.getItem('token').then((token) => {
            this.setState({ progressVisible: true });
            fetch(env.BASE_URL + "feed/rest_api/products&category=" + this.props.navigation.state.params.data.category_id + "&limit=8&page=1", {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(token).access_token
                }
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    this.setState({ progressVisible: false });
                    if (responseData.success == 1) {
                        responseData.data.map((product) => {
                            global.products.push(product);
                        });
                        var data = global.products.map((data) => {
                            if (data.special_formated != 0) {
                                var price = <View style={{ flexDirection: 'row' }}><Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.special_formated}</Text></View>
                            } else {
                                var price = <Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.price_formated}</Text>
                            }
                            return <View style={styles.box} key={data.product_id}>
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('SingleProduct', { id: data.product_id })}><Image style={styles.image} source={{ uri: data.image }} /></TouchableHighlight>
                                <View style={styles.productTitle}>
                                    <Text style={styles.productHeading}>{data.name}</Text>
                                    <View style={styles.footer}>
                                        <View style={styles.price}>{price}</View>
                                        <View style={styles.cart}>
                                            <TouchableHighlight onPress={() => this.addWishlist(data.product_id)} underlayColor={'#fff'} style={{ marginRight: 10, }}><Text style={{ fontSize: 20, padding: 5 }}><FontAwesome>{Icons.heart}</FontAwesome></Text></TouchableHighlight>
                                            <TouchableHighlight onPress={() => this.addCart(data.product_id)} underlayColor={'#fff'}><Text style={{ fontSize: 20, padding: 5 }}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </View>;
                        })
                        this.setState({ products: data });
                    }
                })
        })
    }

    addWishlist(product_id) {
        this.setState({progressVisible:true});
        AsyncStorage.getItem('token').then((token) => {
            fetch(env.BASE_URL + "rest/wishlist/wishlist&id=" + product_id, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(token).access_token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    if (responseData.success == 1) {
                        this.setState({progressVisible:false});
                        ToastAndroid.show('Item added successfully in wishlist', ToastAndroid.SHORT);
                    } else
                        if (responseData.error[0] == 'You must login or create an account to save item to your wish list') {
                            this.setState({progressVisible:false});
                            Alert.alert(
                                'Login',
                                'You must login or create account to save item to your wish list',
                                [
                                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                    { text: 'Login', onPress: () => this.props.navigation.navigate('Login') },
                                ],
                                { cancelable: false }
                            )
                        }

                })
        })
    }

    handleScroll = (event) => {

        var windowHeight = Dimensions.get('window').height,
            height = event.nativeEvent.contentSize.height,
            offset = event.nativeEvent.contentOffset.y;
        var productsLength = global.products.length, total = global.page * 8;

        if (windowHeight + offset >= height && productsLength === total) {
            console.log(global.page, global.products.length, );
            global.page = global.page + 1;
            this.setState({ loading: <ActivityIndicator size="large" color="#0000ff" /> });
            AsyncStorage.getItem('token').then((token) => {

                fetch(env.BASE_URL + "feed/rest_api/products&category=" + this.props.navigation.state.params.data.category_id + "&limit=8&page=" + global.page, {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(token).access_token
                    }
                }).then((response) => response.json())
                    .then((responseData) => {
                        console.log(responseData);
                        responseData.data.map((product) => {
                            global.products.push(product);
                        });
                        var data = global.products.map((data) => {
                            if (data.special_formated != 0) {
                                var price = <View style={{ flexDirection: 'row' }}><Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.special_formated}</Text></View>
                            } else {
                                var price = <Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.price_formated}</Text>
                            }
                            return <View style={styles.box} key={data.product_id}>
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('SingleProduct', { id: data.product_id })}><Image style={styles.image} source={{ uri: data.image }} /></TouchableHighlight>
                                <View style={styles.productTitle}>
                                    <Text style={styles.productHeading}>{data.name}</Text>
                                    <View style={styles.footer}>
                                        <View style={styles.price}>{price}</View>
                                        <View style={styles.cart}>
                                            <TouchableHighlight onPress={() => this.addWishlist(data.product_id)} underlayColor={'#fff'} style={{ marginRight: 10, }}><Text style={{ fontSize: 20, padding: 5 }}><FontAwesome>{Icons.heart}</FontAwesome></Text></TouchableHighlight>
                                            <TouchableHighlight onPress={() => this.addCart(data.product_id)} underlayColor={'#fff'}><Text style={{ fontSize: 20, padding: 5 }}><FontAwesome>{Icons.shoppingCart}</FontAwesome></Text></TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </View>;
                        })
                        this.setState({ products: data });
                    })
            })
        }
    }




    static navigationOptions = ({ navigation }) => ({
        title: 'Products',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#51c0c3'
        },
        headerLeft: <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}><Text style={{
            color: 'white', paddingLeft: 20,
            padding: 5,
            fontFamily: 'WhitneyMedium',
            fontSize: 18
        }}><FontAwesome>{Icons.bars}</FontAwesome></Text></TouchableOpacity>,
        statusBarStyle: 'light-content',
        headerRight: <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Text style={{ color: 'white', paddingLeft: 20, padding: 5, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
                    <FontAwesome>{Icons.search}</FontAwesome>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
                <Text style={{ color: 'white', paddingLeft: 20, padding: 5, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
                    <FontAwesome>{Icons.heart}</FontAwesome>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View>
                    {typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.cartCount) === 'undefined' ? <Text style={{ position: 'absolute' }}></Text> : navigation.state.params.cartCount}
                    <Text style={{ color: 'white', paddingLeft: 20, padding: 5, paddingRight: 20, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
                        <FontAwesome>{Icons.shoppingBag}</FontAwesome>
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    })

    openDrawer = () => {
        const { navigate } = this.props.navigation;
        this.props.navigation.navigate('DrawerOpen');
    };



    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    onSelectionsChange = (selectedFruits) => {
        // selectedFruits is array of { label, value }
        this.setState({ selectedFruits })
        console.log(this.state);
    }
    renderFilter(data) {
        console.log(data);
    }
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        var array = [];
        for (var i = 0; i < params.data.filters.filter_groups.length; i++) {
            for (var j = 0; j < params.data.filters.filter_groups[i].filter.length; j++) {
                params.data.filters.filter_groups[i].filter[j].label = params.data.filters.filter_groups[i].filter[j].name;
                params.data.filters.filter_groups[i].filter[j].value = params.data.filters.filter_groups[i].filter[j].filter_id;
            }
        }
        

        return (
            <ScrollView onScroll={this.handleScroll}>
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="#51c0c3"
                        barStyle="light-content"
                    />
                    <ProgressDialog
                        visible={this.state.progressVisible}
                        message="Please, wait..."
                    />

                    {this.state.filterBtn}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={{ marginTop: 0, flex: 1, borderTopColor: '#f5f5f5', borderTopWidth: 1, backgroundColor: 'rgba(255,255,255,0.5)' }}>
                            <View style={styles.header}>
                                <Text style={{ fontSize: 16, textAlign: 'center' }}><FontAwesome>{Icons.filter}</FontAwesome> Filter</Text>
                            </View>
                            <ScrollView>
                                {params.data.filters.filter_groups.map(data => <View key={data.filter_group_id} style={{ backgroundColor: 'white', marginBottom: 5 }}>
                                    <Text style={{ padding: 10, fontWeight: 'bold' }}>{data.name}</Text>
                                    <SelectMultiple
                                        items={data.filter}
                                        selectedItems={this.state.selectedFruits}
                                        onSelectionsChange={this.onSelectionsChange} />
                                </View>)}
                            </ScrollView>
                            <View style={{ backgroundColor: 'white', padding: 5, position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'stretch', flex: 1 }}>
                                <TouchableHighlight style={[styles.footerBtn, { backgroundColor: '#f5f5f5' }]} onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                                    <Text style={styles.footerBtnTxt}>Cancel</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={[styles.footerBtn, { backgroundColor: '#51c0c3' }]} onPress={() => this.filterApply()}>
                                    <Text style={[styles.footerBtnTxt, { color: 'white' }]}>Apply</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>



                    <View style={styles.row}>
                        {this.state.products}
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>{this.state.loading}</View>
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
    },
    footerBtn: {
        width: '50%',
        padding: 15,
    },
    footerBtnTxt: {
        textAlign: 'center'
    },
    header: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        padding: 15,
        width: '100%'
    },
    // slider:{
    //   height:260,
    //   width:100,
    // },
    badge: {
        position: 'absolute',
        backgroundColor: 'red',
        height: 20,
        textAlign: 'center',
        color: 'white',
        width: 20,
        borderRadius: 50,
        right: 10,
        top: 0,
        zIndex: 99,
    },
    tabIcon: {
        backgroundColor: 'white',
        marginBottom: 3,
        height: 70,

    },
    tabItem: {
        width: 72,
        margin: 3,
        height: 64,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabTitle: {
        fontSize: 10,
        textAlign: 'center',
        height: 26,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    box: {
        backgroundColor: 'white',
        width: '48%',
        margin: '1%',
        // height:221,
        // flexDirection:'row'
    },
    image: {
        height: 180,
    },
    productTitle: {
        flexDirection: 'column',
        height: 80
    },
    productHeading: {
        flex: 1, flexWrap: 'wrap',
        padding: 5,
        height: 47,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        justifyContent: 'center',
        paddingLeft: 10,
    },
    cart: {
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        paddingRight: 10,
        flex: 1,
        flexDirection: 'row',
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