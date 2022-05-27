//import { StatusBar } from 'expo-status-bar';
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from 'react';
import MainScreen from "./mainScreen";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, Platform} from 'react-native';
import { TextInput } from 'react-native';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getDatabase, ref, set, onValue, child, get, onChildAdded, push } from "firebase/database";

export default class extends Component {
  constructor() {
    super();
    this.state = { 
      chatName: '',
      isLoading: false
    }
  }

  updateName = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };


  retrieveData = () => {

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

 
  createGroupChat(user){
    push(ref(getDatabase(), '/groupChats'), {
      name: this.state['chatName'],
      users: {user}
  });
  this.props.navigation.navigate('Group Chat List');
 
  }
 
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }   
  return (
    <View style={styles.SignUp}>

        <Text style={styles.header}>Create a new group chat</Text>

        <TextInput style={styles.textinput} 
        placeholder="Chat name" 
        value={this.state.displayName}
        onChangeText={(val) => this.updateName(val, "chatName")}
        />


        <TouchableOpacity style={styles.button}
        onPress={() => this.createGroupChat(getAuth().currentUser.uid)}

        >
            <Text style={styles.btntext}>Create</Text>
        </TouchableOpacity>

      <ScrollView>
        {users.map((users) => (
      //<View key={users.username} HELLO> HELLO
          <Text style={styles.btntext} key={users.username} onPress={() => push(ref(getDatabase(), '/groupChats' + {route.params.targetName} + '/users') { user: {key}})} />
       //</View>
      ))}
</ScrollView>   
        
    </View>
  );
 }
}

const styles = StyleSheet.create({
  SignUp: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    paddingLeft: 60,
    paddingRight: 60,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  header: {
      fontSize: Platform.OS === 'web' ? 65 : 40,
      fontWeight: "bold",
      color: '#000000',
      paddingBottom: 10,
      marginBottom: 40,
      borderBottomColor: '#199187',
      borderBottomWidth: 1,
  },
  textinput: {
      alignSelf: 'stretch',
      height: 40,
      marginBottom: 30,
      color: '#000000',
      borderBottomColor: '#f8f8f8',
      borderBottomWidth: 1,
  },
  button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
     backgroundColor: '#1e90ff',
     marginTop: 30,
     borderRadius: 5,
  },
  btntext: {
      color: '#fff',
      fontWeight: 'bold',
  }
});

