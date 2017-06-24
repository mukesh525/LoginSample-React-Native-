/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { AppRegistry,NavigatorIOS} from 'react-native';
 import {StackNavigator} from 'react-navigation';
 var LoginView = require('./app/LoginView.js');
 var HomePage = require('./app/Home.js');
 var DetailView = require('./app/Detail.js');
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



 const App = StackNavigator({
   Login: { screen: LoginView },
   Home: { screen: HomePage },
   Detail: { screen: DetailView},
 });




 AppRegistry.registerComponent("LoginSample", () => App);


 //AppRegistry.registerComponent('LoginSample', () => App);
