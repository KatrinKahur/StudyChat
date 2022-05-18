import { getAuth } from "firebase/auth";
import AuthUser from "../external/authUser";
import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet, ScrollView} from 'react-native';
import { Platform } from "react-native-web";
//test
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
//import { users, setUsers } from "./chatScreen";

export default function MainScreen({navigation}){
    React.useEffect(function(){
        const username = getAuth().currentUser.displayName;
        console.log("username: ");
        console.log("username: ", username);
    }, [])

   function addAllItems(data) {
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

    const students = GetAllDataOnce();

    return(<>
        <View style = {styles.view}>
            <Text style = {styles.appNameText}>
                StudyChat
            </Text>

            <Text style = {styles.userInfo}>
                {getAuth().currentUser.displayName}
            </Text>

            <Pressable style = {styles.contactListButton} onPress = {() => {navigation.navigate("Contact list")}}>
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
                <ScrollView style = {styles.contactList}>
                    <Text>
                        {students.map().displayName}
                        testingtestingtesting
                        testingtestingtesting
                        testingtestingtesting
                        testingtestingtesting
                        testingtestingtesting
                        testingtestingtesting
                    </Text>;
                </ScrollView>
            {//}
}
        </View>
    </>)
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
        backgroundColor: "grey",
        margin: 5
    },
    signOutText: {
        fontSize: Platform.OS === 'web' ? 30 : 15,
        alignSelf: "center",
        display: "flex",
        width: "33%",
        flexDirection: "row"
    },
    contactListButton: {
        justifyContent: "center",
        alignSelf: "center",
        display: "flex",
        width: "30%",
        height: 60,
        flexDirection: "row",
        backgroundColor: "brown",
        margin: 5
    },
    contactListText: {
        fontSize: Platform.OS === 'web' ? 30 : 15,
        alignSelf: "center",
        display: "flex",
        width: "33%",
        flexDirection: "row"
    },
    userInfo: {
        fontSize: Platform.OS === 'web' ? 50 : 30,
        justifyContent: "center",
        alignSelf: "center",
        display: "flex",
        width: "50%",
        height: 30,
        flexDirection: "row"
    },
    contactList: {
        alignSelf: "left",
        centerContent: true,
        color: "green",
        marginHorizontal: "15"
        //todo
    },
    view: {
        height: 200
    }
})
