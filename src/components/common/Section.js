import React from "react";
import { View } from "react-native";

const Section = props => {
  return <View style={[styles.viewStyle, props.style]}>{props.children}</View>;
};

const styles = {
  viewStyle: {
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 60,
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

export { Section };
