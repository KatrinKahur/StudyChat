import { getAuth } from "firebase/auth";
import AuthUser from "../external/authUser";
import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
//test
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
//import { users, setUsers } from "./chatScreen";
import VincentChatScreen from "./vincentChatScreen";
import VincentContactListScreen from "./vincentContactListScreen.js";

export default function MainScreen({navigation, model}){
    const [userName, setUserName] = React.useState(model.userName)
    
    function waitForSetUserName(){
        if(model.userName === null){
            setTimeout(() => {waitForSetUsername()}, 500);
        }else{
            setUserName(model.userName);
        }
    }

    React.useEffect(() => {waitForSetUserName()}, [model.userName])

/*   function addAllItems(data) {
        setUsers(data);
    }
    
    function GetAllDataOnce() {
        const db = getDatabase();
        
        const dbRef = ref(db);
    
        get(child(dbRef, '/users'))
        .then((snapshot) => {
            var students = [];
    
            snapshot.forEach(childSnapshot => {
                students.push(childSnapshot.val());
            });
            addAllItems(students);
        })
        return students;
    }

    const students = GetAllDataOnce();*/


    return(<>
        <View style = {styles.view}>
            <Text style = {styles.appNameText}>
                StudyChat
            </Text>
            <Text style = {styles.userInfo}>
                Welcome
            </Text>
            <Text style = {styles.userInfo}>
                {userName}
                {console.log(userName)}
            </Text>

            <Pressable style = {styles.contactListButton} onPress = {() => {navigation.push("Chat")}}>
                <Text style ={styles.contactListText}>
                    chat screen
                </Text>
            </Pressable>
            <Pressable style = {styles.contactListButton} onPress = {() => {navigation.push("VincentContactList")}}>
                <Text style ={styles.contactListText}>
                    contact list
                </Text>
            </Pressable>
            {//if(Platform.OS === 'web'){
}
                <Pressable style = {styles.signOutButton} onPress = {() => {AuthUser.signOut()}}>
                    <Text style ={styles.signOutText}>
                        sign out
                    </Text>
                </Pressable>
            {//}else{
}
{/*                <ScrollView style = {styles.contactList}>
                    <Text>
                        {students.map()=>{
                            return displayName;
                        }}
                        testingtestingtesting
                        testingtestingtesting
                        testingtestingtesting
                        testingtestingtesting
                        testingtestingtesting
                        testingtestingtesting
                    </Text>;
                </ScrollView>*/}
            {//}
}
        </View>
    </>)
}

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        display: "flex",
        width: "100%",
        height: "100%"
    },
    appNameText: {
        fontSize: Platform.OS === 'web' ? 50 : 30,
        fontWeight: "bold",
        alignSelf: "center",
        color: "blue"
    },
    signOutButton: {
        justifyContent: "center",
        alignSelf: "center",
        display: "flex",
        height: Platform.OS === 'web' ? 60 : 35,
        width: Platform.OS === 'web' ? "15%" : "30%",
        flexDirection: "row",
        backgroundColor: "grey",
        margin: 5
    },
    signOutText: {
        fontSize: Platform.OS === 'web' ? 30 : 15,
        alignSelf: "center",
        display: "flex",
        width: Platform.OS === 'web'? 140 : 60,
        flexDirection: "row"
    },
    contactListButton: {
        justifyContent: "center",
        alignSelf: "center",
        display: "flex",
        width: Platform.OS === 'web' ? "20%" : "40%",
        height: Platform.OS === 'web' ? 60 : 35,
        flexDirection: "row",
        backgroundColor: "brown",
        margin: 5,
        marginTop: 10
    },
    contactListText: {
        fontSize: Platform.OS === 'web' ? 30 : 15,
        alignSelf: "center",
        display: "flex",
        //width: "33%",
        flexDirection: "row"
    },
    userInfo: {
        textAlign: "center",
        fontSize: Platform.OS === 'web' ? 35 : 20,
        //justifyContent: "center",
        alignSelf: "center",
        display: "flex",
        //width: "50%",
        height: 30,
        flexDirection: "row",
        marginBottom: 10,
        marginRight: 40
    },
    contactList: {
        alignSelf: "flex-start",
        justifyContent: "center",
        color: "green",
        marginHorizontal: "15"
        //todo
    }
})