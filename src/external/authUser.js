import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthUser = {
    signIn(email, password){
            signInWithEmailAndPassword(getAuth(), email, password).then(()=>{
            }).catch((error)=>{
                if(error.message === "Firebase: Error (auth/wrong-password).")
                    window.alert("Invalid password.");
                else if(error.message === "Firebase: Error (auth/invalid-email).")
                    window.alert("Invalid email.");
                else if(error.message === "Firebase: Error (auth/user-not-found).")
                    window.alert("User not found.");
                else
                    window.alert(error.message);
            });
    },
    
    signOut(){
         signOut(getAuth()).then(() =>{
            window.alert("You are logged out.");
        })
        .catch(error => window.alert(error.message));
    }
}

export default AuthUser;