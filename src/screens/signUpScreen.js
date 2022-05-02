import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function SignUp() {
  return (
    <View style={styles.SignUp}>

        <Text style={styles.header}>Create a new account</Text>
        <TextInput style={styles.textinput} placeholder="Full name" underlineColorAndroid={'transparent'}/>
        <TextInput style={styles.textinput} placeholder="Email" underlineColorAndroid={'transparent'}/>
        <TextInput style={styles.textinput} placeholder="Password" secureTextEntry={true} underlineColorAndroid={'transparent'}/>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.btntext}>Sign up</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  SignUp: {
    alignSelf: 'stretch',

  },
  header: {
      fontSize: 24,
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
      color: '#fff',
      borderBottomColor: '#f8f8f8',
      borderBottomWidth: 1,
  },
  button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
     backgroundColor: '#59cbbd',
     marginTop: 30,
  },
  btntext: {
      color: '#fff',
      fontWeight: 'bold',
  }
});
