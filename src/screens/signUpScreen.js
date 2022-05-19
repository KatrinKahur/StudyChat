import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({
        isLoading: true,
      });

      createUserWithEmailAndPassword(
        getAuth(),
        this.state.email,
        this.state.password
      )
        .then((res) => {
          updateProfile(res.user, {
            displayName: this.state.displayName,
          });
          console.log("User registered successfully!");
          this.setState({
            isLoading: false,
            displayName: "",
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Sign-in");
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.SignUp}>
        <Text style={styles.header}>Create a new account</Text>

        <TextInput
          style={styles.textinput}
          placeholder="Full name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, "displayName")}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, "password")}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.registerUser()}
        >
          <Text style={styles.btntext}>Sign up</Text>
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("Sign-in")}
        >
          Already Registered? Click here to sign in
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SignUp: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    paddingLeft: 60,
    paddingRight: 60,
  },
  SignUpText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  header: {
    fontSize: Platform.OS === "web" ? 65 : 40,
    fontWeight: "bold",
    color: "#000000",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: "stretch",
    marginTop: Platform.OS === "web" ? 10 : 5,
    paddingRight: 10,
    paddingTop: 20,
    height: 40,
    marginBottom: 30,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1e90ff",
    marginTop: 30,
    borderRadius: 5,
  },
  btntext: {
    color: "#fff",
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: Platform.OS === "web" ? 65 : 40,
    marginBottom: Platform.OS === "web" ? 50 : 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  signUpInputContainer: {
    width: Platform.OS === "web" ? "15%" : "55%",
    minWidth: Platform.OS === "web" ? 340 : 0,
  },
  buttonContainer: {
    width: Platform.OS === "web" ? "15%" : "55%",
    minWidth: Platform.OS === "web" ? 340 : 0,
  },
});
