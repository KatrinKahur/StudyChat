import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {firebaseConfig} from "./src/config/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from 'react';
import { Platform } from 'react-native';
import SignInScreen from "./src/screens/signInScreen";
import SignUpScreen from "./src/screens/signUpScreen";
import MainScreen from "./src/screens/mainScreen";
import forgotPasswordScreen from "./src/screens/forgotPasswordScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ActivityIndicator} from "react-native";
import ChatScreen from "./src/screens/chatScreen";
import ContactListScreen from "./src/screens/contactListScreen";
import VincentChatScreen from "./src/screens/vincentChatScreen";
import VincentContactListScreen from "./src/screens/vincentContactListScreen";

import AppModel from "./src/appModel";

export default function App() {
    const Stack = createNativeStackNavigator();
    const appModel = new AppModel();
    const[isSignedIn, setIsSignedIn] = React.useState(null);
    React.useEffect(async () => {
        try {
            const defaultApp = initializeApp(firebaseConfig);
            initializeAuth(defaultApp, {
                persistence: getReactNativePersistence(AsyncStorage),
            });
        } catch {
            // Ignore error because I must initialize auth again in order to get persistence, but re-initializing will always
            // throw an error.
        }
    }, []);

    React.useEffect(function (){
        onAuthStateChanged(getAuth(), function (user){
            if(user){
                setIsSignedIn(true);
                appModel.setUserId(user.uid);
            } else {
                setIsSignedIn(false);
                appModel.setUserId(null);
            }
        });
    }, []);

    return (
        <NavigationContainer>
            {isSignedIn ?
                (
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen name="Main" component={MainScreen} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                        <Stack.Screen name="Contact list" component={ContactListScreen} />
                        <Stack.Screen name="VincentContactList" component={VincentContactListScreen} />
                        <Stack.Screen name="VincentChatScreen" component={VincentChatScreen} />
                    </Stack.Navigator>
                ) : (isSignedIn === null) ?
                    (
                        <ActivityIndicator size="large" />
                    ) : (
                        <Stack.Navigator initialRouteName="Sign-in">
                            <Stack.Screen
                                options={{headerShown: Platform.OS !== "web"}}
                                name="Sign-in"
                                component={SignInScreen}/>
                            <Stack.Screen
                                name="Sign-up"
                                component={SignUpScreen} />
                            <Stack.Screen
                                name="Forgot password"
                                component={forgotPasswordScreen} />
                        </Stack.Navigator>
                    )
            }
        </NavigationContainer>
    );
}