import React, { useState } from 'react';
import { Button, View, Text, Flatlist } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
//test
import {getDatabase, ref, set} from "firebase/database";

/*function writeUserData(userId, name, email, imageUrl) {
    set(ref(getDatabase(), 'users/' + userId), {
        username: name,
        email: email,
        profile_picture : imageUrl
    });
  }*/

//writeUserData(34532, 'Oscar', 'oscar.maddison@hotmail.com', null)

export default function MainScreen(){
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
            mainScreen = getDatabase()
            mainScreen.forEach(user; mainScreen)
        </FlatList>
    </>)
    //Från katrin
    /*return(
        <View style={{selfAlign: "center", marginHorizontal: "45%", marginVertical: "25%"}}><Button title="Logout" onPress={()=>AuthUser.signOut()}/></View>
    )*/
}

/*const [mainScreenList, setMainScreenList] = useState(props.userList);
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
}*/
