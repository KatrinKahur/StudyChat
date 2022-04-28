import {View, Button} from "react-native";
import AuthUser from "../external/authUser";

export default function MainScreen(){
    return(
        <View style={{selfAlign: "center", margin: "30%"}}><Button title="Logout" onPress={()=>AuthUser.signOut()}/></View>
    )
}