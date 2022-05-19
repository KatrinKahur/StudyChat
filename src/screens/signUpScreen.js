import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {EmailInput} from "../components/emailInput";
import {StatusBar} from "expo-status-bar";
import {PasswordInput} from "../components/passwordInput";
import {UserNameInput} from "../components/userNameInput";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {AlertMessageComponent} from "../components/alertMessageComponent";

//const [errorMessageState, setErrorMessageState] = useState(null);
//const[authStatus, setAuthStatus] = React.useState(0);


export default function Signup (navigation){

  const[authStatus, setAuthStatus] = React.useState(0);
  const[email, setEmail] = React.useState("");
  const[password, setPassword] = React.useState("");
  const[displayName, setDisplayName] = React.useState("");
  const [errorMessageState, setErrorMessageState] = useState(null);

  React.useEffect(function (){
    if(authStatus > 0)
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then((res) => {
      updateProfile(res.user,{
        displayName: displayName
      })
      console.log('User registered successfully!')
      navigation.push('Sign-in')
    })
    .catch((error) => {
            if(error.message === "Invalid password" ||
                error.message === "Invalid email" ||
                error.message === "Invalid name") {
                setErrorMessageState(error.message);
            }
            else {
                console.log(error.message);
                setErrorMessageState("An unknown error occurred, please try again.");
            }
        })
}, [authStatus]);
  
  return(
    <View style={styles.SignUp}>
      <View style={styles.signUpContainer}>
        <Text style={styles.header}>Create a new account</Text>
        <AlertMessageComponent
            message={errorMessageState}
            chosenStyle="danger"
            setMessageCallback={setErrorMessageState}
        />
      <View style={styles.signUpInputContainer}>
        <UserNameInput 
          onChangeText={(val) => setDisplayName(val)}
          value={displayName}
        />
        <EmailInput 
          onChangeText={(val) => setEmail(val)}
          value={email}
         />
        <PasswordInput 
          onChangeText={(e) => setPassword(e)}
          value={password}
         />
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          //onPress={() => this.registerUser()}
          onPress={()=>{
            if((email === "") && (password === "") && (displayName === ""))
                setErrorMessageState("Please fill in the credentials");
            else if(email === "")
                setErrorMessageState("An email is required");
            else if(password === "")
                setErrorMessageState("A password is required");
            else if(displayName === "")
                setErrorMessageState("A name is required");
            else
                setAuthStatus(authStatus + 1);
        }}
        >
          <Text style={styles.btntext}>Sign up</Text>
        </TouchableOpacity>
        </View>

        <Text 
          style={styles.SignUpText}
          onPress={()=>{navigation.push('Sign-in')}}
        >
          Already Registered? Click here to sign in
        </Text>
      </View>   
      <StatusBar style="auto"/>
    </View>
  )
}


const styles = StyleSheet.create({
  SignUp: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    paddingLeft: 60,
    paddingRight: 60,
  },
  SignUpText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  header: {
      fontSize: Platform.OS === 'web' ? 65 : 40,
      fontWeight: "bold",
      color: '#000000',
      paddingBottom: 10,
      marginBottom: 40,
      borderBottomColor: '#199187',
      borderBottomWidth: 1,
  },
  textinput: {
      alignSelf: 'stretch',
      marginTop: Platform.OS === 'web'? 10 : 5,
      paddingRight: 10,
      paddingTop: 20,
      height: 40,
      marginBottom: 30,
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
  },
  button: {
     alignSelf: 'stretch',
     alignItems: 'center',
     padding: 20,
     backgroundColor: '#1e90ff',
     marginTop: 30,
     borderRadius: 5,
  },
  btntext: {
      color: '#fff',
      fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: Platform.OS === 'web' ? 65 : 40,
    marginBottom: Platform.OS === 'web' ? 50 : 35,
    fontWeight: "bold",
    textAlign: "center"
  },
  signUpContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
},
signUpInputContainer: {
  width: Platform.OS === 'web'? "15%":"55%",
  minWidth: Platform.OS === 'web'? 340 : 0,
},
buttonContainer: {
  width: Platform.OS === 'web'? "15%" : "55%",
  minWidth: Platform.OS === 'web'? 340 : 0
},
});

