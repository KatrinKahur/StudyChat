import { View, Button, Platform, Text, StatusBar, FlatList, StyleSheet, ScrollView, TextInput } from "react-native";
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


    console.log(userFrom.email)
    console.log(userTo)

    React.useEffect(() => {
        if(messageSentStatus){
            addMessageToDatabase(userTo, userFrom.email, currentMessage)
            setMessageSentStatus(false);
            setCurrentMessage("");
        }
    }, [messageSentStatus])

    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(getUser());
    const [filteredMessages, setFilteredMessages] = useState([]);

    const db = getDatabase();

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
            GetAllDataOnce();
        });

    }, []);


    useEffect(() => {

        getMessages();
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


    console.log(filteredMessages)

    //console.log(Array.isArray(messages))


    function sendMessage() {
        if (currentMessage !== "") {
            setMessageSentStatus(true)
        }
    }



    return (
        <>
        <View>
            <Button title="HELLO"></Button>
            <Text>targetEmail: {route.params.targetEmail} </Text>
            <Button title="getRelevantMessages" onPress={() => getMessages()} />


            <ScrollView>

                {filteredMessages.map(items => {

                    if (items.color == "green") {
                        return <Text style={styles.green} key={items.time + items.color} >{items.message}</Text>
                    }

                    if (items.color == "blue") {
                        return <Text style={styles.blue} key={items.time + items.color} >{items.message}</Text>
                    }

                })}
            </ScrollView>
        </View>

            <View>
            <TextInput
                value={currentMessage}
                onChangeText={(message) => setCurrentMessage(message)}
                placeholder="Enter a message..."/>

            <Button title="Send message" onPress={() => {sendMessage()}}/>
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
        /*marginTop:20,
        padding:20,
        backgroundColor: 'green',
        fontSize: 14*/

        backgroundColor: "#0078fe",
        padding: 10,
        marginLeft: '45%',
        borderRadius: 5,
        //marginBottom: 15,
        marginTop: 5,
        marginRight: "5%",
        maxWidth: '50%',
        alignSelf: 'flex-end',
        //maxWidth: 500,

        borderRadius: 20,



    },

    "green": {
        /*marginTop:20,
        padding:20,
        backgroundColor: 'blue',
        fontSize: 14*/
        backgroundColor: "#dedede",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginLeft: "5%",
        maxWidth: '50%',
        alignSelf: 'flex-start',
        //maxWidth: 500,
        //padding: 14,

        //alignItems:"center",
        borderRadius: 20,
    }
});
