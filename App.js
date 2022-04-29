import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {firebaseConfig} from "./src/config/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { View } from 'react-native';
import SignInScreen from "./src/screens/signInScreen";
import SignUpScreen from "./src/screens/signUpScreen";
import MainScreen from "./src/screens/mainScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
export default function App() {
  const[isSignedIn, setIsSignedIn] = React.useState(null);
  React.useEffect(async () => {
    const defaultApp = initializeApp(firebaseConfig);
    initializeAuth(defaultApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }, []);

  React.useEffect(function (){
    onAuthStateChanged(getAuth(), function (user){
      if(user){
        setIsSignedIn(true);
      }
      else{
        setIsSignedIn(false);
      }
    });
  }, []);

  return (
      <NavigationContainer>{
        isSignedIn ? (
                <Stack.Navigator initialRouteName="Main">
                  <Stack.Screen name="Main" component={MainScreen} />
                </Stack.Navigator>
            ) :
            (isSignedIn === null)? (
                    <View style={{backgroundColor: "white"}}></View>
                ) :
                (<Stack.Navigator initialRouteName="Sign-in">
                  <Stack.Screen name="Sign-in" component={SignInScreen}/>
                  <Stack.Screen name="Sign-up" component={SignUpScreen} />
                </Stack.Navigator>)
      }
      </NavigationContainer>
  );
}
