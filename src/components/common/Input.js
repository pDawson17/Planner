import React from "react";
import { Text, TextInput, View } from "react-native";

const Input = ({ onChangeText, value, placeholder }) => {
  return (
    <View style={styles.viewStyle}>
      <TextInput
        placeholder={placeholder}
        style={styles.textInputStyle}
        underlineColorAndroid="transparent"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = {
  viewStyle: {
    flex: 1,
    marginLeft: 140,
    marginRight: 140,
    backgroundColor: "transparent",
    borderRadius: 100,
    margin: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  textStyle: {
    color: "#707070",
    fontSize: 20
  },
  textInputStyle: {
    color: "white",
    fontSize: 20,
    flex: 1,
    borderBottomWidth: 3,
    borderBottomColor: "#707070",
    alignItems: "center"
  }
};
export { Input };
