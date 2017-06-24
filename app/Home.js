'use strict';

import React, { Component } from 'react'
import {StyleSheet,Button, Text,View,ActivityIndicator,Image, NavigatorIOS,TouchableHighlight} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { NavigationActions } from 'react-navigation'


var self
class HomePage extends Component {
    // const {state, setParams} = navigation;
    // const isInfo = state.params.mode === 'info';
    // const {user} = state.params;

    static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Home',
      headerRight: (
        <Button
          title={'Logout'}
          onPress={() =>  self._navigateTo('Login')}
        />
      ),
    };
  };




    constructor (props) {
        super(props);
         self = this
        this.state = {
            signedin: false
        };

    }

      changeView() {
        navigate('Login', { name: 'Jane' })
      }


      _navigateTo = (routeName: string) => {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })]
      })
        this.props.navigation.dispatch(actionToDispatch)
       }




      render () {
         const { navigate } = this.props.navigation;
         const {state} = this.props.navigation
         const { params } = this.props.navigation.state;
          return (
              <View style={styles.container}>
                  <Text style={{marginTop:200}}>
                      Welcome 
                  </Text>
                      <TouchableHighlight onPress={() => navigate('Detail')} style={{height:50, flexDirection: 'row', justifyContnet: 'center',backgroundColor: '#ddd'}}>
                      <Text style={{fontSize:10,margin :20}}>Detail Page</Text>
                     </TouchableHighlight>
              </View>
          );
      }
 }
 var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
 });

 module.exports = HomePage;
