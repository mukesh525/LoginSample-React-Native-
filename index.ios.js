/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { AppRegistry,NavigatorIOS,Text} from 'react-native';

 import App from './app';
 import DrawerMenu from './Drawer/drawer-toolbar-ios';
 import BookmarkView from './Pages/bookmark';
 import CalendarView from './Pages/calendar';
 import ClientView from './Pages/client';
 import InfoView from './Pages/info';
 import SettingsView from './Pages/setting';
 import { DrawerNavigator, StackNavigator,TabNavigator } from 'react-navigation';





 var LoginView = require('./app/LoginView.js');
 var HomePage = require('./app/Home.js');
 var DetailView = require('./app/Detail.js');
 var TrackPage = require('./app/track.js');
 var MCubeXPage = require('./app/mcubex.js');


 var project = React.createClass({
     render: function() {
         return (
             <NavigatorIOS
                 style={{flex:1}}
                 initialRoute={{
                     component: LoginView,
                         title: 'ProfileView',
                 }}
             />
         );
     }
 });


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
   Home: {
     screen: App,
   },
   Stack: {
     screen: stackNavigator
   }
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










 const HomeScreenNavigator = TabNavigator({
   Track: { screen: TrackPage },
   Mcubex: { screen: MCubeXPage },
 });

 // const App = StackNavigator({
 //   Login: { screen: LoginView },
 //   Home: { screen: HomeScreenNavigator },
 //   Detail: { screen: DetailView},
 // });

 const MainNavigator = StackNavigator({
    login: {screen: LoginView,
      navigationOptions: {
      title: `Login`,
      header: true,
    }},
    Home: {screen: easyRNRoute,
      navigationOptions: {
      title: `Home`,
      header: false,
  }},
 });


 AppRegistry.registerComponent("LoginSample", () => MainNavigator);


 //AppRegistry.registerComponent('LoginSample', () => App);
