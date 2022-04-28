import {auth} from "../config/firebaseConfig";


const AuthUser = {
    signIn(email, password){
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => window.alert(error.message));
    },
    
    signOut(){
        auth.signOut().then(() => window.alert("You are logged out."))
        .catch(error => window.alert(error.message));
    }
}

export default AuthUser;