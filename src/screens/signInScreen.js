import React from "react";
import AuthUser from "../external/authUser";
import {Pressable, Platform, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {EmailInput} from "../components/emailInput";
import {PasswordInput} from "../components/passwordInput";


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
                        <EmailInput onChangeText={(e) => setEmail(e)} value={email}/>
                        <PasswordInput onChangeText={(e) => setPassword(e)} value={password} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button}
                                   onPress={()=>{
                                       if((email === "") && (password === ""))
                                           window.alert("Please fill in the credentials.");
                                       else if(email === "")
                                           window.alert("An email is required.");
                                       else if(password === "")
                                           window.alert("A password is required.");
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