import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,Picker,
  StatusBar,TouchableHighlight,ActivityIndicator,
  View,ListView,TextInput
} from 'react-native';
import { Checkbox } from 'react-native-material-design';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Container from '../Container';

import uiThemee from '../app/theme';
const uiTheme = {
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
export default class DetailView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      isLoaded: false,
      message:'',
      refreshing:false,
      fields:[],
     dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 }),
    }
    console.log(this.props.navigation.state.params);
  //  _initReport()
  }


    componentDidMount () {
      this._initReport();

    }




  _initReport() {
    const {data} = this.props.navigation.state.params;
    this.setState({ isLoading: !this.state.refreshing ,message: ''});
    console.log("_initDetailReport called "+data.key+ "  authKey   " +data.response.authKey)
    var form = new FormData();
    form.append('authKey', data.response.authKey);
    console.log('authKey '+ data.response.authKey);
    form.append('callid', data.currentRecord.callid);
    console.log('callid '+ data.currentRecord.callid);
    form.append('groupname', data.currentRecord.groupname|| data.currentRecord.empName);
    console.log('groupname '+ data.currentRecord.groupname|| data.currentRecord.empName)
    form.append('type', data.key);
    console.log('type '+ data.key);
    fetch('https://mcube.vmctechnologies.com/mobappv1/getDetail', {
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
        refreshing: false,
        message: 'Something bad happened ' + error
     })
   ).done();

   }

   renderLoadingView() {
       const {data} = this.props.navigation.state.params;
      return (
          <ThemeProvider uiTheme={uiTheme}>
            <Container>
              <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
              <Toolbar
                leftElement="arrow-back"
                 onLeftElementPress={() => this.props.navigation.navigate('Home',{data:data})}
                 centerElement={data.active +" Detail"}
              />
        <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
               <View style = {{
                     backgroundColor: '#C0C0C0',
                     padding :2,
                     margin:5,
                     width: 100,
                     height: 100,
                     borderRadius: 10,
                     borderColor: '#FF4500',
                     flexDirection: 'column',
                     justifyContent:'center',
                     borderWidth: 2}}>
                           <View>
                               <ActivityIndicator size='large' text = 'Please wait'/>
                           </View>
                            <View style={{marginTop:8, alignItems: 'center'}}>
                              <Text>  Loging.. </Text>
                              <Text> Please wait.. </Text>
                           </View>
                     </View>

                </View>
                </Container>
              </ThemeProvider>

                );
       }



   renderRecord(field) {
     console.log(field)
      if(field.type == "hidden"){
             return <View/>;
       }
      else if(field.type == 'text'){
        return (
        <View style ={styles.outerView}>
                   <Text style ={{flex:.5}} >{field.label}</Text>
                    <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholderTextColor ="#9a73ef"
                    placeholder={field.label}
                    textAlign = "left"
                   />
              <View style={styles.separator} />
         </View> );

      }

     else if(field.type == 'checkbox'||field.type == 'radio'){
       let checkboxItem = Object.keys(field.options).map(function(key, index) {
             return  <View style ={{
             flex:1,
             flexDirection:'row',
             alignItems: 'center',
             }} >
                   <Checkbox  checked = {true} value= {key} />
                   <Text style ={{flex:.5}}> {field.options[key]} </Text></View>
        });
       return (
         <View style ={styles.outerView}>
                    <Text style ={{flex:.5}} >{field.label}</Text>
                      <View style={styles.innerView}>
                        {checkboxItem}
                      </View>
                   <View style={styles.separator} />
          </View>
           );


     }

      else if(field.type == 'dropdown'){
      console.log(field.options)
      let pickerItem = Object.keys(field.options).map(function(key, index) {
           return <Picker.Item key={key} value= {key} label={field.options[key]} />
       });
      return (
          <View style ={{
            marginTop:10,
            marginLeft:10,
            marginRight:10,
            backgroundColor: 'powderblue',
            padding :10,
            flex:10,
            alignItems:'center',
            flexDirection:'row',
            justifyContent:'flex-start',
            height: pickerItem.length > 3 ? 230:120 }}>
          <Text style ={{flex:2,textAlign:'center'}} >{field.label}</Text>
          <Picker
            style = {{flex:8}}
            selectedValue={field.value}
            onValueChange={(language) => this.setState({language})}
            mode="modal">
             {pickerItem}
          </Picker>
       </View>
      );
  }

      return (
                <View style ={styles.outerView}>
                           <Text style ={{flex:.5}} >{field.label}</Text>
                           <Text style ={{flex:.5}}> {field.value} </Text>
                      <View style={styles.separator} />
                 </View>


          );
      }

   _handleResponse(response) {
     console.log(response)
     if(response.code =='202'){
     console.log("_handleResponse called ")
     console.log(response)
     productArray = response.records;
     console.log(this.state.key);
     this.setState({ isLoading: false , message: response.code ,
          fields :response.fields,
          isLoaded: true,
          refreshing: false,
          dataSource: this.state.dataSource.cloneWithRows(response.fields || [])
        });
    }
    else{
      console.log("else called response")
      console.log(response)
      this.setState({ isLoading: false , message: response.msg ,
           records :[],
           isLoaded: true,
           refreshing: false,
           dataSource: this.state.dataSource.cloneWithRows(response.records || [])

         });
    }
    ///this.state.dataSource.cloneWithRows(response.fields.filter(item => item.type === 'hidden');

    }

  render() {
    {
      console.log("else called response    " +this.state.message);
      const {data} = this.props.navigation.state.params;
        if (this.state.isLoading) {
          return this.renderLoadingView();
      }
      return (
        <ThemeProvider uiTheme={uiTheme}>
            <Container>
              <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
              <Toolbar
                leftElement="arrow-back"
                 onLeftElementPress={() => this.props.navigation.navigate('Home',{data:data})}
                centerElement={data.active +" Detail"}
              />
                        <View style={styles.container}>
                        <ListView
                            contentContainerStyle={styles.contentContainer}
                            contentInset={{bottom:30}}
                            automaticallyAdjustContentInsets={false}
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRecord.bind(this)}
                            style={styles.listView}
                            enableEmptySections = {true}
                            />
                        </View>
            </Container>
     </ThemeProvider>

        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  outerView :{
            marginTop:10,
            marginLeft:10,
            marginRight:10,
            backgroundColor: 'powderblue',
            padding :10,
            flex:1,
            flexDirection:'row',
            alignItems: 'center',
            justifyContent:'space-between',
            borderWidth: 1
       },
       dropdownView :{
                   marginTop:10,
                   marginLeft:10,
                   marginRight:10,
                   backgroundColor: 'powderblue',
                   padding :10,
                   flex:10,
                   alignItems:'center',
                   flexDirection:'row',
                   justifyContent:'flex-start',
                   height:230
              },
   innerView :{
         marginTop:5,
         flex:.5,
         alignItems:'center',
         flexDirection:'column',
         justifyContent:'center'

       },
       input :{
                height:40,
                flex:.5,
                fontSize:13,
                padding:20
          },
   instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
