import { Platform, StyleSheet, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const UserNameInput = ({ onChangeText, value }) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="user" size={24} color="black" />
      <TextInput
        testID="userNameInput"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Full name.."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: Platform.OS === "web" ? 10 : 5,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  input: {
    width: "100%",
    fontSize: Platform.OS === "web" ? 20 : 17,
    paddingLeft: 15,
    paddingVertical: 3,
    paddingRight: 15,
    overflow: "hidden",
  },
});
