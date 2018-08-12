import React from "react";
import { View } from "react-native";
import { IconButton } from "./index";

const Toolbar = ({
  buttonOne,
  buttonTwo,
  buttonThree,
  onPressOne,
  onPressTwo,
  onPressThree
}) => {
  return (
    <View style={styles.viewStyle}>
      <IconButton iconName={buttonOne} onPress={onPressOne} size={30} />
      <IconButton iconName={buttonTwo} onPress={onPressTwo} size={30} />
      <IconButton iconName={buttonThree} onPress={onPressThree} size={30} />
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: "#80B2BE",
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    borderWidth: 2,
    borderColor: "#707070"
  }
};

export { Toolbar };
