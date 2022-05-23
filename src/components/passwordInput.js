import {TextInput, View, StyleSheet, Platform} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import React from "react";

export const PasswordInput = ({onChangeText, onSubmitEditing, value}) => {
    return(
        <View style={styles.container}>
            <FontAwesome5 name="lock" size={24} color="black" />
            <TextInput
                testID="passwordInput"
                style={styles.input} value={value}
                secureTextEntry={true}
                onSubmitEditing={onSubmitEditing}
                onChangeText = {onChangeText} placeholder="Password.."/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: Platform.OS === 'web'? 10 : 5,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 5,
        borderBottomWidth: 1,
        marginVertical: 10
    },
    input: {
        width: "100%",
        fontSize: Platform.OS === 'web'? 20 : 17,
        paddingLeft: 15,
        paddingVertical: 3,
        paddingRight: 15,
        overflow: "hidden"
    }
})