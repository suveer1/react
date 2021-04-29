import React, { Component } from 'react';
import {View,Text, KeyboardAvoidingView,TextInput,StyleSheet,ScrollView,TouchableOpacity,Alert} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'


export default class SettingScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      docId:''
    }
  }

 getData=()=>{
  var user = firebase.auth().currentUser;
  var email= user.email

 db.collection('users').where('username','==',email).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
       var data = doc.data()
       this.setState({
         emailId: data.username,
         firstName:data.first_name,
         lastName:data.last_name,
         address:data.address,
         contact:data.mobile_number,
         docId:doc.id
       })
    });
  })

}

 updateData(){

  db.collection('users').doc(this.state.docId)
    .update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address:this.state.address,
      mobile_number:this.state.contact,
    })
    Alert.alert('updated');
}

componentDidMount(){
  this.getData()
}



    render(){
        return(

              <View style={{flex:1, alignItems: 'center',justifyContent: 'center'}} >
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <View style={{flex:1,width:'100%',alignItems: 'center'}}>
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"First Name"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      firstName: text
                    })
                  }}
                  value ={this.state.firstName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Last Name"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      lastName: text
                    })
                  }}
                    value ={this.state.lastName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Contact"}
                  maxLength ={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                    this.setState({
                      contact: text
                    })
                  }}
                    value ={this.state.contact}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Address"}
                  multiline = {true}
                  onChangeText={(text)=>{
                    this.setState({
                      address: text
                    })
                  }}
                    value ={this.state.address}
                />

                <TouchableOpacity style={styles.button}
                  onPress={()=>{this.updateData()}}>
                  <Text> Save </Text>
                </TouchableOpacity>
                </View>

              </View>





        )
    }
}


const styles = StyleSheet.create({
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        // alignSelf: 'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
      },

}
)