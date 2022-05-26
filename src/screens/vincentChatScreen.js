import {
    View,
    Button,
    Platform,
    Text,
    StatusBar,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function VincentChatScreen({ navigation, route }) {

    function addMessageToDatabase(to, from, message) {
        push(ref(getDatabase(), '/messages'), {
            time: moment()
                .utcOffset('+02:00')
                .format('YYYY-MM-DD HH:mm:ss'),
            to: to,
            from: from,
            message: message
        });
    }

    const [userFrom, setUserFrom] = React.useState(getUser());
    const [userTo, setUserTo] = React.useState(route.params.targetEmail)
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [messageSentStatus, setMessageSentStatus] = React.useState(false);


    console.log(userFrom.email)
    console.log(userTo)

    React.useEffect(() => {
        if (messageSentStatus) {
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
                    students = [childSnapshot.val(), ...students];
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
                return { color: "blue", ...item }
            }

            if (item.from == route.params.targetEmail && item.to == currentUser.email) {
                return { color: "green", ...item }
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
            <View style={styles.chatContainer}>
                <Text style={styles.textstyle}>{route.params.targetUsername} </Text>
                <FlatList
                    inverted
                    data={filteredMessages}
                    keyExtractor={(item, index) => item + index}
                    renderItem={( { item } ) => {
                        if(item.color === "green"){
                            return <Text style={styles.green} key={item.time + item.color} >{item.message}</Text>
                        }
                        if(item.color === "blue"){
                            return <Text style={styles.blue} key={item.time + item.color} >{item.message}</Text>
                        }
                    }}/>
            </View>
            {<View style={styles.messageContainer}>
                <TextInput
                    value={currentMessage}
                    style={styles.messageInputContainer}
                    onChangeText={(message) => setCurrentMessage(message)}
                    placeholder="Enter a message..." />
                <TouchableOpacity
                    onPress={() => { sendMessage() }}
                    style={styles.sendButton}
                >
                    <MaterialCommunityIcons name="send" size={30} color="white" />
                </TouchableOpacity>
            </View>
            }
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
    chatContainer: {
        flex: 1
    },
    messageContainer: {
        flexDirection: "row",
        marginLeft: "5%",
        marginBottom: "3%",
        marginTop: 10
    },
    sendButton: {
        marginLeft: Platform.OS === 'web' ? "1%" : "2%",
        padding: 8,
        backgroundColor: "black",
        borderRadius: 30
    },
    messageInputContainer: {
        backgroundColor: Platform.OS === 'web' ? `#add8e6` : `#fffaf0`,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        width: Platform.OS === 'web' ? "50%" : "77%"
    },
    "item": {
        marginTop: 24,
        padding: 60,
        backgroundColor: 'grey',
        fontSize: 24
    },

    "blue": {
        backgroundColor: "#0078fe",
        padding: 10,
        marginLeft: '45%',
        marginTop: 5,
        marginRight: Platform.OS === 'web' ? "44%" : "10%",
        maxWidth: '50%',
        alignSelf: 'flex-end',
        borderRadius: 20,
    },

    "green": {
        backgroundColor: "#dedede",
        padding: 10,
        marginTop: 5,
        marginLeft: "5%",
        maxWidth: '50%',
        alignSelf: 'flex-start',
        borderRadius: 20
    },

    textstyle: {
        textAlign: Platform.OS === "web" ? "left" : "center",
        marginLeft: Platform.OS === "web" ? "25%" : "0%",
        fontSize: 20,
        marginVertical: 10
    },

    textInput: {
        minHeight: '15%',
        fontSize: 20,
        fontWeight: "bold"
    },

    sendMessageButton: {
        minHeight: '15%',
    }

});
