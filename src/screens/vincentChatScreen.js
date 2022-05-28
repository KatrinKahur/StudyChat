import { View, Button, Platform, Text, StatusBar, FlatList, StyleSheet, ScrollView, TextInput} from "react-native";
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
import contactListScreen from "./chatScreen";
import moment from "moment";

export default function VincentChatScreen({ navigation, route }) {

    const db = getDatabase();

    function addMessageToDatabase(to, from, message){
        push(ref(getDatabase(), '/messages'), {
            time: moment()
                .utcOffset('+02:00')
                .format('YYYY-MM-DD HH:mm:ss'),
            to: to,
            from: from,
            message: message
        });
    }

    const[userFrom, setUserFrom] = React.useState(getUser());
    const[userTo, setUserTo] = React.useState(route.params.targetEmail)
    const[currentMessage, setCurrentMessage] = React.useState("");
    const[messageSentStatus, setMessageSentStatus] = React.useState(false);
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(getUser());
    const [filteredMessages, setFilteredMessages] = useState([]);

    React.useEffect(() => {
        if(messageSentStatus){
            addMessageToDatabase(userTo, userFrom.email, currentMessage)
            setMessageSentStatus(false);
            setCurrentMessage("");
        }
    }, [messageSentStatus])

    function addAllItems(data) {
        setMessages(data);
    }
    function GetAllDataOnce() {
        const dbRef = ref(db);
        get(child(dbRef, 'messages/'))
            .then((snapshot) => {
                var students = [];
                snapshot.forEach(childSnapshot => {
                    students.push(childSnapshot.val());
                });
                addAllItems(students);
            })
    }

    useEffect(() => {
        GetAllDataOnce();
        const db = getDatabase();
        const updatedRef = ref(db, 'messages/');
        onChildAdded(updatedRef, (data) => {
            console.log("UPDATED VALUE FOUND")
            GetAllDataOnce(); //NR 1
        });

    }, []);


    useEffect(() => {

        getMessages(); //NR2
    }, [messages]);


    console.log(messages)

    function getUser() {
        const auth = getAuth();
        const userdata = auth.currentUser;
        return userdata
    }
    console.log(currentUser)
    function getMessages() {
        let array = [];
        array = messages.map(item => {
            if (item.from == currentUser.email && item.to == route.params.targetEmail) {
                return { color: "green", ...item }
            }

            if (item.from == route.params.targetEmail && item.to == currentUser.email) {
                return { color: "blue", ...item }
            }

        }).filter(notUndefined => notUndefined !== undefined);

        setFilteredMessages(array)
    }

    function sendMessage(){
        if (currentMessage !== "") {
            setMessageSentStatus(true)
        }
    }

    return (
        <>
        <View>
        <Text style={styles.textstyle}>{route.params.targetUsername} </Text>

            <ScrollView style={styles.scrollview}>

            {filteredMessages.map(items => {
                if (items.color == "green") {
                   return <Text style={styles.green} key={items.time + items.color}>{items.message}</Text>
                }
                if (items.color == "blue") {
                 return <Text style={styles.blue} key={items.time + items.color} >{items.message}</Text>
                    }
                })}
            </ScrollView>

            </View>

                <View>

                <TextInput style={styles.textInput}
                    value={currentMessage}
                    onChangeText={(message) => setCurrentMessage(message)}
                    placeholder="Enter a message..."/>
                <Button style={styles.sendMessageButton} title="Send message" onPress={() => {sendMessage()}}/>

                    </View>   
            </>
        )
    }

    const styles = StyleSheet.create({
        container: {

            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 20,
            paddingHorizontal: 10
        },
        "item": {

            marginTop: 24,
            padding: 60,
            backgroundColor: 'grey',
            fontSize: 24
        },

        "blue": {

            backgroundColor: "#0078fe",
            padding: Platform.OS === 'web' ? 10 : 5,
            marginLeft: '45%',
            borderRadius: 5,
            marginTop: 5,
            marginRight: "5%",
            maxWidth: '50%',
            alignSelf: 'flex-end',
            borderRadius: Platform.OS === 'web' ? 20 : 50,
            maxHeight: Platform.OS === 'web' ? 100 : 50,
        },

        "green": {
            backgroundColor: "#dedede",
            padding: 10,
            marginTop: 5,
            marginLeft: "5%",
            maxWidth: '50%',
            alignSelf: 'flex-start',
            borderRadius: Platform.OS === 'web' ? 20 : 90,
            maxHeight: Platform.OS === 'web' ? 100 : 50,
        },


        textstyle:{
            textAlign: "center",
            fontSize: 20,
        },


        textInput:{
            minHeight: '15%',
            fontSize: 20,
        },


        sendMessageButton:{
            minHeight: '15%',
        },


        scrollView: {
            maxHeight: '70%',
        }
    });
