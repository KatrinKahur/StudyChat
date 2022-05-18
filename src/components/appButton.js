import {Pressable, Text, Platform} from "react-native";
import React from "react";

export const AppButton = ({title, onPress, testID=null}) => {
    return(
        <Pressable
            testID={testID} style={styles.button}
            onPress={onPress}>
            <Text style={styles.buttonTitle}>{title}</Text>
        </Pressable>
    )
}

const styles = {
    button: {
        width: Platform.OS === 'web'? "15%" : "55%",
        minWidth: Platform.OS === 'web'? 340 : 0,
        backgroundColor: `#1e90ff`,
        paddingVertical: 17,
        marginTop: 10,
        marginBottom: 15,
        alignItems: "center",
        borderRadius: 5
    },
    buttonTitle: {
        fontSize:  Platform.OS === 'web'? 20 : 15,
        color: `#ffffff`
    }
}