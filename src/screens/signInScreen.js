import React from "react";
import AuthUser from "../external/authUser";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function SignInScreen( {navigation} ){
    const[authStatus, setAuthStatus] = React.useState(0);
    const[email, setEmail] = React.useState("katrin@studychat.se");
    const[password, setPassword] = React.useState("katrin");
    
    React.useEffect(function (){
        if(authStatus > 0)
            AuthUser.signIn(email, password);
    }, [authStatus]);
    
    return(
        <View style={styles.container}>
                <View style={styles.signInContainer}>
                    <TextInput style={styles.signInInput} value={email}
                               onChangeText={(e) => setEmail(e)}
                               placeholder="Email.."/>
                    <TextInput style={styles.signInInput} value={password}
                               secureTextEntry={true}
                               onChangeText = {(e) => setPassword(e)} placeholder="Password.."/>
                    <Button style={styles.button}
                            onPress={()=>{
                        if(email && password === "")
                            window.alert("Please fill in the credentials.");
                        else if(email === "")
                            window.alert("Please fill in your email.");
                        else if(password === "")
                            window.alert("Please fill in your password.");
                        else
                            setAuthStatus(authStatus + 1);
                    }} title="Log in"/>
                    <Text style={styles.noAccountYetText}>No account yet? </Text>
                    <Button style={styles.button}
                            title="Click here to create one!"
                            onPress={()=>{navigation.push("Sign-up")}}/>
                </View>
                <StatusBar style="auto"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    signInContainer: {
        marginTop: "50%",
        marginBottom: "10%",
        marginHorizontal: "20%",
    },
    signInInput: {
        paddingRight: "10%",
        paddingTop: "5%",
        marginVertical: "5%",
        borderBottomWidth: 1,
        borderBottomColor: "black"
    },
    noAccountYetText: {
        fontSize: 15,
        paddingVertical: "2%"
    },
    button: {
        marginTop: "10%",
        paddingVertical: "5%"
    }
})