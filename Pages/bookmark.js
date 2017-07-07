import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Container from '../Container';
import uiThemee from '../app/theme';

const uiTheme= {
 palette: {
   primaryColor: COLOR.orange700,
   accentColor: COLOR.pink500,
 },
 toolbar: {
   container: {
     height: 70,
     paddingTop: 20
   }
 }
}
export default class BookmarkView extends Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
          <Toolbar
            leftElement="close"
            onLeftElementPress={() => this.props.navigation.navigate('Home')}
            centerElement="Bookmarks"
          />
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to Bookmarks View
            </Text>
          </View>
        </Container>
      </ThemeProvider>
    );
  }
}

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
