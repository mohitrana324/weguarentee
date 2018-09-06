/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Text, Dimensions,
    View, StatusBar, StyleSheet,Alert, TextInput, ScrollView, WebView, TouchableHighlight, Image,TouchableWithoutFeedback,
    AsyncStorage, ToastAndroid
} from 'react-native';
var { height, width } = Dimensions.get('window');
console.disableYellowBox = true;
import env from './components/env';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { HeaderBackButton } from 'react-navigation';
import ImageSlider from 'react-native-image-slider';
import HTMLView from 'react-native-htmlview';
import { ProgressDialog, Dialog } from 'react-native-simple-dialogs';
import { ListItem, Rating, SearchBar, Header, CheckBox, Button, FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';
class Page1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 1,
            height: 250,
            dialogVisible: false,
            progressVisible: false,
            related:''
        };
    }
    componentDidMount() {
        this.cartCounter();
    }
    componentWillMount() {
        this.getReleated();
        const { params } = this.props.navigation.state;
        AsyncStorage.getItem('token').then((token) => {
            console.log('Bearer ' + JSON.parse(token).access_token);
            this.setState({ progressVisible: true });
            fetch(env.BASE_URL + 'feed/rest_api/products&id=' + params.id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(token).access_token
                }
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('product details',responseData)
                    this.setState({ progressVisible: false });

                    if (responseData.data.special_formated != 0) {
                        var price = <View style={{ padding: 10, flexDirection: 'row' }}><Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{responseData.data.special_formated}</Text><Text style={{ fontWeight: 'bold', color: '#51c0c3', textDecorationLine: 'line-through', textDecorationStyle: 'double' }}>  {responseData.data.price}</Text></View>
                    } else {
                        var price = <Text style={{ padding: 10, fontWeight: 'bold', color: '#51c0c3' }}>{responseData.data.price_formated}</Text>
                    }
                    console.log(responseData.data);
                    responseData.data.images.push(responseData.data.image);
                    if (responseData.data.images.length > 0) {
                        var image = responseData.data.images;
                    } else {
                        var image = [responseData.data.image];
                    }

                    Image.getSize(image[0], (Width, Height) => {
                        this.setState({ ImageWidth: Width, ImageHeight: Height });

                    }, (errorMsg) => {
                    });

                    this.setState({
                        products: <View><ImageSlider images={image}
                            autoPlayWithInterval={3000}
                            style={{ height:width}}
                            onPosiposition={this.state.position}
                            onPositionChanged={position => this.setState({ position })}
                        />
                            <View style={styles.row}>
                                <View style={styles.contentTop}>
                                    <Text style={styles.heading}>{responseData.data.name}</Text>
                                    {price}
                                    <Text style={styles.review}>
                                        <FontAwesome style={{ paddingLeft: 10 }}>{Icons.starO}</FontAwesome>
                                        <FontAwesome style={{ paddingLeft: 10 }}>{Icons.starO}</FontAwesome>
                                        <FontAwesome style={{ paddingLeft: 10 }}>{Icons.starO}</FontAwesome>
                                        <FontAwesome style={{ paddingLeft: 10 }}>{Icons.starO}</FontAwesome>
                                        <FontAwesome style={{ paddingLeft: 10 }}>{Icons.starO}</FontAwesome>
                                        {responseData.data.rating} review / {responseData.data.reviews.review_total} write a review
                            </Text>
                                    <Text style={{ paddingLeft: 10, paddingTop: 10 }}>Brands : {responseData.data.manufacturer}</Text>
                                    <Text style={{ paddingLeft: 10 }}>Product Code: {responseData.data.model}</Text>
                                    <Text style={{ paddingLeft: 10 }}>Availability: {responseData.data.stock_status}</Text>
                                </View>
                                <Text style={styles.heading2}>Description</Text>
                                <HTMLView
                                    value={responseData.data.description}
                                    style={{ padding: 10, margin: 0 }}
                                />
                            </View></View>
                    });
                })
        })
    }

    getReleated() {
        const { params } = this.props.navigation.state;
        AsyncStorage.getItem('token').then((token) => {
            fetch(env.BASE_URL + 'feed/rest_api/related&id=' + params.id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(token).access_token
                }
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData, 'releated');
                    var data = responseData.data.map((data) => {
                        if (data.special_formated != 0) {
                            var price = <View style={{ flexDirection: 'row' }}><Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.special_formated}</Text></View>
                        } else {
                            var price = <Text style={{ fontWeight: 'bold', color: '#51c0c3' }}>{data.price_formated}</Text>
                        }
                        return <View style={styles.box} key={data.product_id}>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('SingleProduct', { id: data.product_id })}><Image style={styles.image} source={{ uri: data.thumb }} /></TouchableHighlight>
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
                    this.setState({ related: data });
                    console.log('final related product',this.state.related);
                })
        })
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
    addWishlist(product_id){
        this.setState({progressVisible:true});
        AsyncStorage.getItem('token').then((token) => {
          fetch(env.BASE_URL + "rest/wishlist/wishlist&id="+product_id, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + JSON.parse(token).access_token,
              Accept  : 'application/json',
                  'Content-Type' : 'application/json'
            }
          }).then((response) => response.json())
            .then((responseData) => {
              console.log(responseData);
              if(responseData.success == 1)
              {this.setState({progressVisible:false});
                ToastAndroid.show('Item added successfully in wishlist', ToastAndroid.SHORT);
              }else
              if(responseData.error[0] == 'You must login or create an account to save item to your wish list'){
                this.setState({progressVisible:false});
                Alert.alert(
                  'Login',
                  'You must login or create account to save item to your wish list',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Login', onPress: () => this.props.navigation.navigate('ScreenFour')},
                  ],
                  { cancelable: false }
                )
              }
    
            })
          })
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
                        this.setState({progressVisible:false});
                        this.cartCounter();
                        // this.props.navigation.setParams({ cartCount: <Text style={styles.badge}>{responseData.data.total_product_count}</Text> });
                        ToastAndroid.show('Item added successfully', ToastAndroid.SHORT);
                    }
                })
        })
    }
    static navigationOptions = ({ navigation }) => ({
        title: 'Products',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#51c0c3'
        },
        headerLeft: <TouchableWithoutFeedback onPress={() => navigation.navigate('DrawerOpen')}><Text style={{
            color: 'white', paddingLeft: 20,
            padding: 5,
            fontFamily: 'WhitneyMedium',
            fontSize: 18
        }}><FontAwesome>{Icons.bars}</FontAwesome></Text></TouchableWithoutFeedback>,
        statusBarStyle: 'light-content',
        //   headerLeft: <TouchableHighlight onPress={() => navigation.navigate("DrawerOpen")}><Text style={{color:'white',paddingLeft:20,
        //   padding:5,
        //   fontFamily:'WhitneyMedium',
        //   fontSize:18}}><FontAwesome>{Icons.bars}</FontAwesome></Text></TouchableHighlight>,
        headerRight: <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                <Text style={{ color: 'white', paddingLeft: 20, padding: 5, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
                    <FontAwesome>{Icons.search}</FontAwesome>
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Wishlist')}>
                <Text style={{ color: 'white', paddingLeft: 20, padding: 5, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
                    <FontAwesome>{Icons.heart}</FontAwesome>
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart')}>
                <View>
                    {typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.cartCount) === 'undefined' ? <Text style={{ position: 'absolute' }}></Text> : navigation.state.params.cartCount}
                    <Text style={{ color: 'white', paddingLeft: 20, padding: 5, paddingRight: 20, fontFamily: 'WhitneyMedium', fontSize: 18 }}>
                        <FontAwesome>{Icons.shoppingBag}</FontAwesome>
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            {/* <TouchableHighlight>
                        <View>1</View>
                        
                      </TouchableHighlight> */}
        </View>
    })

    ratingCompleted = (rating) => {
        this.setState({ rating: rating });
        this.setState({ dialogVisible: true });
    }

    render() {
        const { params } = this.props.navigation.state;
        const slug = params ? params.slug : null;
        const otherParam = params ? params.slug : null;
        const htmlContent = `<div><p><span class="Apple-style-span" style="color: rgb(86, 86, 86); font-family: Arial; font-weight: bold; line-height: normal; "></span></p><p style="color: rgb(86, 86, 86); outline-width: 0px; outline-style: initial; outline-color: initial; margin-top: 0; margin-right: 0px; margin-bottom: 0.78em; margin-left: 0px; line-height: 1.5em; ">In our experience we have found that people who are suffering from Heart disease also have other diseases like Diabetes, High Cholesterol Levels,&nbsp;Constipation etc. So we recommend to correct their digestion problem which is root cause of all diseases. People with Heart disese have been found good relief when used Dr. Patkar's Apple Cider Vinegar and Heart Remedy together. Please find dosage below.</p><p style="color: rgb(86, 86, 86); margin-top: 0.78em; margin-right: 0px; margin-bottom: 0.78em; margin-left: 0px; line-height: 1.5em; ">This combo also works for Weightloss, Asthama, Vericose veins, Fatty liver, Deep Vein Thrombosis, Bhroncitis. etc.</p><p style="color: rgb(86, 86, 86); margin-top: 0.78em; margin-right: 0px; margin-bottom: 0.78em; margin-left: 0px; line-height: 1.5em; ">Dosage&nbsp;<br><br><strong style="font-weight: bold; ">Morning :</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3Tsp.(15ml)<strong style="font-weight: bold; ">&nbsp;Heart remedy</strong>&nbsp;Only once in Morning With warm water 20 minutes&nbsp;<strong style="font-weight: bold; ">before breakfast.</strong><br><br><strong style="font-weight: bold; ">Afternoon:</strong><br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 3 tsp of&nbsp;<strong style="font-weight: bold; ">ACV</strong>&nbsp;in a glass of water &amp; take it ½ hr.&nbsp;<strong style="font-weight: bold; ">before lunch</strong>.( carry diluted bottle(plastic is ok) if you are in office)<br><strong style="font-weight: bold; ">Evening :</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 tsp of<strong style="font-weight: bold; ">&nbsp;ACV</strong>&nbsp;in a glass of water &amp; take it ½ hr.&nbsp;<strong style="font-weight: bold; ">before dinner.</strong><br><br><strong style="font-weight: bold; ">Note :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>People with diabetes should take&nbsp;<strong style="font-weight: bold; ">ACV with Cinnamon and Fenugreek</strong>&nbsp;instead of ACV and see for dosage in Heart and Sugar Care Pack.<br><br>Don't stop your current medicines , Follow up for routine check up with your Doctor &amp; reduce medicine dosage as per his advice.</p><p></p></div>`;
        return (
            <View style={styles.container} >
                <StatusBar backgroundColor="#51c0c3" barStyle="light-content" />
                <ProgressDialog
                    visible={this.state.progressVisible}
                    message="Please, wait..."
                />
                <Dialog
                    visible={this.state.dialogVisible}
                    title="Review"
                    onTouchOutside={() => this.setState({ dialogVisible: false })} >
                    <View>
                        <View>
                            <Text>Name</Text>
                            <TextInput
                                style={{ height: 40, borderColor: '#ccc', borderWidth: 1 }}
                                placeholder="Enter your name"
                                onChangeText={(name) => this.setState({ name })}
                                underlineColorAndroid="white"
                                value={this.state.name}
                            />
                        </View>
                        <View>
                            <Text>Review</Text>
                            <TextInput
                                style={{ height: 100, borderColor: '#ccc', borderWidth: 1 }}
                                placeholder="Write review.."
                                multiline={true}
                                editable={true}
                                onChangeText={(text) => this.setState({ text })}
                                underlineColorAndroid="white"
                                value={this.state.text}
                            />
                        </View>
                        <View style={[styles.row, { justifyContent: 'flex-end' }]}>
                            <TouchableHighlight onPress={() => this.setState({ dialogVisible: false })} style={{ padding: 10 }}><Text style={{ textAlign: 'center' }}>CANCEL</Text></TouchableHighlight>
                            <TouchableHighlight onPress={() => this.reviewSubmit()} style={{ padding: 10 }}><Text style={{ textAlign: 'center', color: '#3c8dbc' }}>SUBMIT</Text></TouchableHighlight>
                        </View>
                    </View>
                </Dialog>
                <ScrollView>
                    {this.state.products}
                    {/* <View style={{ width: '100%' }}>
                        <Text style={{ fontFamily: 'cursive', padding: 10, fontSize: 24, textAlign: 'left', fontWeight: 'bold' }}>Review</Text>
                        <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
                            <Rating
                                showRating
                                startingValue={5}
                                ratingCount={5}
                                ratingColor="#51c0c3"
                                onFinishRating={this.ratingCompleted}
                                style={{ paddingVertical: 10 }}
                            />
                        </View>
                    </View> */}
                    {this.state.related.length>0 ? <View>
                        <Text style={{ fontFamily: 'cursive', padding: 10, fontSize: 24, textAlign: 'left', fontWeight: 'bold' }}>Releated Products</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.state.related}
                        </ScrollView>
                    </View>:<View/>}
                </ScrollView>
                <View style={{ width: '100%', height: 50, left: 0, right: 0, padding: 0, paddingTop: 3, position: 'absolute', bottom: 0 }}><Button onPress={() => this.addCart(params.id)} title='Add to Cart' buttonStyle={{ backgroundColor: '#51c0c3', justifyContent: 'center', width: '100%', alignItems: 'center' }} /></View>
            </View>
        );
    }
    reviewSubmit() {
        console.log(this.state);
        if (this.state.text && this.state.name) {
            this.setState({ progressVisible: true });
            this.setState({ agree: 1 });
            const {params} = this.props.navigation.state;
            AsyncStorage.getItem('token').then((token) => {
                fetch(env.BASE_URL + "feed/rest_api/reviews&id="+params.id, {
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
                        if(responseData.success == 1)
                        {
                            this.setState({dialogVisible:false});
                            Alert.alert(
                                'Congratulations',
                                'Your Review submitted successfully',
                                [
                                  {text: 'OK', onPress: () => console.log('cancel')},
                                ],
                                { cancelable: false }
                              )
                        }else{
                            ToastAndroid.show(responseData.error[0], ToastAndroid.LONG);
                        }
                        console.log(responseData);
                    })
            })
        } else {
            ToastAndroid.show('All Field is required', ToastAndroid.SHORT);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1,
        paddingBottom: 50
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
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
    contentTop: {
        flexDirection: 'column'
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10
    },
    heading2: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10
    },
    review: {
        paddingLeft: 10
    },
    box: {
        backgroundColor: 'white',
        width: width / 2,
        margin: 4,
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

});
export default Page1;
