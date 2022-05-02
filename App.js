import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//import Login from './components/login';
//import Contact from './components/dashboard';
import SignUp from './src/screens/signUpScreen'

export default function App() {
  return (
    <View style={styles.container}>
        <SignUp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    paddingLeft: 60,
    paddingRight: 60,
  },
});
