import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { EmailInput } from "../components/emailInput";
import { AlertMessageComponent } from "../components/alertMessageComponent";
import { StatusBar } from "expo-status-bar";

export default function ForgotPassword({ navigation }) {
  const [authStatus, setAuthStatus] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [errorMessageState, setErrorMessageState] = useState(null);

  React.useEffect(
    function () {
      if (authStatus > 0)
        sendPasswordResetEmail(getAuth(), email)
          .then(() => {
            console.log("Password reset email sent successfully");
          })
          .catch((error) => {
            if (error.message === "Invalid email") {
              setErrorMessageState(error.message);
            } else {
              console.log(error.message);
              setErrorMessageState(
                "An unknown error occurred, please try again."
              );
            }
          });
    },
    [authStatus]
  );

  return (
    <View style={styles.container}>
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.welcomeText}>Reset your password</Text>
        <AlertMessageComponent
          message={errorMessageState}
          chosenStyle="danger"
          setMessageCallback={setErrorMessageState}
        />
        <View style={styles.forgotPasswordInputContainer}>
          <EmailInput onChangeText={(val) => setEmail(val)} value={email} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (email === "")
                setErrorMessageState("Please fill in the credentials");
              else setAuthStatus(authStatus + 1);
            }}
          >
            <Text style={styles.buttonTitle}>Send email</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  forgotPasswordInputContainer: {
    width: Platform.OS === "web" ? "15%" : "55%",
    minWidth: Platform.OS === "web" ? 340 : 0,
  },
  forgotPasswordContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    margin: 25,
  },
  button: {
    backgroundColor: `#1e90ff`,
    paddingVertical: 17,
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  textinput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "#000000",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  buttonTitle: {
    fontSize: Platform.OS === "web" ? 20 : 15,
    color: `#ffffff`,
  },
  welcomeText: {
    fontSize: Platform.OS === "web" ? 65 : 40,
    marginBottom: Platform.OS === "web" ? 50 : 35,
    fontWeight: "bold",
    textAlign: "center",
  },
});
