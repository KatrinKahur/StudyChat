import {
    View,
    Button,
    Platform,
    Text,
    StatusBar,
    FlatList,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image
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
import {MaterialCommunityIcons} from "@expo/vector-icons";

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
export default function ChatScreen(){
    const[userFrom, setUserFrom] = React.useState("Pelle")
    const[userTo, setUserTo] = React.useState("Kalle")
    const[currentMessage, setCurrentMessage] = React.useState("");
    const[messageSentStatus, setMessageSentStatus] = React.useState(false);
    const [gifs, setGifs] = React.useState([]);
    const [term, updateTerm] = React.useState('');

    async function fetchGifs() {
        try {
            const API_KEY = 'Lkc5E7zYDdeWKrt5xLxn7Um0xdDA7YCO';
            const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
            const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${term}`);
            const res = await resJson.json();
            setGifs(res.data);
        } catch (error) {
            console.warn(error);
        }
    }

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

    function sendMessage(){
        if (currentMessage !== "") {
            setMessageSentStatus(true)
        }


    }


    console.log(userFrom.email)
    console.log(userTo)

    React.useEffect(() => {
        if(messageSentStatus){
            addMessageToDatabase(userTo, userFrom.email, currentMessage)
            setMessageSentStatus(false);
            setCurrentMessage("");
        }
    }, [messageSentStatus])

    function addAllItems(data) {
        setUsers(data);
    }
    function GetAllDataOnce() {
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, '/messages'))
            .then((snapshot) => {
                var students = [];

                snapshot.forEach(childSnapshot => {
                    students.push(childSnapshot.val());
                });
                addAllItems(students);
            })
    }

    return (
        <>
            <View>

               


                <ScrollView style={styles.scrollview}>

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

            {   <View style={{flexDirection: "row", marginLeft: "5%", marginBottom: "5%", marginTop: 10}}>
                    <TextInput
                        value={currentMessage}
                        style={styles.messageContainer}
                        onChangeText={(message) => setCurrentMessage(message)}
                        placeholder="Enter a message..." />
                         <Button title="Get GIPHY" onPress={() => {fetchGifs()}}/>
                         <FlatList
                data={gifs}
                renderItem={({item}) => (
                        <Image
                            resizeMode='contain'
                            style={styles.image}
                            source={{uri: item.images.original.url}}
                        />
                )}
            />
                    <TouchableOpacity
                        onPress={() => {sendMessage()}}
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
    sendButton: {
        marginLeft: Platform.OS === 'web' ? "1%" : "2%",
        padding: 8,
        backgroundColor: "black",
        borderRadius: 30
    },
    messageContainer: {
        backgroundColor: Platform.OS === 'web' ? `#add8e6` :`#fffaf0`,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        width: Platform.OS === 'web' ? "50%" : "75%"
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
        padding: Platform.OS === 'web' ? 10 : 5,
        marginLeft: '45%',
        borderRadius: 5,
        //marginBottom: 15,
        marginTop: 5,
        marginRight: Platform.OS === 'web' ? "44%" : "10%",
        maxWidth: '50%',
        alignSelf: 'flex-end',
        //maxWidth: 500,

        borderRadius: Platform.OS === 'web' ? 20 : 50,
        maxHeight: Platform.OS === 'web' ? 100 : 50,


    },

    "green": {
        /*marginTop:20,
        padding:20,
        backgroundColor: 'blue',
        fontSize: 14*/
        backgroundColor: "#dedede",
        padding: 10,
        marginTop: 5,
        marginLeft: "5%",
        maxWidth: '50%',
        alignSelf: 'flex-start',
        //maxWidth: 500,
        //padding: 14,

        //alignItems:"center",
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
