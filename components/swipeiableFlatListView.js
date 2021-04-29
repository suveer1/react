import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    FlatList,
    
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';


import { SwipeListView } from 'react-native-swipe-list-view';

import db from '../config';


export default class SwipeableFlatlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      allNotifications : this.props.allNotifications
    };
  }


  updateMarkAsread =(notification)=>{
    db.collection("notifications").doc(notification.doc_id).update({
status : "read"
    })
  }


  onSwipeValueChange = swipeData => {
    var allNotifications = this.state.allNotifications
      const {key,value} = swipeData;

      if(value < -Dimensions.get('window').width){
        const newData = [...allNotifications];
        const prevIndex = allNotifications.findIndex(item => item.key === key);
        this.updateMarkAsread(allNotifications[prevIndex]);
        newData.splice(prevIndex, 1);
        this.setState({allNotifications : newData})
    };
};



  renderItem = data => (
          
          <ListItem bottomDivider >

            <ListItem.Content>
            <ListItem.Title style={{fontSize:20,color:'black',fontWeight:'bold'}}>{item.message}</ListItem.Title>
            </ListItem.Content>
           </ListItem>
 
  );
    
  renderHiddenItem = () => (
      <View style={styles.rowBack}>
          <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
              <Text style={styles.backTextWhite}></Text>
          </View>
      </View>
  );

  render(){
    console.log(this.state.allNotifications)
    return(
      <View style={styles.container}>
          <FlatList 
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          />
      </View>
    )
  }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight:'bold',
        fontSize:15
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29b6f6',
        right: 0,
    },
});