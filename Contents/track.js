import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,ListView,
  StatusBar,ScrollView,TouchableHighlight,
  View,ActivityIndicator
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

var productArray = [];
export default class TrackView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      response: props.response,
      isLoading: false,
      message:'',
      records:[],
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 }),
    }
  }

  componentDidMount() {
      this._initReport();
    }


  _initReport() {
    this.setState({ isLoading: true ,message: ''});
    var form = new FormData();
    form.append('authKey', this.state.response.authKey);
    form.append('limit', '10');
    form.append('ofset', '0');
    form.append('type', 'track');
    form.append('gid', '0');

    fetch('https://mcube.vmctechnologies.com/mobappv1/getList', {
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
     productArray = response.records;
     console.log(productArray)
     this.setState({ isLoading: false , message: response.code ,
          records :response.records,
          dataSource: this.state.dataSource.cloneWithRows(response.records)
        });
    console.log("after handling "+this.state.records);
 }

 renderRecord(record) {
        return (
             <TouchableHighlight>
                 <View>
                     <View style={styles.container}>
                         <View style={styles.rightContainer}>
                             <Text style={styles.title}>{record.groupname}</Text>
                             <Text style={styles.author}>{record.status}</Text>
                         </View>
                     </View>
                     <View style={styles.separator} />
                 </View>
             </TouchableHighlight>
        );
    }

 onLearnMore = (user) => {
   this.props.navigation.navigate('Details', { ...user });
 };








  render() {
    const { businessName,empEmail,empName,empContact} = this.props.response;
    var records = this.state.records;
    // if (this.state.isLoading) {
    //       return this.renderLoadingView();
    //   }
   return (
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRecord.bind(this)}
          style={styles.listView}
          onPress={() => this.onLearnMore(record)}
          />
      );
  }

  renderLoadingView() {
      return (
          <View style={styles.loading}>
              <ActivityIndicator size='large'/> )
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
