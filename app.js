import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';
import Container from './Container';

import { TabRouter } from 'react-navigation';

import TodayView from './Contents/today';
import ProfileView from './Contents/profile';
import MapView from './Contents/map';
import ChatView from './Contents/chat';

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
    accentColor: COLOR.pink500,
  },
  toolbar: {
    container: {
      height: 80,
      paddingTop: 20
    }
  }
}

const TabRoute = TabRouter({
  Today: { screen: TodayView },
  Profile: { screen: ProfileView },
  Map: { screen: MapView },
  Chat: {screen: ChatView}
  }, {
    initialRouteName: 'Today',
  }
);

class TabContentNavigator extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: props.value.active,
    };
//    console.log(this.props.response);

  }

  //this method will not get called first time
  componentWillReceiveProps(newProps){
    this.setState({
      active: newProps.value.active,
    });

   if (newProps.response) {
      this.props.setParams({ response });
    }
  }

  render() {
    const Component = TabRoute.getComponentForRouteName(this.state.active);
    return <Component response={this.props.response} />;
  }
}

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: 'Today',
      response :
    };
   //console.log(this.props.navigation.state.params.response.empName);
  //  if (props.response) {
  //      this.props.navigation.setParams({ response });
  //   }

  }

  static navigationOptions = {
    title: 'Menu',
  };

  // componentWillReceiveProps(nextProps) {
  //  if (nextProps.response) {
  //    this.props.navigation.setParams({ response });
  //  }
  // }


  navigate() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />

          <Toolbar
            leftElement="menu"
            centerElement={this.state.active}
            onLeftElementPress={() => this.navigate()}
            rightElement={["power-settings-new"]}
            onRightElementPress = {() => this.props.navigation.navigate('login')}
          />

          <TabContentNavigator value={this.state} response={this.props.navigation.state.params.response} key={this.state} />

          <BottomNavigation active={this.state.active}
            hidden={false}
            style={{ container: { position: 'absolute', bottom: 0, left: 0, right: 0 } }}
          >
            <BottomNavigation.Action
              key="Today"
              icon="today"
              label="Today"
              onPress={() => this.setState({ active: 'Today' })}
            />
            <BottomNavigation.Action
              key="Profile"
              icon="person"
              label="Profile"
              onPress={() => {
                this.setState({ active: 'Profile' });
              }}
            />
            <BottomNavigation.Action
              key="Map"
              icon="map"
              label="Map"
              onPress={() => this.setState({ active: 'Map' })}
            />
            <BottomNavigation.Action
              key="Chat"
              icon="chat"
              label="Chat"
              onPress={() => this.setState({ active: 'Chat' })}
            />
          </BottomNavigation>

        </Container>
      </ThemeProvider>
    );
  }
}
