'use strict';

import React, { Component } from 'react'
import {StyleSheet,Button, Text,View,ActivityIndicator,Image, NavigatorIOS,TouchableHighlight} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { NavigationActions } from 'react-navigation'


var self
class HomePage extends Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    const {params } = navigation.state.params;

    return {
      title:  navigation.state.params.response.empName,
      headerRight: (
        <Button
          title={'Logout'}
          onPress={() =>  self._navigateTo('Login')}
        />
      ),
    };
  };


   componentWillReceiveProps(nextProps) {
    if (nextProps.response) {
      this.props.navigation.setParams({ response });
    }
  }

    constructor (props) {
        super(props);
         self = this
        this.state = {
            signedin: false,
            response :" "
        };

    }


   setState = (state) => {
      this.setState({response: response});
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
          const { params } = this.props.navigation.state;
      //  const {response} = this.navigate.state.params.response;
          return (
              <View style={styles.container}>
                  <Text style={{marginTop:200}}>
                      Welcomen {params.response.empName}
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
