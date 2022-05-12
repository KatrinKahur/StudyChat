import {Button, TextInput, View} from "react-native";
import React from "react";
import {getDatabase, push, ref} from "firebase/database";
import moment from "moment";


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
        </View>
    )
}
