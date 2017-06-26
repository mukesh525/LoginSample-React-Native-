'use strict';

import React, { Component } from 'react'
import {StyleSheet, Text,View,ActivityIndicator,Image, NavigatorIOS,TouchableHighlight} from 'react-native';


class Track extends React.Component {
  static navigationOptions = {
      title: 'Track',
      tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/log.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
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
                      Welcome  Track
                  </Text>


              </View>
          );
      }
 }
 var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
 });
module.exports = Track;
