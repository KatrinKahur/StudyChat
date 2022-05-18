import {Button, TextInput, View, StyleSheet, FlatList, Image} from "react-native";
import React from "react";
import moment from "moment";
import { getDatabase, push, ref, child, get } from "firebase/database"

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
    const [users, setUsers] = React.useState({});
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

    React.useEffect(() => {
        if(messageSentStatus){
            addMessageToDatabase(userTo, userFrom, currentMessage);
            setMessageSentStatus(false);
            setCurrentMessage("");
        }
    }, [messageSentStatus])

    return(
        <View style={{ flex:1, backgroundColor: '#87CEEB' }}>
            <View style={{bottom:0, height:50, width:'100%', position: 'absolute', flexDirection: 'row'}}></View>
                <TextInput
                    value={currentMessage}
                    onChangeText={(message) => {
                        setCurrentMessage(message)
                        updateTerm(message);
                    }}
                    placeholder="Enter a message..." placeholderTextColor={'#F5FFFA'} style ={{height:40, borderRadius:20, backgroundColor: '#ccc'}}/>
            <Button title="Send message" onPress={() => {setMessageSentStatus(true)}}/>
            <Button title="Get messages" onPress={() => {GetAllDataOnce();}}/>
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
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightblue'
    },
    textInput: {
        width: '100%',
        height: 50,
        color: 'white'
    },
    image: {
        width: 300,
        height: 150,
        borderWidth: 3,
        marginBottom: 5
    },
});
