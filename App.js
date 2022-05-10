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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
<<<<<<< HEAD
//test
import {getDatabase, ref, set} from "firebase/database";

const database = getDatabase();

const model = new appModel();

//skapar databas för test
const userId = 1
set(ref(getDatabase(), 'userList/' + userId), {
  full_name: 'namn förnamn'
});
=======
import {ActivityIndicator} from "react-native";
>>>>>>> 3c017ce38f8d10b430b05b0311ec3779801631f1

const Stack = createNativeStackNavigator();
export default function App() {
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
            } else {
                setIsSignedIn(false);
            }
        });
    }, []);

<<<<<<< HEAD
  return (
      <NavigationContainer>{
        isSignedIn ? (
                <Stack.Navigator initialRouteName="Main">
                  <Stack.Screen name="Main" children = {() => < MainScreen userList = {AppModel.userList}/>}/>
                </Stack.Navigator>
            ) :
            (isSignedIn === null)? (
                    <View style={{backgroundColor: "white"}}><Text>Loading</Text></View>
                ) :
                (<Stack.Navigator initialRouteName="Sign-in">
                  <Stack.Screen options={{headerShown: Platform.OS !== "web"}}
                                name="Sign-in"
                                component={SignInScreen}/>
                  <Stack.Screen name="Sign-up"
                                component={SignUpScreen} />
                </Stack.Navigator>)
      }
      </NavigationContainer>
  );
}
=======
    return (
        <NavigationContainer>
            {isSignedIn ?
                (
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen name="Main" component={MainScreen} />
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
                    </Stack.Navigator>
                    )
          }
          </NavigationContainer>
    );
}
>>>>>>> 3c017ce38f8d10b430b05b0311ec3779801631f1
