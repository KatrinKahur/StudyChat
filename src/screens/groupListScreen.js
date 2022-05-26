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
    const updatedRef = ref(db, 'users/');
    onChildAdded(updatedRef, (data) => {
        console.log("UPDATED VALUE FOUND")
        GetAllDataOnce();
    });


  }, []);

  

  const [userData, setuserData] = useState();
  const [users, setUsers] = React.useState([]);  
  const [newArray, setnewArray] = useState([]);


  function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl
    });
  }

  function addAllItems(data) {
    setUsers(data);
  }
  const db = getDatabase();

  function GetAllDataOnce() {
    const dbRef = ref(db);
    get(child(dbRef, '/users'))
      .then((snapshot) => {
        var students = [];
        snapshot.forEach(childSnapshot => {
          students.push(childSnapshot.val());
        });
        addAllItems(students);
      })
  }

  function writeGroupChatData(id, user){
    firebase.database().ref('groupChats/' + id).set({
      users: user
    });
  }

  function createGroupChat(user){
    push(ref(getDatabase(), '/groupChats'), {
      name: 'placeholder',
      users: {user}
  });
  navigation.navigate('Group Chat Screen', { targetEmail: users.email, targetUsername: users.username })
  }

  return (
   
    <><Pressable style={styles.startChatButton} onPress={() => { createGroupChat(getAuth().currentUser.uid); } }>
          <Text style={styles.startChatText}>
              Start new group chat
          </Text>
      </Pressable><ScrollView>
              {users.map((users) => (

                  //<View key={users.username} HELLO> HELLO
                  <Text style={styles.item} key={users.email} onPress={() => navigation.navigate('Group Chat Screen', { targetEmail: users.email, targetUsername: users.username })}>{users.username}</Text>
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
}
});

