import { View, Pressable, Button, Platform, Text, StatusBar, FlatList, StyleSheet, ScrollView } from "react-native";
import AuthUser from "../external/authUser";
import MainScreen from "./mainScreen";
import { NavigationContainer, Route } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue, child, get, onChildAdded, push } from "firebase/database";
import ChatScreen from "./chatScreen";
import CreateChatScreen from "./createChatScreen";
// Import Admin SDK
export default function GroupListScreen({ navigation }) {
    
  function getUser(){  
    const auth = getAuth();
    const userdata = auth.currentUser;
   return userdata
  }


 useEffect(() => {
    let userdata = getUser()
    setuserData(userdata)
    GetAllDataOnce();

    const db = getDatabase();
    const updatedRef = ref(db, 'groupChats/');
    onChildAdded(updatedRef, (data) => {
        console.log("UPDATED VALUE FOUND")
        GetAllDataOnce();
    });


  }, []);

  

  const [userData, setuserData] = useState();
  const [users, setUsers] = React.useState([]);  
  const [newArray, setnewArray] = useState([]);
  const [groupChats, setgroupChats] = React.useState([]); 

  /*function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl
    });
  }*/

  function addAllItems(data) {
    setgroupChats(data);
  }
  const db = getDatabase();

  function GetAllDataOnce() {
    const dbRef = ref(db);
    get(child(dbRef, '/groupChats'))
      .then((snapshot) => {
        var chats = [];
        snapshot.forEach(childSnapshot => {
          chats.push(childSnapshot.val());
        });
        addAllItems(chats);
      })
  }

  function writeGroupChatData(id, user){
    firebase.database().ref('groupChats/' + id).set({
      users: user
    });
  }



  return (
    <><Pressable style={styles.startChatButton} onPress={() => { navigation.navigate('Create Chat Screen')}}>
        <Text style={styles.startChatText}>
          Start new group chat
        </Text>
    </Pressable>
    <ScrollView>
      {groupChats.map((groupChats) => (
        //<View key={users.username} HELLO> HELLO
        <Text style={styles.item} key={groupChats.name} onPress={() => 
          //get(ref(db, 'groupChats/' + groupChats.key)).then((snapshot) => {
          //  snapshot.forEach((child) => {
          /*    if(snapshot.val().user1 === getAuth().currentUser.email)*/
                navigation.navigate('Group Chat Screen', { targetName: groupChats.name, targetChat: groupChats.uid})
          //      if(snapshot.val().user1 === getAuth().currentUser.email)
          //        navigation.navigate('Group Chat Screen', { targetName: groupChats.name, targetChat: groupChats.uid})
          //      else if(snapshot.val().user2 === getAuth().currentUser.email)
          //        navigation.navigate('Group Chat Screen', { targetName: groupChats.name, targetChat: groupChats.uid})
          //      else if(snapshot.val().user3 === getAuth().currentUser.email)
          //        navigation.navigate('Group Chat Screen', { targetName: groupChats.name, targetChat: groupChats.uid})
          //      else if(snapshot.val().user4 === getAuth().currentUser.email)
          //        navigation.navigate('Group Chat Screen', { targetName: groupChats.name, targetChat: groupChats.uid})
          //      else if(snapshot.val().user5 === getAuth().currentUser.email)
          //        navigation.navigate('Group Chat Screen', { targetName: groupChats.name, targetChat: groupChats.uid})
          //      else if(snapshot.val().user6 === getAuth().currentUser.email)
          //        navigation.navigate('Group Chat Screen', { targetName: groupChats.name, targetChat: groupChats.uid})
          //      else
          //        console.log('email: ' + getAuth().currentUser.email)
          //  })
          //})
        }>
          {groupChats.name}
        </Text>
        // </View>
      ))}
    </ScrollView></>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 10
}, 
  item:{
    marginTop:24,
    padding:60,
    backgroundColor: 'grey',
    fontSize: 24
  },
  startChatButton: {
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    width: Platform.OS === 'web' ? "20%" : "40%",
    height: Platform.OS === 'web' ? 60 : 35,
    flexDirection: "row",
    backgroundColor: "brown",
    margin: 5,
    marginTop: 10
},
startChatText: {
    fontSize: Platform.OS === 'web' ? 30 : 15,
    alignSelf: "center",
    display: "flex",
    //width: "33%",
    flexDirection: "row"
},
});

