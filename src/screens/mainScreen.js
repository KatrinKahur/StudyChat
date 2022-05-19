import {View, Button} from "react-native";
import AuthUser from "../external/authUser";
import VincentChatScreen from "./vincentChatScreen";
import VincentContactListScreen from "./vincentContactListScreen.js";

export default function MainScreen({navigation}){
    return(
        <View style={{selfAlign: "center", marginHorizontal: "45%", marginVertical: "25%"}}>
            <Button title="Logout" onPress={()=>{
                AuthUser.signOut().then(() => {}).catch((error) => {
                    console.log("Error at sign out: ", error.message);
                })
            }}/>



            
            <Button title="Go to ChatScreen" onPress={() => {navigation.push("Chat")}}/>
            <Button title="Go to ContactListScreen" onPress={() => {navigation.push("Contact list")}}/>
            
            <Button title="Go to new ContactList" onPress={() => {navigation.push("VincentContactList")}}/>



        </View>
    )
}
