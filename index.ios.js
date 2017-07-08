/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { AppRegistry,NavigatorIOS,Text,AsyncStorage} from 'react-native';

 import App from './app';
 import DrawerMenu from './Drawer/drawer-toolbar-ios';
 import BookmarkView from './Pages/bookmark';
 import CalendarView from './Pages/calendar';
 import ClientView from './Pages/client';
 import DetailView from './Pages/detail'
 import InfoView from './Pages/info';
 import SettingsView from './Pages/setting';
 import { DrawerNavigator, StackNavigator,TabNavigator } from 'react-navigation';




 var LoginView = require('./app/LoginView.js');

  var response =  LoginView.response;
     console.log(response);
 // //
 //  async _getStorageValue(){
 //   var value = await AsyncStorage.getItem('response')
 //   return JSON.parse(value)
 // }







 const stackNavigator = StackNavigator({
   Info: { screen: InfoView },
   Settings: {screen: SettingsView },
   Bookmark: {screen: BookmarkView },
   Calendar: {screen: CalendarView},
   Client: {screen: ClientView},
   }, {
    headerMode: 'none'
 });

 const easyRNRoute = DrawerNavigator({
   Home: { screen: App},
   Details: { screen: DetailView},
   Stack :{ screen: stackNavigator}
   }, {
   contentComponent: DrawerMenu,
   contentOptions: {
     activeTintColor: '#e91e63',
     style: {
       flex: 1,
       paddingTop: 15,
     }
   }
 });


 const MainNavigator = StackNavigator({
    login: {screen: LoginView,
      navigationOptions: {
      title: `Login`,
      header: false,
      gesturesEnabled: false,
    }},
    Home: {screen: easyRNRoute,
      navigationOptions: {
      title: `Home`,
      header: false,
      gesturesEnabled: false,
  }},



 });
//var response = await AsyncStorage.getItem('response');

 AppRegistry.registerComponent("LoginSample", () => MainNavigator);


 //AppRegistry.registerComponent('LoginSample', () => App);
