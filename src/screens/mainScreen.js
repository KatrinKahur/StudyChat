import React, { useState } from 'react';
import { Button, View, Text, Flatlist } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
//test
import {getDatabase, ref, set} from "firebase/database";

export default function MainScreen(props){
    return(<>
        <View>
            <Text style ={{size: 10, alignItems: 'center', justifyContent: 'center'}}>
                StudyChat
            </Text>
            <Button onClick = {() => NavigationContainer.navigate('profile')}/>
            //Ska ocskå ha kod så att man blir utloggad
            <Button onClick = {() => NavigationContainer.navigate('singIn')}/>
        </View>

        <FlatList>
            Array Data = {};
            //mainScreen = props.userList
            //props.userList = firebase.database.ref('userList')
            mainScreen.forEach(user; mainScreen)
        </FlatList>
    </>)
}

const [mainScreenList, setMainScreenList] = useState(props.userList);
useEffect(() => {
    function createMainScreenList(mainScreen) {
        setMainScreenList(props.userList);
    }
})

props.userList.on('child_added', (newUser));{
    mainScreenList.push(newUser);
}

props.userList.on('child_removed', (deletedUser));{
    mainScreenList.removeChild(deletedUser);
}

props.userList.on('child_changed');{
    setMainScreenList(props.userList);
}