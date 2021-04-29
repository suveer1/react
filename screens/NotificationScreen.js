import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,KeyboardAvoidingView,TouchableOpacity,Alert, ToastAndroid ,FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader'
import {Card,Header,Icon,ListItem} from 'react-native-elements';

export default class Notifications extends Component{
    constructor(){
        super();
        this.state={all_notifications:''}
    }
    getNotifications=()=>{
        var user = firebase.auth().currentUser.email
        db.collection('notifications')
        .where('recieverId','==',user)
        .where('status','==','unread')
        .onSnapshot((snapshot)=>{
            var allNotifications =  []
            snapshot.docs.map((doc) =>{
              var notification = doc.data()
              notification["doc_id"] = doc.id
              allNotifications.push(notification)
            });
            this.setState({
                all_notifications:allNotifications
            });
          })
          console.log(this.state.all_notifications)
    }
    componentDidMount(){
        this.getNotifications();
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item})=>(
        <ListItem bottomDivider>
            <ListItem.Content >
                <ListItem.Title style={{fontSize:20,fontWeight:'bold'}}>
                    {item.message}
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
    render(){
        console.log('hello'+this.state.all_notifications)
        return(
            <View>
                <MyHeader title="Notifications" navigation={this.props.navigation}/>
                {
                    this.state.all_notifications.length === 0
                    ?
                    (
                        <Text style={{marginTop:'50%',alignSelf:'center'}}>you have no notifications</Text>
                    )
                    :(
                        <FlatList 
                        keyExtractor={this.keyExtractor}
                        data={this.state.all_notifications}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator

                        />
                    )
                }
            </View>
        )
    }
}