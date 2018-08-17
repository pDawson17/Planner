import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const RainbowButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.buttonStyle, props.style]}
    >
      <Text style={styles.labelStyle}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    backgroundColor: "#80B2BE",
    alignSelf: "stretch",
    alignItems: "center",
    borderRadius: 40,
    padding: 30,
    margin: 10,
    marginLeft: 30,
    marginRight: 30
  },
  labelStyle: {
    color: "white",
    fontSize: 20
  }
};

export { RainbowButton };
