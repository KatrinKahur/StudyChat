import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { TextInput } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getDatabase, ref, set, child, get } from "firebase/database";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      loading: false
    }
  }


  retrieveData = () => {

    const dbRef = ref(db);
    get(child(dbRef, '/users'))
      .then((snapshot) => {
        var students = [];
        snapshot.forEach(childSnapshot => {
          students.push(childSnapshot.value());
        });
        addAllItems(students);
      })

  }

  updatevalueue = (value, prop) => {
    const state = this.state;
    state[prop] = value;
    this.setState(state);
  }

  registerUser = () => {
    if (this.state.email === '' && this.state.password === '' && this.state.displayName === '') {
      console.warn('Enter details to signup!')
    } else if (!this.state.email.includes('@') || !this.state.email.includes('.')) {
      console.error('invalid email')
    } else if (!(this.state.email.includes('.com')) || !(this.state.email.includes('.se')) || !(this.state.email.includes('.net'))) {
      console.error('invalid email')
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
        loading: true,
      })

      createUserWithEmailAndPassword(getAuth(), this.state.email, this.state.password)
        .then((res) => {
          updateProfile(res.user, {
            displayName: this.state.displayName
          }).then(() => {
            this.props.model.setUserName(getAuth().currentUser.displayName);
            console.log('User registered successfully!')
            if (getAuth().currentUser.displayName === null) {
              console.error("username is never set");
            };
            const db = getDatabase();
            set(ref(db, 'users/' + res.user.uid), {
              username: res.user.displayName,
              email: res.user.email,
            });
            console.log("FINISH, ADDED A USER")
          });
          this.setState({
            loading: false,
            displayName: '',
            email: '',
            password: ''
          })
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }
  render() {
    if (this.state.loading) {
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
          valueue={this.state.displayName}
          onChangeText={(value) => this.updatevalueue(value, 'displayName')}
        />

        <TextInput style={styles.textinput}
          placeholder="Email"
          valueue={this.state.email}
          onChangeText={(value) => this.updatevalueue(value, 'email')}
        />

        <TextInput style={styles.textinput}
          placeholder="Password"
          secureTextEntry={true}
          valueue={this.state.password}
          onChangeText={(value) => this.updatevalueue(value, 'password')}
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

