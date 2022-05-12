import { View, Button, Platform, Text } from "react-native";
import AuthUser from "../external/authUser";
import MainScreen from "./mainScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

import { firebaseConfig } from "../config/firebaseConfig";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";

import React, { useState } from "react";

import { getDatabase, ref, set, onValue, child, get } from "firebase/database";

// Import Admin SDK
export default function ContactListScreen({ navigation }) {

  const [users, setUsers] = React.useState([]);

  const [newArray, setnewArray] = useState();

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

  GetAllDataOnce();

  return (
    <View style={{ selfAlign: "center", margin: "30%" }}>
      <Text>CONTACT LIST SCREN</Text>
      <Button title="Main" onPress={() => navigation.navigate('MainScreen')} />
      <Button title="save to Database" onPress={() => writeUserData(0, "0bdullah", "michael@gmail.com", "URL.RANDOM")} />
      <Button title="getData" onPress={() => GetAllDataOnce()}></Button>
      {users.map((users) => (
        <Text  key={users.username}>{users.username}</Text>
      ))}

    </View>
  )
}