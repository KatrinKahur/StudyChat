import {Pressable, Text} from "react-native";
import {Feather} from "@expo/vector-icons";

export const AlertMessageComponent = ({message, chosenStyle = "info", setMessageCallback}) => {
    if(message === null){
        return (<></>)
    }

    if(chosenStyle !== "danger" && chosenStyle !== "success")
        chosenStyle = "info";

    return (
        <Pressable
            testID="message-container"
            onPress={() => setMessageCallback(null)}
            style={{...styles.box.base, ...styles.box[chosenStyle]}}>
            <Text style={{...styles.text.base, ...styles.text[chosenStyle]}}>{message}
                <Feather name="x" size={styles.text.base.fontSize} color={styles.text[chosenStyle].color} /></Text>
        </Pressable>
    )
}

const styles = {
    text: {
        info: {
            color: "#31708f"
        },
        danger: {
            color: "#a94442"
        },
        success: {
            color: "#3c763d"
        },
        base: {
            fontSize: 20
        }
    },
    box: {
        info: {
            backgroundColor: "#d9edf7",
            borderColor: "#bce8f1"
        },
        danger: {
            backgroundColor: "#f2dede",
            borderColor: "#ebccd1"
        },
        success: {
            backgroundColor: "#dff0d8",
            borderColor: "#d6e9c6"
        },
        base: {
            zIndex: 9999,
            position: "absolute",
            top: 10,
            borderWidth: 1,
            paddingVertical: 20,
            paddingLeft: 20,
            paddingRight: 10,
            borderRadius: 5
        }
    }
}