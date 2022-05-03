import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";


const AuthUser = {
    signIn(email, password){
            signInWithEmailAndPassword(getAuth(), email, password).then(()=>{
            }).catch((error)=>{
                if(error.message === "Firebase: Error (auth/wrong-password).")
                    alert("Invalid password.");
                else if(error.message === "Firebase: Error (auth/invalid-email).")
                    alert("Invalid email.");
                else
                    alert("Something went wrong. Please try again.");
            });
    },
    
    signOut(){
         signOut(getAuth()).then(() =>{
            alert("You are logged out.");
        })
        .catch(error => alert(error.message));
    }
}

export default AuthUser;