import Page1 from './Page1/Page1';
import Page2 from './Page2/Page2';
import Page3 from './Page3/Page3';
import {
  Text,
  View, StatusBar, StyleSheet, ScrollView, WebView, TouchableHighlight, ToastAndroid, Alert, BackHandler,
  AsyncStorage
} from 'react-native';
import Home from './Home';
import Category from './Category';
import Notifications from './Notification';
import Profile from './Profile';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import SideMenu from './SideMenu/SideMenu';
import Cart from './Cart';
import SingleProduct from './singleProduct';
import SubCategory from './subCategory';
import Products from './products';
import ProductByCategory from './ProductByCategory';
import Search from './search';
import Wishlist from './wishlist';
import env from './components/env';
import Signup from './signup';
import Login from './login';
import Confirm from './confirmShopping';
import Shipping from './shippingAddress';
import AddAddress from './confirm/address';
import Payment from './confirm/payment';
import confirmWeb from './confirm/Webview';
import ConfirmPayment from './confirm/confirm';
import myOrder from './my_orders';
import AccountInfo from './account_info';
import { DrawerNavigator, TabNavigator, StackNavigator } from 'react-navigation';

const tabs = TabNavigator({
  ScreenOne: { screen: Home, params: '01' },
  ScreenTwo: { screen: Category },
  ScreenThree: { screen: Notifications },
  ScreenFour: { screen: Profile }
}, {
    initialRouteName: 'ScreenOne',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    
    tabBarOptions: {
      activeTintColor: '#fff',
      showIcon: true,
      showLabel: true,
      indicatorStyle: {
        backgroundColor: 'white',
      },
      labelStyle: {
        fontSize: 8.5,
      },
      style: {
        backgroundColor: '#51c0c3',
        height: 55
      }
    },

  });


  const stack = StackNavigator({
    
    tab: {
      screen: tabs
    },
    Cart: { screen: Cart },
    Confirm: { screen: Confirm },
    Shipping: { screen: Shipping },
    SubCategory: { screen: SubCategory },
    Products: { screen: Products },
    ProductByCategory: { screen: ProductByCategory },
    Search: { screen: Search },
    Wishlist: { screen: Wishlist },
    Signup: { screen: Signup },
    Login: { screen: Login },
    AddAddress: { screen: AddAddress },
    Payment:{screen:Payment},
    ConfirmPayment:{screen:ConfirmPayment},
    confirmWeb:{screen:confirmWeb},
    myOrder:{screen:myOrder},
    AccountInfo:{screen:AccountInfo},
    SingleProduct: {
      screen: SingleProduct
    }
  });

const DrawerScreen = DrawerNavigator({
  
  stack: { screen: stack },
  ProductByCategory: {
    screen: ProductByCategory,
  },
  
}, {
    contentComponent: SideMenu,
    drawerWidth: 300,
    gesturesEnabled: false
  });




const preGetStateForAction = stack.router.getStateForAction;
stack.router.getStateForAction = (action, state) => {
  // if (state && state.index == 0 && action.type == 'Navigation/BACK') {
  //   alert('hello');
  // }
  //   if (action.type === 'Navigation/BACK') {
  //     if (state.routes[state.index].routeName == 'tab') {
  // //       console.log(state.routes[state.index].routes[state.routes[state.index].index].routeName);
  //       if (state.routes[state.index].routes[state.routes[state.index].index].routeName == 'ScreenOne') {
  //         Alert.alert(
  //               'Exit App',
  //               'Exiting the application?',
  //               [{
  //                 text: 'Cancel',
  //                 onPress: () => console.log('Cancel Pressed'),
  //                 style: 'cancel'
  //               }, {
  //                 text: 'OK',
  //                 onPress: () => BackHandler.exitApp()
  //               },], {
  //                 cancelable: false
  //               }
  //             )
  //         return null;
  //       }
  //     }
  //   }
  return preGetStateForAction(action, state);
}


export default DrawerScreen;