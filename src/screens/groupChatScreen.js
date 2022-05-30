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
    Pressable,
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
import { getDatabase, ref, set, onValue, child, get, onChildAdded, push, update } from "firebase/database";
import contactListScreen from "./chatScreen";
import moment from "moment";
import {MaterialCommunityIcons} from "@expo/vector-icons";
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
    const[chatTo, setchatTo] = React.useState(route.params.targetName)
    const[currentMessage, setCurrentMessage] = React.useState("");
    const[currentGif, setCurrentGif] = React.useState("");
    const[messageSentStatus, setMessageSentStatus] = React.useState(false);
    const [userData, setuserData] = useState();
    const [users, setUsers] = React.useState([]);  
    const [newArray, setnewArray] = useState([]);
    const [gifs, setGifs] = useState([]);
    const [term, updateTerm] = useState('');


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
    function onEdit(newTerm) {
        updateTerm(newTerm);
        fetchGifs();
      }
    
     

    



    console.log(userFrom.email)
    console.log(chatTo)

    React.useEffect(() => {
        if(messageSentStatus){
            addMessageToDatabase(chatTo, userFrom.email, currentMessage)
            addMessageToDatabase(chatTo, userFrom.email, userFrom.displayName)
            setMessageSentStatus(false);
            setCurrentMessage("");
            setCurrentGif("");
        }
    }, [messageSentStatus])

    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(getUser());
    const [filteredMessages, setFilteredMessages] = useState([]);

    const db = getDatabase();

 /*   function addAllItems(data) {
        setMessages(data);
    }*/

    function GetMessageDataOnce() {
        const dbRef = ref(db);
        get(child(dbRef, 'messages/'))
            .then((snapshot) => {
                var messages = [];
                snapshot.forEach(childSnapshot => {
                    messages.push(childSnapshot.val());
                });
                setMessages(messages);
            })
    }

    function GetUserDataOnce() {
        const dbRef = ref(db);
        get(child(dbRef, '/users'))
          .then((snapshot) => {
            var students = [];
            snapshot.forEach(childSnapshot => {
              students.push(childSnapshot.val());
            });
            setUsers(students);
          })
      }

    useEffect(() => {

        GetMessageDataOnce();
        const db = getDatabase();
        const updatedMessages = ref(db, 'messages/');
        onChildAdded(updatedMessages, (data) => {
            console.log("UPDATED VALUE FOUND")
            GetMessageDataOnce();
        });

        GetUserDataOnce();
        const updatedUsers = ref(db, 'users/');
        onChildAdded(updatedUsers, (data) => {
            console.log("UPDATED VALUE FOUND")
            GetUserDataOnce();
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
            if (item.from == currentUser.email && item.to == route.params.targetName) {
                return { color: "green", ...item }
            }

            else if (item.to == route.params.targetName) {
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
      /*  if (currentMessage = gifs) {
            setMessageSentStatus(true)
        }*/
    }

    console.log('current user:' + getAuth().currentUser.uid)
    console.log('users:' + users)
    console.log('chat:' + route.params.targetChat)
    console.log('chat name:' + route.params.targetName)
    console.log('checking:' + ref(db, 'groupChats'))
    //console.log(users.map(users.username))
    //set(ref(db, ('testing'), {test: '1123'}))
    //console.log('testing:' + firebase.database().ref( 'users').val())
    /*get(child(ref(db, 'groupChats')).then((snapshot) => {
        snapshot.forEach( (childSnapshot) => {
            console.log('checking:' + childSnapshot)
        })
    }))*/

    return (
        <>
            <View>

                <Text style={styles.textstyle}>{route.params.targetName} </Text>



                <ScrollView style={styles.rightScrollview}>

                    {filteredMessages.map(items => {

                        if (items.color == "green") {
                            return <Text style={styles.green} key={items.time + items.color} >{items.message}</Text>
                        }

                        if (items.color == "blue") {
                            return <Text style={styles.blue} key={items.time + items.color} >{items.message}</Text>
                        }

                    })}


                </ScrollView>




           

            {   <View style={{flexDirection: "row", marginLeft: "5%", marginBottom: "5%", marginTop: 10}}>
                    <TextInput
                        value={currentMessage}
                        style={styles.messageContainer}
                        onChangeText={(message) => setCurrentMessage(message)}
                        placeholder="Enter a message..." />
                    <TouchableOpacity
                        onPress={() => {sendMessage()}}
                        style={styles.sendButton}
                    >
                        <MaterialCommunityIcons name="send" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            }
 </View>
            <View style={styles.view}>
            <Button title="Get GIPHY" onPress={() => {fetchGifs()}}/>
          <TextInput
          
            placeholder="Search Giphy"
            placeholderTextColor='#fff'
            style={styles.textInput2}
            onChangeText={(text) => onEdit(text)}
          />
          
          <FlatList
            data={gifs}
            renderItem={({item}) => (
                <TouchableOpacity
                    onPress={() => {sendMessage()}}
            
                    > <Image
                    resizeMode='contain'
                    style={styles.image}
                    source={{uri: item.images.original.url}}
                />
                        
                    </TouchableOpacity> 
                   
               
            )}
          />
        </View>
            <View><ScrollView style={styles.leftScrollview}>
                {users.map((users) => (
                    //<Pressable style={styles.contactListButton} key={users.email} onPress={() => push(ref(getDatabase(), '/groupChats/' + route.params.targetChat + '/users/'), users.uid)}>
                    <Pressable style={styles.contactListButton} key={users.key} onPress={() =>
                    get(ref(db, 'groupChats')).then((snapshot) => {
                        snapshot.forEach((child) => {
                            if(child.val().name === route.params.targetName)
                                {get(ref(db, 'groupChats/' + child.key)).then((snapshot) => {
                                    if(snapshot.val().user2 === '')
                                        {update(ref(getDatabase(), 'groupChats/' + child.key ), {user2: users.email})}
                                    else if(snapshot.val().user3 === '')
                                        {update(ref(getDatabase(), 'groupChats/' + child.key ), {user3: users.email})}
                                    else if(snapshot.val().user4 === '')
                                        {update(ref(getDatabase(), 'groupChats/' + child.key ), {user4: users.email})}
                                    else if(snapshot.val().user5 === '')
                                        {update(ref(getDatabase(), 'groupChats/' + child.key ), {user5: users.email})}
                                    else if(snapshot.val().user6 === '')
                                        {update(ref(getDatabase(), 'groupChats/' + child.key ), {user6: users.email})}
                                    else
                                        {get(ref(db, 'groupChats/' + child.key)).then((snapshot) => {
                                            if (snapshot.exists()) {
                                              console.log(snapshot.val());
                                            }
                                        })}
                                    })}
                        })
                    })}>
                        <Text style={styles.btntext}>
                            {users.username},
                        </Text>
                    </Pressable>
                ))}
            </ScrollView></View>
        </>
    )
}


const styles = StyleSheet.create({
    textInput:{
        width: '100%',
        height: 10,
        color: 'pink'
    },
      image: {
        width: 300,
        height: 150,
        borderWidth: 3,
        marginBottom: 5
      },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingHorizontal: 5
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
        borderRadius: 10,
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

    leftScrollView: {
        alignSelf: 'left',
        maxHeight: '40%',

    },

    rightScrollView: {
        alignSelf: 'right',
        maxHeight: '40%',

    },
    contactListButton: {
        justifyContent: "center",
        alignSelf: "center",
        display: "flex",
        width: Platform.OS === 'web' ? "15%" : "30%",
        height: Platform.OS === 'web' ? 40 : 25,
        flexDirection: "row",
        backgroundColor: "brown",
        margin: 5,
        marginTop: 10
      }
});
