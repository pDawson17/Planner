import React from "react";
import { View, Text, FlatList } from "react-native";

const WeekDayDisplay = ({ date, events }) => {
  return (
    <View style={styles.dayContainerStyle}>
      <Text>{date}</Text>
      <FlatList
        renderItem={item => {
          return (
            <View style={styles.itemStyle}>
              <Text>{events[item.index].content}</Text>
            </View>
          );
        }}
        data={events}
        keyExtractor={item => item.date}
        horizontal={true}
        extraData={events}
      />
    </View>
  );
};

const styles = {
  dayContainerStyle: {
    backgroundColor: "orange",
    flex: 1
  },
  itemStyle: {
    backgroundColor: "yellow",
    borderWidth: 2,
    borderColor: "#707070"
  }
};

export default WeekDayDisplay;
