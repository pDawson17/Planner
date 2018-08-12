import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const QueueDisplay = ({ onPress, item }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}> {item.date} </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    backgroundColor: "blue",
    height: 30,
    alignSelf: "stretch"
  },
  textStyle: {
    color: "white"
  }
};

export default QueueDisplay;
