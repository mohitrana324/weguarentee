
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style';
import { NavigationActions } from 'react-navigation';
import { ScrollView, AsyncStorage, Text, View } from 'react-native';
import env from './../components/env';
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null
    }
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  componentWillMount() {
    AsyncStorage.getItem('user').then((data) => {
      if (JSON.parse(data).name == 'guest') {
        this.setState({name:'Welcome Guest!'});
      }
      else {
        this.setState({name:'Welcome '+JSON.parse(data).name});
      }
    })

    // setInterval(() => {
    //   AsyncStorage.getItem('user').then(data=>{
    //     if(data != undefined)
    //     {
    //       AsyncStorage.getItem('user').then((data) => {
    //         if (JSON.parse(data).name == 'guest') {
    //           this.setState({name:'Guest'});
    //         }
    //         else {
    //           this.setState({name:JSON.parse(data).name});
    //         }
    //       })
    //       this.category();
    //     }
    //   })
    // }, 4000);
    setTimeout(()=>{
      this.category();  
      AsyncStorage.getItem('user').then((data) => {
        if (JSON.parse(data).name == 'guest') {
          this.setState({name:'Welcome Guest!'});
        }
        else {
          this.setState({name:'Welcome '+JSON.parse(data).name});
        }
      })
    }, 3000)
    
    this.category();
  }

  category(){
    console.log('Category function called');
    AsyncStorage.getItem('token').then((token) => {
      fetch(env.BASE_URL + "feed/rest_api/categories", {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token).access_token
        }
      }).then((response) => response.json())
        .then((responseData) => {
          console.log(env.BASE_URL + "feed/rest_api/categories");
          console.log(responseData);
          if (responseData.success == 1) {
            var data = responseData.data.map((data) => {
              var title = data.name.replace(/(<([^>]+)>)/ig, '');
              return <Text key={data.category_id} style={styles.navItemStyle} onPress={() => this.props.navigation.navigate('SubCategory', { data: data })}>
                {title.replace('&amp;', '&')}
              </Text>
            })
            this.setState({ category: data });
          }
          
        })
    })
  }
  render() {
    
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={{ height: 100, width: '100%', flex: 1, backgroundColor: '#51c0c3', justifyContent: 'center' }}>
              <Text key={100} style={{ textAlign: 'center', fontSize: 18,color:'white', fontWeight: 'bold' }}>{this.state.name}</Text>
            </View>
            <Text style={styles.sectionHeadingStyle}>
              SHOP FOR
            </Text>
            <View style={styles.navSectionStyle}>
            <Text key={0} style={styles.navItemStyle} onPress={() => this.props.navigation.navigate('ScreenOne')}>
                Home
              </Text>
              {this.state.category}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={{ textAlign: 'center', color: '#ccc' }}>Copyright Weguarantee</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;