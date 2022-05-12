import { getAuth } from "firebase/auth";
import AuthUser from "../external/authUser";
import {AlertMessageComponent} from "../components/alertMessageComponent";
import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native-web";
import { userInfo } from "os";

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



export default function MainScreen({navigation}){
    React.useEffect(function(){
        const username = getAuth().currentUser.displayName;
        console.log("username: ", username);
    }, [])

    return(<>
        <View>
            <Text style = {styles.appName}>
                StudyChat
            </Text>

            <Pressable style = {styles.contactListButton} onPress = {() => {navigation.navigate("Contact list")}}>
                <Text style ={styles.contactListText}>
                    contact list
                </Text>
            </Pressable>
            <Pressable style = {styles.contactListButton} onPress = {() => {AuthUser.signOut()}}>
                <Text style ={styles.signOutText}>
                    sign out
                </Text>
            </Pressable>
        </View>
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
        alignSelf: "center",
        display: "flex",
        height: "50px",
        width: "33%",
        flexDirection: "row",
        backgroundColor: "white"
    },
    signOutText: {
        fontSize: Platform.OS === 'web' ? 30 : 15,
        alignSelf: "center",
        display: "flex",
        width: "33%",
        flexDirection: "row",
    },
    contactListButton: {
        justifyContent: "center",
        alignSelf: "center",
        display: "flex",
        width: "25%",
        height: 60,
        flexDirection: "row",
    },
    contactListText: {
        fontSize: Platform.OS === 'web' ? 30 : 15,
        alignSelf: "center",
        display: "flex",
        width: "33%",
        flexDirection: "row",
    },
    userInfo: {
        fontSize: Platform.OS === 'web' ? 50 : 30,
        justifyContent: "center",
        alignSelf: "center",
        display: "flex",
        width: "50%",
        height: 30,
        flexDirection: "row",
    }
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
