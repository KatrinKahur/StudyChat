//import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { TextInput } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getDatabase, ref, set, onValue, child, get, onChildAdded, push } from "firebase/database";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      isLoading: false
    }
  }


  retrieveData = () => {

    const dbRef = ref(db);
    get(child(dbRef, '/users'))
      .then((snapshot) => {
        var students = [];
        snapshot.forEach(childSnapshot => {
          students.push(childSnapshot.val());
        });
        addAllItems(students);
      })

  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = () => {
    if (this.state.email === '' && this.state.password === '' && this.state.displayName === '') {
      console.warn('Enter details to signup!')
    } else if (!this.state.email.includes('@')) {
      console.error('Invalid email')
    } else if (!(this.state.email.includes('.com'))) {
      console.error('Invalid email')
    } else if (this.state.password === '') {
      console.error('Password is required!')
    } else if (this.state.email === '') {
      console.error('Email is required!')
    } else if (this.state.password.length < 6) {
      console.error('Password is too short, it has to be at least 6 characters long.')
    } else if (this.state.displayName === '') {
      console.error('Username is required!')
    } else {
      this.setState({
        isLoading: true,
      })

      createUserWithEmailAndPassword(getAuth(), this.state.email, this.state.password)
        .then((res) => {
          updateProfile(res.user, {
            displayName: this.state.displayName
          }).then(() => {
            this.props.model.setUserName(getAuth().currentUser.displayName);
            console.log('User registered successfully!')
            if (getAuth().currentUser.displayName === null) {
              console.log("username is never set");
            };
            const db = getDatabase();
            set(ref(db, 'users/' + res.user.uid), {
              username: res.user.displayName,
              email: res.user.email,
            });
            console.log("FINISH ADDED USER")
          });
          this.setState({
            isLoading: false,
            displayName: '',
            email: '',
            password: ''
          })
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.SignUp}>

        <Text style={styles.header}>Create a new account</Text>

        <TextInput style={styles.textinput}
          placeholder="Full name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />

        <TextInput style={styles.textinput}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />

        <TextInput style={styles.textinput}
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
        />

        <TouchableOpacity style={styles.button}
          onPress={() => this.registerUser()}
        >
          <Text style={styles.btntext}>Sign up</Text>
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Sign-in')}>
          Already Registered? Click here to sign in
        </Text>
      </View>
    );
  }
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
  loginText: {
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
    height: 40,
    marginBottom: 30,
    color: '#000000',
    borderBottomColor: '#f8f8f8',
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
  }
});

