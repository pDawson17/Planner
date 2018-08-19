import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const QueueDisplay = ({ onPress, item }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>
        {" "}
        {item.date} {item.content}{" "}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    backgroundColor: "#EF5777",
    borderRadius: 10,
    height: 60,
    alignSelf: "stretch",
    margin: 2,
    flexDirection: "row"
  },
  textStyle: {
    color: "white"
  }
};

export default QueueDisplay;
