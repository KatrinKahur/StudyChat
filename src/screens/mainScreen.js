import {View, Button} from "react-native";
import AuthUser from "../external/authUser";
import contactListScreen from "./contactListScreen";
import ChatScreen from "./chatScreen";
export default function MainScreen({navigation}){





    
    return(
        <View style={{selfAlign: "center", margin: "30%"}}>
            <Button title="Logout" onPress={()=>AuthUser.signOut()}/>
            <Button title="contactList" onPress={()=>navigation.push('contactListScreen')}/>

        </View>
    )
}