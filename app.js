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


import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';
import Container from './Container';

import { TabRouter } from 'react-navigation';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

import TrackView from './Contents/track';
import MCubeXView from './Contents/mcubex';
import IVRSView from './Contents/ivrs';
import LeadView from './Contents/lead';
import MTrackerView from './Contents/mtracker';
import uiTheme from './app/theme';

 const uiThemee = {
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
  MCubeX: { screen: TrackView },
  IVRS: { screen: TrackView },
  Lead: {screen: TrackView},
  MTracker: {screen: TrackView}
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
      key:props.value.key,
    };
  }







  //this method will not get called first time
  componentWillReceiveProps(newProps){
    this.setState({
      active: newProps.value.active,
      key: newProps.value.key,
      response: newProps.response,
    });
  }

  render() {
    const Component = TabRoute.getComponentForRouteName(this.state.active);
    console.log(this.state.active + "  "+ this.state.key);
  
    return <Component response={this.state.response} data={this.state.key} />;
  }
}

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: 'Track',
      key:'track',

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
    const { response} = this.props.navigation.state.params;
    this.props.navigation.navigate('DrawerOpen', {response : response}); // open drawer
  }

  render() {
    const { response } = this.props.navigation.state.params;
    const { active } = this.state;
    return (
      <ThemeProvider uiTheme={uiThemee}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />

          <Toolbar
            leftElement="menu"
            centerElement={this.state.active}
            onLeftElementPress={() => this.navigate()}
            rightElement={["power-settings-new"]}
            onRightElementPress = {() => this.logoutDialog()}
          />

          <TabContentNavigator value = {this.state} response ={response} key = {this.state} />

          <BottomNavigation active={this.state.active}
            hidden={false}
            style={{ container: { position: 'absolute', bottom: 0, left: 0, right: 0 } }}
          >
            <BottomNavigation.Action
              key="Track"
              icon="gps-fixed"
              label="Track"
              style={{ container: { minWidth: null , flexShrink:2} }}
              onPress={() => this.setState({ active: 'Track', key:'track', })}
            />
            <BottomNavigation.Action
              key="MCubeX"
              icon="clear"
              label="MCubeX"
              style={{ container: { minWidth: null } }}
              onPress={() => {
                this.setState({ active: 'MCubeX', key:'pbx', });
              }}
            />
            <BottomNavigation.Action
              key="IVRS"
              icon="games"
              label="IVRS"
              style={{ container: { minWidth: null } }}
              onPress={() => this.setState({ active: 'IVRS', key:'ivrs', })}
            />
            <BottomNavigation.Action
              key="Lead"
              icon="chat"
              label="Lead"
              style={{ container: { minWidth: null } }}
              onPress={() => this.setState({ active: 'Lead', key:'lead', })}
            />
            <BottomNavigation.Action
              key="MTracker"
              icon="phone"
              label="MTracker"
              style={{ container: { minWidth: null } }}
              onPress={() => this.setState({ active: 'MTracker', key:'mtracker', })}
            />
          </BottomNavigation>

        </Container>
      </ThemeProvider>
    );
  }
}
