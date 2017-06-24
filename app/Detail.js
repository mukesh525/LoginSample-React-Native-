'use strict';

import React, { Component } from 'react'
import {StyleSheet, Text,View,ActivityIndicator,Image, NavigatorIOS,TouchableHighlight} from 'react-native';


class Detail extends Component {
  static navigationOptions = {
      title: 'Detail Page',
    };
    constructor (props) {
        super(props);
        this.state = {
            signedin: false
        };

    }

      render () {
          return (
              <View style={styles.container}>
                  <Text style={{marginTop:200}}>
                      Welcome  Detail
                  </Text>
                      <Text style={{fontSize:20}}>Sign In</Text>
                    
              </View>
          );
      }
 }
 var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
 });
module.exports = Detail;
