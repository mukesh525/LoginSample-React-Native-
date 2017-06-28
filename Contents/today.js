import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';

export default class TodayView extends Component {
  constructor(props, context) {
    super(props, context);

    //console.log(this.props.response);
  }


  componentWillReceiveProps(newProps){
  if (newProps.response) {
      this.props.setParams({ response });
    }
  }


  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Today View {this.props.response.empName}
          </Text>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#455A64',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
