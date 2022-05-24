import React from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Component } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  handlePasswordReset = () => {
    if (this.state.email === '' || !this.state.email.includes('@' && ('.com' || '.se'))) {
      console.log('Invalid email, enter your registered email.')
    }
    else {
      sendPasswordResetEmail(getAuth(), this.state.email).then(() => {
        console.log("Password reset email sent successfully");
      });
      this.props.navigation.navigate("Sign-in");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.welcomeText}>Reset your password</Text>
          <View style={styles.forgotPasswordInputContainer}>
            <TextInput
              style={styles.textinput}
              placeholder="Enter a registred email please!"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, "email")}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={(email) => this.handlePasswordReset()}
            >
              <Text style={styles.buttonTitle}>Send email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flex: 1,
    flexDirection: "column",
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
    display: "flex",
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
