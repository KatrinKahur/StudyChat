import {Button, TextInput, View} from "react-native";
import React from "react";
import moment from "moment";
import { getDatabase, push, ref, set, onValue, child, get } from "firebase/database"

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

    function addAllItems(data) {
        setUsers(data);
      }
      const db = getDatabase();
    
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
        <View>
            <TextInput
                value={currentMessage}
                onChangeText={(message) => setCurrentMessage(message)}
                placeholder="Enter a message..."/>
            <Button title="Send message" onPress={() => {setMessageSentStatus(true)}}/>
            <Button title="Get messages" onPress={() => {GetAllDataOnce();}}/>
            
            {console.log(users)}
        </View>
    
    )
}
