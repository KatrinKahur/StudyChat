import React from "react";
import AuthUser from "../external/authUser";
import {Pressable, Platform, StyleSheet, Text, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {FontAwesome, FontAwesome5} from '@expo/vector-icons';

export default function SignInScreen( {navigation} ){
    const[authStatus, setAuthStatus] = React.useState(0);
    const[email, setEmail] = React.useState("");
    const[password, setPassword] = React.useState("");
    
    React.useEffect(function (){
        if(authStatus > 0)
            AuthUser.signIn(email, password);
    }, [authStatus]);
    
    return(
        <View style={styles.container}>
                <View style={styles.signInContainer}>
                    <Text style={styles.welcomeText}>Welcome to StudyChat!</Text>
                    <View style={styles.signInInputContainer}>
                        <View style={styles.emailInputContainer}>
                            <FontAwesome name="user" size={24} color="black" />
                            <TextInput style={styles.signInInputText} value={email}
                                       onChangeText={(e) => setEmail(e)}
                                       placeholder="Email.."/>
                        </View>
                        <View style={styles.passwordInputContainer}>
                            <FontAwesome5 name="lock" size={24} color="black" />
                            <TextInput style={styles.signInInputText} value={password}
                                       secureTextEntry={true}
                                       onChangeText = {(e) => setPassword(e)} placeholder="Password.."/>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button}
                                   onPress={()=>{
                                       if(email && password === "")
                                           window.alert("Please fill in the credentials.");
                                       else if(email === "")
                                           window.alert("Please fill in your email.");
                                       else if(password === "")
                                           window.alert("Please fill in your password.");
                                       else
                                           setAuthStatus(authStatus + 1);
                                   }} ><Text style={styles.buttonTitle}>Sign in</Text>
                        </Pressable>
                        <Text style={styles.noAccountYetText}>No account yet? </Text>
                        <Pressable style={styles.button}
                                   onPress={()=>{navigation.push("Sign-up")}}>
                            <Text style={styles.buttonTitle}>Click here to create one!</Text>
                        </Pressable>
                    </View>
                </View>
                <StatusBar style="auto"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white"
    },
    signInContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    welcomeText: {
        fontSize: Platform.OS === 'web' ? 65 : 40,
        marginBottom: Platform.OS === 'web' ? 50 : 35,
        fontWeight: "bold"
    },
    signInInputContainer: {
        width: Platform.OS === 'web'? "15%":"55%",
        minWidth: Platform.OS === 'web'? 340 : 0,
    },
    emailInputContainer: {
        flexDirection: "row",
        marginTop: Platform.OS === 'web'? 10 : 5,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 5,
        borderBottomWidth: 1,
        marginVertical: 10
    },
    passwordInputContainer: {
        flexDirection: "row",
        marginTop: Platform.OS === 'web'? 10 : 5,
        paddingRight: Platform.OS === 'web' ? 10 : 5,
        paddingTop: 20,
        paddingBottom: 5,
        borderBottomWidth: 1,
        marginVertical: 10
    },
    signInInputText: {
        fontSize: Platform.OS === 'web'? 20 : 17,
        marginLeft: 15,
        paddingVertical: 3,
        overflow: "hidden"
    },
    noAccountYetText: {
        fontSize:  Platform.OS === 'web'? 25 : 18,
        marginTop: 30
    },
    button: {
        backgroundColor: `#1e90ff`,
        paddingVertical: 17,
        marginTop: 10,
        marginBottom: 15,
        alignItems: "center",
        borderRadius: 5
    },
    buttonTitle: {
        fontSize:  Platform.OS === 'web'? 20 : 15
    },
    buttonContainer: {
        width: Platform.OS === 'web'? "15%" : "55%",
        minWidth: Platform.OS === 'web'? 340 : 0
    },
    text: {
        alignSelf: "center"
    }
})