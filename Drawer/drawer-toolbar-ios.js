import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBar,
    View
} from 'react-native';
import { COLOR, ThemeProvider, Toolbar, Drawer, Avatar } from 'react-native-material-ui';
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
export default class DrawerMenu extends Component {
  constructor(props, context) {
    super(props, context);
    const { businessName,empEmail,empName,empContact}
             = props.navigation.state.params.response;
    this.state = {
        active: 'people',
        empName:  empName,
        empEmail: empEmail
      };
    }

  _setInfoActive() {
    this.setState({ active: 'info' });
  }

  render() {
  return (
        <ThemeProvider uiTheme={uiTheme}>
                <Container>
                    <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                    <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.navigate('DrawerClose')}
                    centerElement="Menu"
                />
                    <View style={styles.container}>
                        <Drawer>
                            <Drawer.Header>
                                <Drawer.Header.Account
                                style={{
                                    container: { backgroundColor: '#fafafa' },
                                }}
                                avatar={<Avatar text={this.state.empName.charAt(0)} />}
                                // accounts={[
                                //     { avatar: <Avatar text="H" /> },
                                //     { avatar: <Avatar text="L" /> },
                                // ]}
                                footer={{
                                    dense: true,
                                    centerElement: {
                                      primaryText: this.state.empName,
                                      secondaryText: this.state.empEmail,
                                    },
                                  //  rightElement: 'arrow-drop-down',
                                }}
                            />
                            </Drawer.Header>
                            <Drawer.Section
                            divider
                            items={[
                                {
                                    icon: 'bookmark-border', value: 'Bookmarks',
                                    active: this.state.active == 'bookmark',
                                    onPress: () => {
                                        this.setState({ active: 'bookmark' });
                                        this.props.navigation.navigate('Bookmark');
                                      },
                                  },
                                {
                                    icon: 'today', value: 'Calendar',
                                    active: this.state.active == 'calendar',
                                    onPress: () => {
                                        this.setState({ active: 'calendar' });
                                        this.props.navigation.navigate('Calendar');
                                      },
                                  },
                                {
                                    icon: 'people', value: 'Clients',
                                    active: this.state.active == 'client',
                                    onPress: () => {
                                        this.setState({ active: 'client' });
                                        this.props.navigation.navigate('Client');
                                      },
                                  },
                            ]}
                        />
                            <Drawer.Section
                            title="Personal"
                            items={[
                                {
                                    icon: 'info', value: 'Info',
                                    active: this.state.active == 'info',
                                    onPress: () => {
                                        this.setState({ active: 'info' });

                                        //this.props.navigation.navigate('DrawerClose');
                                        this.props.navigation.navigate('Info');
                                      },
                                  },
                                {
                                    icon: 'settings', value: 'Settings',
                                    active: this.state.active == 'settings',
                                    onPress: () => {
                                        this.setState({ active: 'settings' });
                                        this.props.navigation.navigate('Settings');
                                      },
                                  },
                            ]}
                        />
                        </Drawer>
                    </View>
                </Container>
            </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
