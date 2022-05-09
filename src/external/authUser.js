import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthUser = {
    signIn(email, password){
        return new Promise((doResolve, doReject) => {
            signInWithEmailAndPassword(getAuth(), email, password).then(()=>{

            }).catch((error)=>{
                if(error.message === "Firebase: Error (auth/wrong-password).")
                    doReject({message: "Invalid password"});
                else if(error.message === "Firebase: Error (auth/invalid-email).")
                    doReject({message: "Invalid email"});
                else if(error.message === "Firebase: Error (auth/user-not-found)."){
                    doReject({message: "User not found"});
                }
                else
                    doReject({message: error.message});
            });
        });
    },

    signOut(){
        return new Promise((doResolve, doReject) => {
            signOut(getAuth()).then(() =>{
                doResolve({message: "You are logged out"})
            }).catch(error => {
                doReject({message: error.message})
            });
        })
    }
}

export default AuthUser;