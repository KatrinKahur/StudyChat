import { getAuth } from "firebase/auth";
import AuthUser from "../external/authUser";
//import {AlertMessageComponent} from "../components/alertMessageComponent";
import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet, ScrollView} from 'react-native';
//expo install expo-navigation-bar;
//import * as NavigationBar from "expo-navigation-bar";
//import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native-web";
//import { userInfo } from "os";
//test
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";

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
            {//if(Platform.OS === 'web'){
}
                <Pressable style = {styles.contactListButton} onPress = {() => {AuthUser.signOut()}}>
                    <Text style ={styles.signOutText}>
                        sign out
                    </Text>
                </Pressable>
            {//}else{
}
                <ScrollView style = {styles.contactList}>
                    {/*function addAllItems(data) {
                        setUsers(data);
                    }
                    const db = getDatabase();

                    function GetAllDataOnce() {
                        const dbRef = ref(db);


                        get(child(dbRef, '/users'))
                        .then((snapshot) => {
                            var students = [];

                            snapshot.forEach(childSnapshot => {
                                students.push(childSnapshot.val());
                            });
                            addAllItems(students);
                        })

                    }

                GetAllDataOnce();*/}
                </ScrollView>
            {//}
}
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
        flexDirection: "row"
    },
    contactListButton: {
        justifyContent: "center",
        alignSelf: "center",
        display: "flex",
        width: "25%",
        height: 60,
        flexDirection: "row"
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
        color: "green"
        //todo
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
