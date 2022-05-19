import { View, Button, Platform, Text, StatusBar, FlatList, StyleSheet, ScrollView } from "react-native";
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
import { getDatabase, ref, set, onValue, child, get, onChildAdded } from "firebase/database";
import ChatScreen from "./chatScreen";
// Import Admin SDK
export default function VincentContactListScreen({ navigation }) {

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



  return (
    <View style={{ selfAlign: "center", margin: "30%" }}>
     { <Button title="save to Database" onPress={() => writeUserData(0, "POPbdullah", "michael@gmail.com", "URL.RANDOM")} />}
      <Button title="getData" onPress={() => GetAllDataOnce()}></Button>

      <Button title="chatScreen" onPress={()=>navigation.push('chatScreen', { targetEmail: a})}/>

      <Button title="getUser" onPress={()=>getUser()}/>
      
 

      <ScrollView>
      {users.map((users) => (

      //<View key={users.username} HELLO> HELLO
      <Text style={styles.item} key={users.email} onPress={() => navigation.push('VincentChatScreen', {targetEmail: users.email})}>{users.username}</Text>
       // </View>
    ))}

      </ScrollView>

      

    </View>
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
  }
});

