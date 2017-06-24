'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,AsyncStorage,StyleSheet,Text,
  Picker,View,AppState,Alert,Image,ActivityIndicator,
  TextInput,TouchableHighlight,TouchableOpacity,Platform
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Logo from './logo';

const styles =StyleSheet.create({

  container:{
    paddingTop: 30,
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    marginBottom:40
   },
    input :{
            height:40,
            margin:15,
            borderColor: '#7a42f4',
            borderWidth: 1

      },
      button: {
        backgroundColor: '#7a42f4',
        height:40,
        margin:15,
        padding:10,
        alignItems :'center'
    },
    submitButtonText:{
         color: 'white',
         fontSize:20
      },
      logo:{
           width: 75,
           height:75,
           margin:15

        },
        innerView :{
          margin:0,
          flexDirection:'row',
          justifyContent:'center'

        },
        title :{
          fontSize:25,
          height:40,
          margin:15,
          padding:10,
          alignItems:'center'

        }
    });

var HomePage = require('./Home.js');
class LoginView extends Component{

  static navigationOptions = {
      title: 'Login',
    };





  constructor(props){
   super(props);
   this.state = {
    email: 'g',
    password :'',
    isLoading: false,
    signedin: false
   };
   }



     componentDidMount() {
         this._loadInitialState().done();
       }



    _initLogin() {
      this.setState({ isLoading: true ,message: ''});
      var form = new FormData();
      form.append('email', this.state.email);
      form.append('password', this.state.password);
       fetch('https://mcube.vmctechnologies.com/mobappv1/checkAuth', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
         },
         body:form
       })
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error =>
         this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
       })
     ).done();

     }

  _handleResponse(response) {

  this.setState({ isLoading: false , message: response.code });
    console.log(response);
    if(response.code =='200'){
  //     this.props.navigator.replace({
  //     title: 'Home',
  //     component: HomePage,
  //     passProps: {response: response},
  //     rightButtonTitle: 'Logout',
  //     onRightButtonPress: () => { this.refs.nav.navigator.pop(); }
  //   });

    //const { navigate } = this.props.navigation;
    this._navigateTo('Home')
    //navigate('Home',{ response: response })
  }
  else{
     Alert.alert(
               "POST Response",
               "Response Body -> "  + response.authKey,
           )
       }

}


      _navigateTo = (routeName: string) => {
       const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })]
        })
        this.props.navigation.dispatch(actionToDispatch)
       }





    _onLoginClicked() {

        if (this.state.email != '' || this.state.password != ''){
          this._initLogin()
        } else{
          Alert.alert('Fields cannot be empty' )

        }
    }

    async _loadInitialState() {
        try {
          var email = await AsyncStorage.getItem('email');
          if (email !== null){
            this.setState({email: email});
          }
          var password = await AsyncStorage.getItem('password');
          if (password !== null){
            this.setState({password: password});
          }

        } catch (error) {

        }
      }

    onChangeEmail(email) {
      AsyncStorage.setItem('email', email);
      this.setState({ email:email});
    }

    onChangePassword(password) {
      AsyncStorage.setItem('password', password);
      this.setState({ password: password});
    }

    render(){
       var spinner = this.state.isLoading ?( <ActivityIndicator size='large' text = 'Please wait'/> ) : ( <View/>);
       return (
       <View style={styles.container}>
           <View style={styles.innerView}>
           <Image style = {styles.logo} source = {require('../img/logo.png')} />
           </View>
           <TextInput
           style={styles.input}
           underlineColorAndroid = "transparent"
           placeholderTextColor = "#9a73ef"
           placeholder="Enter Username!"
           autoCapitalize = "none"
           textAlign = "center"
           value = {this.state.email}
           onChangeText={(text) => this.onChangeEmail(text)}

         />
          <TextInput style={styles.input}
           underlineColorAndroid="transparent"
           placeholderTextColor ="#9a73ef"
           placeholder="Enter Password!"
           textAlign = "center"
           password={true}
           value = {this.state.password}
           onChangeText={(text) => this.onChangePassword(text)}
         />
          <TouchableHighlight  style = {styles.button}  onPress={this._onLoginClicked.bind(this)} >
            <Text style = {styles.submitButtonText}>    Login
             </Text>
          </TouchableHighlight>
        {spinner}
          <Text style={styles.description}>{this.state.message}</Text>
      </View>
      );
      }
     }

module.exports = LoginView;
