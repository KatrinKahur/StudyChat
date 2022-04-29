import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";


const AuthUser = {
    signIn(email, password){
            signInWithEmailAndPassword(getAuth(), email, password).then(()=>{
            }).catch(error=>window.alert(error.message));
    },
    
    signOut(){
         signOut(getAuth()).then(() =>{
            window.alert("You are logged out.");
        })
        .catch(error => window.alert(error.message));
    }
}

export default AuthUser;