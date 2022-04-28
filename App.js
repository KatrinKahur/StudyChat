import { View } from 'react-native';
import SignInScreen from "./src/screens/signInScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from "./src/screens/mainScreen";
import React from "react";
import {auth} from "./src/config/firebaseConfig";
import SignUpScreen from "./src/screens/signUpScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  const[isSignedIn, setIsSignedIn] = React.useState(null);

  React.useEffect(function (){
    auth.onAuthStateChanged(function (user){
      if(user){
        setIsSignedIn(true);
      }
      else{
        setIsSignedIn(false);
      }
    });
  }, [])

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
