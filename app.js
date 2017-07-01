import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  StatusBar,
  View
} from 'react-native';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';
import Container from './Container';

import { TabRouter } from 'react-navigation';

import TrackView from './Contents/track';
import MCubeXView from './Contents/mcubex';
import IVRSView from './Contents/ivrs';
import LeadView from './Contents/lead';
import MTrackerView from './Contents/mtracker';

const uiTheme = {
  palette: {
    primaryColor: COLOR.orange700,
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
  Track: { screen: TrackView },
  MCubeX: { screen: MCubeXView },
  IVRS: { screen: IVRSView },
  Lead: {screen: LeadView},
  MTracker: {screen: MTrackerView}
  }, {
    initialRouteName: 'Track',
  }
);

class TabContentNavigator extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: props.value.active,
      response: props.response,
    };
  }

  //this method will not get called first time
  componentWillReceiveProps(newProps){
    this.setState({
      active: newProps.value.active,
      response: newProps.response,
    });
  }

  render() {
    const Component = TabRoute.getComponentForRouteName(this.state.active);
    //console.log(this.state.response.empName);
    return <Component response={this.state.response} />;
  }
}

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: 'Track',

    };

  }

  static navigationOptions = {
    title: 'Menu',
  };




logoutDialog(){
  Alert.alert(
    'Logout',
    'Do you want to logout',
    [
      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: () => this.props.navigation.navigate('login')},
    ]
  )


}

  navigate() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

  render() {
    const { response } = this.props.navigation.state.params;

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />

          <Toolbar
            leftElement="menu"
            centerElement={this.state.active}
            onLeftElementPress={() => this.navigate()}
            rightElement={["power-settings-new"]}
            onRightElementPress = {() => this.logoutDialog()}
          />

          <TabContentNavigator value={this.state} response ={response} key={this.state} />

          <BottomNavigation active={this.state.active}
            hidden={false}
            style={{ container: { position: 'absolute', bottom: 0, left: 0, right: 0 } }}
          >
            <BottomNavigation.Action
              key="Track"
              icon="today"
              label="Track"
              style={{ container: { minWidth: null } }}
              onPress={() => this.setState({ active: 'Track' })}
            />
            <BottomNavigation.Action
              key="MCubeX"
              icon="person"
              label="MCubeX"
              style={{ container: { minWidth: null } }}
              onPress={() => {
                this.setState({ active: 'MCubeX' });
              }}
            />
            <BottomNavigation.Action
              key="IVRS"
              icon="map"
              label="IVRS"
              style={{ container: { minWidth: null } }}
              onPress={() => this.setState({ active: 'IVRS' })}
            />
            <BottomNavigation.Action
              key="Lead"
              icon="chat"
              label="Lead"
              style={{ container: { minWidth: null } }}
              onPress={() => this.setState({ active: 'Lead' })}
            />
            <BottomNavigation.Action
              key="MTracker"
              icon="chat"
              label="MTrac"
              style={{ container: { minWidth: null } }}
              onPress={() => this.setState({ active: 'MTracker' })}
            />
          </BottomNavigation>

        </Container>
      </ThemeProvider>
    );
  }
}
