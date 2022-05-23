import { Platform, StyleSheet, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const EmailInput = ({ onChangeText, onSubmitEditing, value }) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="user" size={24} color="black" />
      <TextInput
          testID="emailInput"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          placeholder="Email.."
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
