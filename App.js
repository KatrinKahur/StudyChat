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
import ForgotPasswordScreen from "./src/screens/forgotPasswordScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ActivityIndicator} from "react-native";
import ChatScreen from "./src/screens/chatScreen";
import ContactListScreen from "./src/screens/contactListScreen";
import VincentChatScreen from "./src/screens/vincentChatScreen";
import VincentContactListScreen from "./src/screens/vincentContactListScreen";
import GroupListScreen from "./src/screens/groupListScreen";
import GroupChatScreen from "./src/screens/groupChatScreen";
import CreateChatScreen from "./src/screens/createChatScreen";
import AppModel from "./src/appModel";

const appModel = new AppModel();

export default function App() {
    const Stack = createNativeStackNavigator();
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
                appModel.setUserName(user.displayName);
            } else {
                setIsSignedIn(false);
                appModel.setUserId(null);
                appModel.setUserName(null);
            }
        });
    }, []);

    return (
        <NavigationContainer>
            {isSignedIn ?
                (
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen
                            name="Main"
                            children = {(props) => (<MainScreen
                                navigation = {props.navigation}
                                model = {appModel} />)}
                        />
                        <Stack.Screen 
                            name="Group Chat List"
                            children = {(props) => (<GroupListScreen
                                navigation = {props.navigation}
                                model = {appModel} />)}
                        />
                        <Stack.Screen name="Group Chat Screen" component={GroupChatScreen} />
                        <Stack.Screen name="Contact list" component={ContactListScreen} />
                        <Stack.Screen name="VincentContactList" component={VincentContactListScreen} />
                        <Stack.Screen name="VincentChatScreen" component={VincentChatScreen} />
                        <Stack.Screen name="Create Chat Screen" component={CreateChatScreen} />
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
                          children = {(props) => (<SignUpScreen
                              navigation = {props.navigation}
                              model = {appModel}/>)}
                      />
                      <Stack.Screen
                          name="Forgot password"
                          component={ForgotPasswordScreen} />
                    </Stack.Navigator>
                    )
            }
        </NavigationContainer>
    );
}