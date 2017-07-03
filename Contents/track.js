import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,ListView,
  StatusBar,ScrollView,TouchableHighlight,
  View,ActivityIndicator,Platform
} from 'react-native';
import Dimensions from 'react-dimensions';
import { List, ListItem } from 'react-native-elements';
//var RefreshableListView = require('../app/RefreshableListView')
export default class TrackView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      response: props.response,
      isLoading: false,
      isLoaded: false,
      message:'',
      key:props.data,
      records:[],
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 }),
    }

  }


 componentWillReceiveProps(newProps){
     this.setState({
        key: newProps.data,
        response: newProps.response,
      });

      if(newProps != this.state) {
         this._initReport(newProps.data);
        console.log('props differ');
      }else{
        console.log('props same');
      }
  }

  _initReport(key) {
    this.setState({ isLoading: true ,message: ''});

    console.log("_initReport called "+key+ "  authKey   " +this.state.response.authKey)

    var form = new FormData();
    form.append('authKey', this.state.response.authKey);
    form.append('limit', '10');
    form.append('ofset', '0');
    form.append('type', key);
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
        isLoaded: false,
        message: 'Something bad happened ' + error
     })
   ).done({
      //render();
     });

   }

   _handleResponse(response) {
     if(response.code =='202'){
     console.log("_handleResponse called "+this.state.key)
     console.log(response)
     productArray = response.records;
     console.log(this.state.key);
     this.setState({ isLoading: false , message: response.code ,
          records :response.records,
          isLoaded: true,
          dataSource: this.state.dataSource.cloneWithRows(response.records || [])
        });
    }
    else{
      console.log("else called response    " )
      this.setState({ isLoading: false , message: response.msg ,
           records :[],
           isLoaded: true,
           dataSource: this.state.dataSource.cloneWithRows(response.records || [])

         });
    }

 }

 renderRecord(record, rowID) {

     return (
             <TouchableHighlight underlayColor='#99d9f4' onPress={() => this.onLearnMore(record)}>
                 <View style ={styles.outerView}>
                     <View style={styles.innerView}>
                             <Text style={styles.title} >Group</Text>
                             <Text style={styles.title} >Status</Text>
                     </View>
                     <View style={styles.innerView}>
                             <Text style={styles.subtitle} >{record.groupname}</Text>
                             <Text style={styles.subtitle} >{record.status}</Text>
                     </View>

                     <View style={styles.innerView}>
                             <Text style={styles.title} >Call From</Text>
                             <Text style={styles.title} >Call Time</Text>
                     </View>
                     <View style={styles.innerView}>
                             <Text style={styles.subtitle} >{record.callfrom}</Text>
                             <Text style={styles.subtitle} >{record.calltime}</Text>
                     </View>
                    <View style={styles.separator} />
                 </View>
             </TouchableHighlight>
        );
    }

 onLearnMore = (record) => {
    console.log("detail tapped")
   //this.props.navigation.navigate('Details', { ...user });
 };


 onEndReached() {
     if (!this.state.waiting) {
         this.setState({waiting: true});
         console.log("Load More Called")
        // this.fetchData() // fetching new data, ended with this.setState({waiting: false});
        //this.setState({waiting: false});
     }
 }

 renderFooter() {
     if (this.state.waiting && this.state.dataSource.getRowCount() > 0) {
         return <ActivityIndicator />;
     } else {
         return <View/>
     }
 }

componentWillMount(){
  this._initReport(this.state.key)

}



  render() {
    console.log("render called")
    const { businessName,empEmail,empName,empContact} = this.props.response;
    var records = this.state.records;
      if (this.state.isLoading) {
          return this.renderLoadingView();
       }
       else if(this.state.dataSource.getRowCount() < 1){
          return <View style ={styles.container} ><Text style ={styles.empty}> No Records Available </Text></View> ;
      }

   return (
      <ListView  contentContainerStyle={styles.contentContainer}
          contentInset={{bottom:30}}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRecord.bind(this)}
          style={styles.listView}
          enableEmptySections = {true}
          renderFooter={this.renderFooter.bind(this)}
          onEndReached={this.onEndReached.bind(this)}

          />
      );
  }

  renderLoadingView() {

   return (
        <ActivityIndicator style ={styles.container} size='large' text = 'Please wait'/>
      );
    }



};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    backgroundColor: '#455A64'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  innerView :{
    marginTop:5,
    flexDirection:'row',
    justifyContent:'space-between'

  },
  outerView :{
          margin:10,
          backgroundColor: 'powderblue',
          padding :10,
          flex:1,
          borderRadius: 8,
          borderColor: '#000',
          borderWidth: 1
     },
   title :{
       fontSize: 10,
       fontWeight: 'bold'

     },
   empty :{
         fontSize: 25,
         color:'red',
         fontWeight: 'normal'
   },
   subtitle :{
     fontSize: 10,
     color:'red',
     fontWeight:'normal'
  } ,
    contentContainer: {
     paddingBottom: (Platform.OS === 'ios') ? 10 : 30,
   }

});
