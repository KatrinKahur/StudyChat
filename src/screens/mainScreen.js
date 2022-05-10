import AuthUser from "../external/authUser";
import {AlertMessageComponent} from "../components/alertMessageComponent";
import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native-web";
//test
//import {getDatabase, ref, set} from "firebase/database";

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
            <Text style ={styles.appName}>
                StudyChat
            </Text>
            <Button onClick = {() => {}/*NavigationContainer.navigate('profile')*/}/>
            {/*Ska ocskå ha kod så att man blir utloggad*/}
            <Button onClick = {() => {setAuthStatus(0)}}/>
        </View>

        {/*<FlatList>
            Array Data = {};
            mainScreen = getDatabase()
            mainScreen.forEach(user; mainScreen)
    </FlatList>*/}
    </>)
    //Från katrin
    /*return(
        <View style={{selfAlign: "center", marginHorizontal: "45%", marginVertical: "25%"}}><Button title="Logout" onPress={()=>AuthUser.signOut()}/></View>
    )*/
}

const styles = StyleSheet.create({
    view: {
        alignText: "center",
        justifyContent: "center",
        display: "flex",
        width: "100%",
        height: "100%"
    },
    appNameText: {
        fontSize: Platform.OS === 'web' ? 50 : 30,
        ontWeight: "bold",
        alignSelf: "center",
        color: "blue"
    },
    signOutButton: {
        justifyContent: "center",
        display: "flex",
        width: "33%",
        flexDirection: "row",
        backgroundColor: "white"
    },
    signOutText: {
        alignSelf: "center",
        display: "flex",
        width: "33%",
        flexDirection: "row",
    },
    contactList: {
        justifyContent: "center",
        alignSelf: "center",
        display: "flex",
        width: "25%",
        height: 60,
        flexDirection: "column",
    },
})
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
