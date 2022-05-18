import {Button, TextInput, View, StyleSheet, FlatList, Image} from "react-native";
import React from "react";
import moment from "moment";
import { getDatabase, push, ref, set, onValue, child, get, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database"
import AuthUser from "../external/authUser";
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
        const API_KEY = Lkc5E7zYDdeWKrt5xLxn7Um0xdDA7YCO;
        const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
        const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${term}`);
        const res = await resJson.json();
        setGifs(res.data);
      } catch (error) {
        console.warn(error);
      }
    } /// add facebook fresco
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
    function onEdit(newTerm) {
      updateTerm(newTerm);
      fetchGifs();
    }
  
    return (
      <View style={styles.view}>
        <TextInput
          placeholder="Search Giphy"
          placeholderTextColor='#fff'
          style={styles.textInput}
          onChangeText={(text) => onEdit(text)}
        />
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
    );
    function addAllItems(data) {
        setUsers(data);
      }

      function GetAllDataOnce() {
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
            addMessageToDatabase(userTo, userFrom, currentMessage)
            setMessageSentStatus(false);
            setCurrentMessage("");
        }
    }, [messageSentStatus])

    return(
        <View style={{ flex:1, backgroundColor: '#87CEEB' }}>
        <View style={{bottom:0, height:50, width:'100%', position: 'absolute', flexDirection: 'row'}}></View>
            <TextInput
                value={currentMessage}
                onChangeText={(message) => setCurrentMessage(message)}
                placeholder="Enter a message..." placeholderTextColor={'#F5FFFA'} style ={{height:40, borderRadius:20, backgroundColor: '#ccc'}}/>
            <Button title="Send message" onPress={() => {setMessageSentStatus(true)}}/>
            <Button title="Get messages" onPress={() => {GetAllDataOnce();}}/>
            
            {console.log(users)}
        </View>
    
    )
}
