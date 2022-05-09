import {View, Button} from "react-native";
import AuthUser from "../external/authUser";
import {AlertMessageComponent} from "../components/alertMessageComponent";
import {useState} from "react";

export default function MainScreen(){
    const [messageState, setMessageState] = useState(null);
    const [messageStyleState, setMessageStyleState] = useState("info")

    return(
        <View style={{selfAlign: "center", marginHorizontal: "45%", marginVertical: "25%"}}>
            <AlertMessageComponent
                message={messageState}
                chosenStyle={messageStyleState}
                setMessageCallback={setMessageState}/>
            <Button title="Logout" onPress={()=>{
                AuthUser.signOut().then(() => {}).catch((error) => {
                    console.log("Error at sign out: ", error.message);
                    setMessageStyleState("danger");
                    setMessageState("An unknown error occurred, please try again.");
                })
            }}/>
        </View>
    )
}